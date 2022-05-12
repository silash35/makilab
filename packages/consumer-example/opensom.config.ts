import config from "@opensom/config";

export default (() => {
  if (!process.env.SITE_URL) {
    throw new Error("SITE_URL is not defined");
  }
  if (!process.env.API_URL) {
    throw new Error("API_URL is not defined");
  }

  return {
    SITE_URL: process.env.SITE_URL,
    API_URL: process.env.API_URL,
    ...config,
  };
})();
