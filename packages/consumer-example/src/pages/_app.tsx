import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import config from "@config";
import variables from "@/styles/variables.module.scss";
import { useRouter } from "next/router";

const { COMPANY } = config;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";
  return (
    <>
      <Head>
        {/* Viewport meta tag should not be used in _document.tsx. That's why it's in this file */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* These meta tags need to be here for the key attribute to work properly */}
        <meta property="og:title" content={COMPANY.name} key="ogTitle" />
        <meta name="twitter:title" content={COMPANY.name} key="twitterTitle" />
        <meta property="og:description" content={COMPANY.description} key="ogDescription" />
        <meta name="twitter:description" content={COMPANY.description} key="twitterDescription" />

        {/* Locale Meta Tags */}
        <meta property="og:locale" content={ogLocale} />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: variables.primaryLight,
      main: variables.primaryMain,
      dark: variables.primaryDark,
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "serif"].join(","),
  },
  components: { MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } } },
});

export default MyApp;
