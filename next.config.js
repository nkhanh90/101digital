/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_NAMESPACE: process.env.APP_NAMESPACE,
    APP_BASENAME: process.env.APP_BASENAME,
    API_CLIENT_ID: process.env.API_CLIENT_ID,
    API_CLIENT_SECRET: process.env.API_CLIENT_SECRET,
    API_GRANT_TYPE: process.env.API_GRANT_TYPE,
    API_SCOPE: process.env.API_SCOPE,
  },
};

module.exports = nextConfig;
