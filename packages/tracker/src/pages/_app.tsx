import "@/styles/globals.scss";

import config from "@config";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import variables from "@/styles/variables.module.scss";

const { COMPANY } = config;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { locale } = router;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";

  return (
    <>
      <Head>
        {/* Viewport meta tag should not be used in _document.tsx. That's why it's in this file */}
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        {/* These meta tags need to be here for the key attribute to work properly */}
        <meta content={COMPANY.name} key="ogTitle" property="og:title" />
        <meta content={COMPANY.name} key="twitterTitle" name="twitter:title" />
        <meta content={COMPANY.description} key="ogDescription" property="og:description" />
        <meta content={COMPANY.description} key="twitterDescription" name="twitter:description" />

        {/* Locale Meta Tags */}
        <meta content={ogLocale} property="og:locale" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

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
