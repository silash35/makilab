import config from "@config";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const { SITE_URL, COMPANY } = config;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Primary Meta Tags */}
          <meta charSet="utf-8" />
          <meta content="text/html" httpEquiv="content-type" />

          {/* SEO Meta Tags */}
          <meta content="Silas Henrique Alves Araújo" name="author" />
          <meta content={COMPANY.description} name="description" />

          {/* Open Graph / Facebook */}
          <meta content="website" property="og:type" />
          <meta content={SITE_URL} property="og:url" />
          <meta content={`${SITE_URL}/card.png`} property="og:image" />
          <meta content={`${COMPANY.name} logo`} property="og:image:alt" />

          {/* Twitter */}
          <meta content="summary_large_image" name="twitter:card" />
          <meta content={SITE_URL} name="twitter:url" />
          <meta content="@silash35" name="twitter:creator" />
          <meta content={`${SITE_URL}/card.png`} name="twitter:image" />

          {/* Icons */}
          <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/icons/site.webmanifest" rel="manifest" />
          <link color="#0070f3" href="/icons/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/icons/favicon.ico" rel="shortcut icon" />
          <meta content="OpenSOM" name="apple-mobile-web-app-title" />
          <meta content="OpenSOM" name="application-name" />
          <meta content="#2d89ef" name="msapplication-TileColor" />
          <meta content="/icons/browserconfig.xml" name="msapplication-config" />
          <meta content="#ffffff" name="theme-color" />

          {/* Fonts */}
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
