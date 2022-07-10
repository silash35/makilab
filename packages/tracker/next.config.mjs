export default {
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.SITE_URL,
    API_URL: process.env.API_URL,
  },
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
  },
};
