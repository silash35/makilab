import config from "@config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.SITE_URL}/sitemap.xml`,
    host: config.SITE_URL,
  };
}
