import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en"></Head>
        <body>
          <Main />
          <NextScript />

          <Script
            src="/assets/js/jquery.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/bootstrap/js/popper.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/bootstrap/js/bootstrap.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/bootstrap-select/bootstrap-select.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/bootstrap-touchspin/jquery.bootstrap-touchspin.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/magnific-popup/magnific-popup.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/counter/waypoints-min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/counter/counterup.min.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/imagesloaded/imagesloaded.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/masonry/masonry.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/masonry/filter.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/vendors/owl-carousel/owl.carousel.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/js/functions.js"
            strategy="beforeInteractive"
          ></Script>
          <Script
            src="/assets/js/contact.js"
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
