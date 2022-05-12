import config from "@opensom/config";

export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }

  if (!process.env.BACKEND_URL) {
    throw new Error("BACKEND_URL is not defined");
  }

  return {
    SITE_URL: process.env.SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    ...config,
  };
})();
