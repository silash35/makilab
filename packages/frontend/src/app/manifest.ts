import config from "@config";
import { MetadataRoute } from "next";
const { SITE_URL, COMPANY } = config;

import createManifest from "@opensom/next-common/manifest";

export default function manifest(): MetadataRoute.Manifest {
  return createManifest(
    {
      name: "OpenSOM",
      short_name: "OpenSOM",
      description: COMPANY.description,
    },
    SITE_URL,
    ["192x192", "512x512"],
  );
}
