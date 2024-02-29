"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import theme from "@/utils/theme";

import Layout from "./components/Layout";

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        scrollBehavior: "smooth",
      },
      main: { display: "contents" },
    }}
  />
);

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

const MainLayout = ({ children, params: { locale } }: Props) => (
  <html dir="ltr" lang={locale === "en" ? "en-US" : "pt-BR"}>
    <head>
      <meta content="text/html" httpEquiv="content-type" />
    </head>
    <body>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {globalStyles}
          <Layout>{children}</Layout>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default MainLayout;
