export { default as viewport } from "@opensom/next-common/viewport";

import config from "@config";
const { SITE_URL } = config;

import createMetadata from "@opensom/next-common/metadata";
export const metadata = createMetadata(
  {
    title: {
      template: "%s | OpenSOM Tracker",
      default: "OpenSOM Tracker",
    },
    description:
      "Example of site that consumes the OpenSOM API, it provides a nice interface for clients track their service orders status.",
  },
  SITE_URL,
);

const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
