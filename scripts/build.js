#!/usr/bin/env node

/**
 * Build script for handling CoinGecko API rate limits during deployment
 */

const { execSync } = require("child_process");

const RATE_LIMIT_DELAY = process.env.COINGECKO_API_DELAY || "3000";
const MAX_COINS = process.env.SSG_MAX_COINS || "10";

console.log("🚀 Starting build with rate limit optimizations...");
console.log(`📊 Max SSG Coins: ${MAX_COINS}`);
console.log(`⏱️  API Delay: ${RATE_LIMIT_DELAY}ms`);

// Set environment variables for the build
process.env.COINGECKO_API_DELAY = RATE_LIMIT_DELAY;
process.env.SSG_MAX_COINS = MAX_COINS;
process.env.NODE_ENV = "production";

try {
  console.log("📦 Running Next.js build...");
  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env },
  });

  console.log("✅ Build completed successfully!");
} catch (error) {
  console.error("❌ Build failed:", error.message);

  // If build fails due to rate limiting, try with reduced coins
  if (error.message.includes("429") || error.message.includes("rate limit")) {
    console.log("🔄 Retrying with reduced coins due to rate limiting...");
    process.env.SSG_MAX_COINS = "3";

    try {
      execSync("next build", {
        stdio: "inherit",
        env: { ...process.env },
      });
      console.log("✅ Build completed with reduced coins!");
    } catch (retryError) {
      console.error("❌ Retry build also failed:", retryError.message);
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
}
