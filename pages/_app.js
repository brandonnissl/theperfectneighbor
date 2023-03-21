import App from "next/app";
import Head from "next/head";
import UserProvider from "../context/user";

import "../styles/assets.css";
import "../styles/typography.css";
import "../styles/shortcodes/shortcodes.css";
import "../styles/style.css";
import "../styles/color/color-1.css";
import "../styles/dashboard.css";
import "../styles/vendors/revolution/css/layers.css";
import "../styles/vendors/revolution/css/settings.css";
import "../styles/vendors/revolution/css/navigation.css";


import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { createContext } from "react";
import { Montserrat, Open_Sans, Poppins, Raleway, Roboto, Rubik } from "@next/font/google";
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from "react";

import * as gtag from "../lib/gtag"

export const GlobalContext = createContext({});


const MyApp = ({ Component, session, pageProps }) => {
  const { global } = pageProps;
  const gAnalyticsSrc = `https://www.googletagmanager.com/gtag/js?id=G-${process.env.GA_MEASUREMENT_ID}`
  const router = useRouter();
  useEffect(() => {
        const handleRouteChange = (url) => {
          gtag.pageview(url);
        };
     
        router.events.on("routeChangeComplete", handleRouteChange);
     
        return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
        };
      }, [router.events]);

  return (
    <>
      <Script strategy="afterInteractive" src={gAnalyticsSrc}/>
      <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-${process.env.GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
      <Head>
        <link
          rel="shorcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      DefaultSeo: {
        populate: "*",
      },
    },
  });
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
