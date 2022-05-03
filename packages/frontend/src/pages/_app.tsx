import "@/styles/globals.scss";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import DefaultLayout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import variables from "@/styles/variables.module.scss";

type NextPageWithLayout = NextPage & {
  Layout?: ({ children }: { children: React.ReactChild }) => JSX.Element | null;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const Layout = Component.Layout ? Component.Layout : DefaultLayout;

  return (
    <>
      <Head>
        {/* Viewport meta tag should not be used in _document.tsx. That's why it's in this file */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* These meta tags need to be here for the key attribute to work properly */}
        <meta property="og:title" content="OpenSOM" key="ogTitle" />
        <meta name="twitter:title" content="OpenSOM" key="twitterTitle" />
        <meta
          property="og:description"
          content="The Open source Service Order Manager"
          key="ogDescription"
        />
        <meta
          name="twitter:description"
          content="The Open source Service Order Manager"
          key="twitterDescription"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SWRConfig
            value={{
              fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </ThemeProvider>
      </AuthProvider>
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
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
  components: { MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } } },
});

export default MyApp;
