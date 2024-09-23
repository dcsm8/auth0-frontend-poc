/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    trustedHosts: [
      "localhost:3000",
      "auth0-frontend-poc.netlify.app",
      "dev-bdqfrkxcyyjve3yj.us.auth0.com",
    ],
  },
};

export default nextConfig;
