/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
    unoptimized: true,
  },
};

export default nextConfig;
