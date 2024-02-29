/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.SITE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  sassOptions: {
    includePaths: ["/src/styles"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
};

export default nextConfig;
