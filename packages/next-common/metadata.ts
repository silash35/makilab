import type { Metadata as NextMetadata } from "next";

const createMetadata = (metadata: NextMetadata, siteURL: string): NextMetadata => ({
  metadataBase: new URL(siteURL),

  authors: [{ name: "Silas Henrique Alves Araújo" }],
  twitter: {
    creator: "@silash35",
  },

  openGraph: {
    url: siteURL,
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
    shortcut: `${siteURL}/favicon.ico`,
    other: {
      rel: "mask-icon",
      color: "#0070f3",
      url: `${siteURL}/icons/safari-pinned-tab.svg`,
    },
  },
  ...metadata,
});

export default createMetadata;
