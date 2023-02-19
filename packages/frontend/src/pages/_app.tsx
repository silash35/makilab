import "@/styles/globals.scss";

import type { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import DefaultLayout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { fetcher } from "@/utils/request";

type NextPageWithLayout = NextPage & {
  Layout?: ({ children }: { children: React.ReactNode }) => JSX.Element | null;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) => {
  const Layout = Component.Layout ? Component.Layout : DefaultLayout;

  return (
    <>
      <Head>
        {/* Viewport meta tag should not be used in _document.tsx. That's why it's in this file */}
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        {/* These meta tags need to be here for the key attribute to work properly */}
        <meta content="OpenSOM" key="ogTitle" property="og:title" />
        <meta content="OpenSOM" key="twitterTitle" name="twitter:title" />
        <meta
          content="The Open source Service Order Manager"
          key="ogDescription"
          property="og:description"
        />
        <meta
          content="The Open source Service Order Manager"
          key="twitterDescription"
          name="twitter:description"
        />
      </Head>

      <ErrorProvider>
        <AuthProvider>
          <ThemeProvider>
            <SWRConfig value={{ fetcher }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SWRConfig>
          </ThemeProvider>
        </AuthProvider>
      </ErrorProvider>
    </>
  );
};

export default MyApp;
