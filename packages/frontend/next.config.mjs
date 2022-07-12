export default () => {
  /**
   * @type {import('next').NextConfig}
   */
  let nextConfig = {
    reactStrictMode: true,
    env: {
      SITE_URL: process.env.SITE_URL,
      BACKEND_URL: process.env.BACKEND_URL,
    },
    sassOptions: {
      includePaths: ["/src/styles"],
    },
    compiler: {},
  };

  if (process.env.NODE_ENV === "production") {
    nextConfig.compiler.removeConsole = true;
  }

  if (process.env.KEEP_PROPERTIES !== "true") {
    nextConfig.compiler.reactRemoveProperties = {
      properties: ["^data-test$", "^data-testid$", "^data-cy$"],
    };
  }

  if (process.env.PROCFILE === "packages/frontend/Procfile") {
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
