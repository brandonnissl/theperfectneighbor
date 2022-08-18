import Document, { Head, Main, NextScript, Html } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head lang="en" class="no-js">

                    <link href="/assets/images/favicon.png" rel="icon" />

                    <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
                    <link href="/assets/css/plugin.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

                    <link href="/assets/css/style.css" rel="stylesheet" />
                    <link href="/assets/css/responsive.css" rel="stylesheet" />
                    <link href="/assets/css/darkmode.css" rel="stylesheet" />

                </Head>
                <body>

                    <Main />
                    <NextScript />


                </body>
            </Html>
        )
    }
}