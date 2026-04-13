/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/warframe-tools',
  assetPrefix: '/warframe-tools/',
  trailingSlash: true,
};

module.exports = nextConfig;
