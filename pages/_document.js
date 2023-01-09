import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en">
          <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i|Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Rubik:300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet"/>

        </Head>
        <body style={{background: 'rgb(250, 250, 250)'}}>
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
