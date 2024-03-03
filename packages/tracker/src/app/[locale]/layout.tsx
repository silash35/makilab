"use client";
import ThemeProvider from "@opensom/next-common/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./_components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </body>
  </html>
);

export default MainLayout;
