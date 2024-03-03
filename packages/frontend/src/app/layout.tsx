export { default as viewport } from "@opensom/next-common/viewport";

import config from "@config";

import Providers from "@/components/Providers";

const { COMPANY, SITE_URL } = config;

import createMetadata from "@opensom/next-common/metadata";

export const metadata = createMetadata(
  {
    title: COMPANY.name,
    description: COMPANY.description,
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
