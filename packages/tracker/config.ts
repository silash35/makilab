import config from "@opensom/config";
import { z } from "zod";

const envSchema = z.object({
  SITE_URL: z.string().url(),
  BACKEND_URL: z.string().url(),
});

export default {
  ...config,
  ...envSchema.parse({
    SITE_URL: process.env.SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  }),
};
