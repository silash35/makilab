import "@/styles/globals.scss";

import config from "@config";
import { Metadata } from "next";
import { Viewport } from "next";

import Providers from "@/components/Providers";

const { COMPANY, SITE_URL } = config;

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: COMPANY.name,
  description: COMPANY.description,
  authors: [{ name: "Silas Henrique Alves Araújo" }],
  metadataBase: new URL(SITE_URL),

  twitter: {
    creator: "@silash35",
  },
  openGraph: {
    url: SITE_URL,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/card.png",
        width: 1200,
        height: 628,
        alt: "OpenSOM Logo",
      },
    ],
  },
  icons: {
    shortcut: `${SITE_URL}/favicon.ico`,
    other: {
      rel: "mask-icon",
      color: "#0070f3",
      url: `${SITE_URL}/icons/safari-pinned-tab.svg`,
    },
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html dir="ltr" lang="pt-BR">
    <head>
      <meta content="text/html" httpEquiv="content-type" />
    </head>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
