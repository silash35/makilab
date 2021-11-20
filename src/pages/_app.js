import "../styles/globals.scss";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";

function createEmotionCache() {
  return createCache({ key: "css" });
}

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
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
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ["Noto Serif", "serif"].join(","),
  },
});

export default MyApp;
