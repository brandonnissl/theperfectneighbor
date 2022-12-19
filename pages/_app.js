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

export const GlobalContext = createContext({});


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
      defaultSeo: {
        populate: "*",
      },
    },
  });
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
