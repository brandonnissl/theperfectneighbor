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
import { Inter } from "@next/font/google";

export const GlobalContext = createContext({});

const inter = Inter({variable: '--inter-font'});

const MyApp = ({ Component, session, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shorcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <UserProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
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
      defaultSeo: {
        populate: "*",
      },
    },
  });
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
