/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "assets.coingecko.com",
      "coin-images.coingecko.com",
      "via.placeholder.com",
    ],
    unoptimized: true,
  },
  // Optimize builds for better rate limit handling
  generateBuildId: async () => {
    return `build_${Date.now()}`;
  },
  // Extend build timeout for API calls
  staticPageGenerationTimeout: 180, // 3 minutes
};

export default nextConfig;
