import config from "@config";
import { MetadataRoute } from "next";
const { SITE_URL } = config;

import createManifest from "@opensom/next-common/manifest";

export default function manifest(): MetadataRoute.Manifest {
  return createManifest(
    {
      name: "OpenSOM Tracker",
      short_name: "OpenSOM Tracker",
      description:
        "Example of site that consumes the OpenSOM API, it provides a nice interface for clients track their service orders status.",
    },
    SITE_URL,
    ["192x192", "512x512"],
  );
}
