export { default as viewport } from "@opensom/next-common/viewport";

import config from "@config";

import Providers from "@/components/Providers";

const { SITE_URL } = config;

import createMetadata from "@opensom/next-common/metadata";

export const metadata = createMetadata(
  {
    title: {
      template: "%s | OpenSOM",
      default: "OpenSOM",
    },
    description: "The open source and Self-Hosted Service Order Manager",
  },
  SITE_URL,
);

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
