/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://dev-bdqfrkxcyyjve3yj.us.auth0.com",
        "localhost:3000",
      ],
    },
  },
};

module.exports = nextConfig;
