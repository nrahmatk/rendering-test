import Image from "next/image";
import { getTopCryptos, getGlobalData } from "@/lib/api";
import CryptoTable from "@/components/CryptoTable";
import StrategyCard from "@/components/StrategyCard";
import { Layers, Search, TrendingUp, Zap, Calendar } from "lucide-react";
import { RenderingStrategy, TrendingCoin } from "@/types/crypto";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";

const ssgStrategy: RenderingStrategy = {
  name: "Static Site Generation (SSG)",
  description:
    "Pages are pre-rendered at build time with static data, providing lightning-fast loading",
  advantages: [
    "Lightning-fast page loads",
    "Excellent SEO performance",
    "High scalability with CDN",
    "Reduced server resource usage",
  ],
  disadvantages: [
    "Data can become stale",
    "Longer build times for large sites",
    "Requires rebuild for data updates",
    "Less suitable for dynamic content",
  ],
  useCases: [
    "Cryptocurrency information pages",
    "Market overview and educational content",
    "Landing pages and documentation",
    "Content that doesn't change frequently",
  ],
  implementation: "generateStaticParams + build-time data fetching",
};

// This runs at build time only
async function getStaticData() {
  try {
    // Fetch data at build time
    const [cryptoList, globalData, trending] = await Promise.all([
      getTopCryptos(20),
      getGlobalData(),
      [], // Skip trending for now to avoid rate limit
    ]);

    return {
      cryptoList,
      globalData,
      trending,
      buildTimestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("SSG data fetching error:", error);
    return {
      cryptoList: [],
      globalData: null,
      trending: [],
      buildTimestamp: new Date().toISOString(),
    };
  }
}

export default async function SSGDemo() {
  // Build-time data fetching
  const { cryptoList, globalData, trending, buildTimestamp } =
    await getStaticData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SSG Demo - Static Site Generation
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          This page demonstrates Static Site Generation. All data was fetched
          and rendered at build time, providing instant loading with cached
          static content.
        </p>
      </div>

      {/* Strategy Overview */}
      <StrategyCard strategy={ssgStrategy} isActive={true} />

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Load Speed
            </h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">~100ms</p>
          <p className="text-sm text-gray-500">Instant from CDN</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Search className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              SEO Score
            </h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">Perfect</p>
          <p className="text-sm text-gray-500">Pre-rendered HTML</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Data Freshness
            </h3>
          </div>
          <p className="text-2xl font-bold text-orange-600">Static</p>
          <p className="text-sm text-gray-500">Build-time snapshot</p>
        </div>
      </div>

      {/* Build Timestamp */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-purple-600" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Static Build Timestamp
            </h3>
            <p className="text-purple-700 dark:text-purple-300">
              This page was built at:{" "}
              {new Date(buildTimestamp).toLocaleString()}
            </p>{" "}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              The data is a snapshot from build time - perfect for content that
              doesn&apos;t change frequently
            </p>
          </div>
        </div>
      </div>

      {/* Global Market Overview (Static) */}
      {globalData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Global Market Overview (Static Build Data)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Market Cap
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(globalData.total_market_cap?.usd || 0)}
              </p>
              <p
                className={`text-sm ${
                  globalData.market_cap_change_percentage_24h_usd > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercentage(
                  globalData.market_cap_change_percentage_24h_usd || 0
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Volume (24h)
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(globalData.total_volume?.usd || 0)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bitcoin Dominance
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {globalData.market_cap_percentage?.btc?.toFixed(1) || 0}%
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Cryptocurrencies
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {globalData.active_cryptocurrencies?.toLocaleString() || 0}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📊 <strong>Note:</strong> This market data represents a snapshot
              from when the site was built. For real-time data, check our{" "}
              <Link href="/csr" className="text-blue-600 hover:underline">
                CSR demo
              </Link>{" "}
              or
              <Link href="/ssr" className="text-green-600 hover:underline ml-1">
                SSR demo
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {/* Top Cryptocurrencies (Static) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Top Trending Cryptocurrencies (Build-time Data){" "}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.length > 0 ? (
            trending
              .slice(0, 6)
              .map((trendingCoin: TrendingCoin, index: number) => (
                <Link
                  key={trendingCoin.item.id}
                  href={`/ssg/coin/${trendingCoin.item.id}`}
                  className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </div>{" "}
                  <Image
                    src={trendingCoin.item.thumb}
                    alt={trendingCoin.item.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {trendingCoin.item.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                      {trendingCoin.item.symbol}
                    </p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                </Link>
              ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Trending data temporarily unavailable due to rate limiting.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Cryptocurrency Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top 20 Cryptocurrencies (Static Data)
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Built at: {new Date(buildTimestamp).toLocaleDateString()}
          </div>
        </div>
        <CryptoTable data={cryptoList} linkPrefix="/ssg/coin" />
      </div>

      {/* SSG Benefits Showcase */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            ⚡ Performance Benefits
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Instant page loads from CDN</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Zero server processing time</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Perfect Lighthouse scores</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Reduced hosting costs</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📈 SEO Advantages
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>Complete HTML pre-rendered</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>Perfect for search engines</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>Social media preview ready</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>No JavaScript required</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SSG Implementation Details */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          SSG Implementation Details
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-purple-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Build-time Generation:</strong> All pages are pre-rendered
              during the build process
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Static Data:</strong> Content is frozen at build time -
              perfect for stable information
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>CDN Optimized:</strong> Can be served from any CDN
              worldwide for maximum speed
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>generateStaticParams:</strong> Pre-generates all possible
              route variations
            </span>
          </div>
        </div>
      </div>

      {/* When to Use SSG */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 When to Use SSG for Crypto Apps
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
              ✅ Great For:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Cryptocurrency educational content</li>
              <li>• Market overview pages</li>
              <li>• Historical analysis reports</li>
              <li>• Exchange comparison pages</li>
              <li>• Cryptocurrency guides and tutorials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
              ❌ Not Ideal For:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Real-time trading interfaces</li>
              <li>• Live price tickers</li>
              <li>• User-specific portfolios</li>
              <li>• Dynamic charts and graphs</li>
              <li>• Frequently changing market data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/csr"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Compare with CSR
        </Link>
        <Link
          href="/ssr"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Compare with SSR
        </Link>
        <Link
          href="/hybrid"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-colors"
        >
          See Hybrid Approach
        </Link>
      </div>
    </div>
  );
}
