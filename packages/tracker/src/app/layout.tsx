export { default as viewport } from "@opensom/next-common/viewport";

import config from "@config";
const { COMPANY, SITE_URL } = config;

import createMetadata from "@opensom/next-common/metadata";
export const metadata = createMetadata(
  {
    title: COMPANY.name,
    description: COMPANY.description,
  },
  SITE_URL,
);

const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
