import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          {/* Primary Meta Tags */}
          <meta charSet="utf-8" />
          <meta httpEquiv="content-type" content="text/html" />

          {/* SEO Meta Tags */}
          <meta name="author" content="Silas Henrique Alves Araújo" />
          <meta name="description" content="Assistência Técnica Autorizada Multimarcas" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://makilab.vercel.app/" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:image" content="https://makilab.vercel.app/card.png" />
          <meta property="og:image:alt" content="Logotipo do MakiLab. Uma coruja com o nome MakiLab ao lado com a frase 'Automação, refrigeração e maquinas' em baixo" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://makilab.vercel.app/" />
          <meta name="twitter:creator" content="@silash35" />
          <meta name="twitter:image" content="https://makilab.vercel.app/card.png" />

          {/* Icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/icons/site.webmanifest" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0070f3" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="MakiLab" />
          <meta name="application-name" content="MakiLab" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Serif&display=swap" rel="stylesheet" />
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
