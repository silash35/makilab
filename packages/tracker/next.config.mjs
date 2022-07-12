export default () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
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

  if (process.env.PROCFILE === "packages/tracker/Procfile") {
    // If is running on Heroku, there is no need to check eslint or typescript
    // The checks was already done in the github actions
    // This allows to eslint and other packages not be installed on Heroku instance
    nextConfig.eslint = {
      ignoreDuringBuilds: true,
    };
    nextConfig.typescript = {
      ignoreBuildErrors: true,
    };
  }

  return nextConfig;
};
