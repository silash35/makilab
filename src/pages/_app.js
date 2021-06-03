import "../styles/globals.scss";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Viewport meta tag should not be used in _document.tsx. That's why it's in this file */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* These meta tags need to be here for the key attribute to work properly */}
        <meta property="og:title" content="MakiLab Serviços" key="ogTitle" />
        <meta name="twitter:title" content="MakiLab Serviços" key="twitterTitle" />
        <meta
          property="og:description"
          content="Assistência Técnica Autorizada Multimarcas"
          key="ogDescription"
        />
        <meta
          name="twitter:description"
          content="Assistência Técnica Autorizada Multimarcas"
          key="twitterDescription"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
