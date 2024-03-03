"use client";
import Layout from "./_components/Layout";
import ThemeProvider from "./_components/ThemeProvider";

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
      <ThemeProvider>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </body>
  </html>
);

export default MainLayout;
