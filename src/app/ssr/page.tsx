import Image from "next/image";
import { cryptoApi } from "@/lib/api";
import CryptoTable from "@/components/CryptoTable";
import StrategyCard from "@/components/StrategyCard";
import { Globe, Clock, Search, TrendingUp, Zap } from "lucide-react";
import { RenderingStrategy } from "@/types/crypto";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";

const ssrStrategy: RenderingStrategy = {
  name: "Server-Side Rendering (SSR)",
  description:
    "Pages are rendered on the server for each request, ensuring fresh data and optimal SEO",
  advantages: [
    "Excellent SEO optimization",
    "Fast initial content display",
    "Always fresh data on page load",
    "Better social media sharing",
  ],
  disadvantages: [
    "Higher server resource usage",
    "Slower subsequent navigation",
    "No client-side caching benefits",
    "Server dependency for every request",
  ],
  useCases: [
    "Cryptocurrency news pages",
    "Market analysis reports",
    "SEO-critical pages",
    "Real-time data requirements",
  ],
  implementation: "Server Components + fetch on every request",
};

// This runs on the server for every request
async function getServerSideData() {
  try {
    // Fetch data on the server
    const [cryptoList, globalData, trending] = await Promise.all([
      cryptoApi.getCryptoList(1, 20),
      cryptoApi.getGlobalData(),
      cryptoApi.getTrending(),
    ]);

    return {
      cryptoList,
      globalData,
      trending,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("SSR data fetching error:", error);
    return {
      cryptoList: [],
      globalData: null,
      trending: [],
      timestamp: new Date().toISOString(),
    };
  }
}

export default async function SSRDemo() {
  // Server-side data fetching
  const { cryptoList, globalData, trending, timestamp } =
    await getServerSideData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <Globe className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SSR Demo - Server-Side Rendering
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          This page demonstrates Server-Side Rendering. All data is fetched on
          the server for every request, ensuring fresh content and optimal SEO
          performance.
        </p>
      </div>

      {/* Strategy Overview */}
      <StrategyCard strategy={ssrStrategy} isActive={true} />

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Time to Content
            </h3>
          </div>
          <p className="text-2xl font-bold text-green-600">~500ms</p>
          <p className="text-sm text-gray-500">Content visible immediately</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Search className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              SEO Score
            </h3>
          </div>
          <p className="text-2xl font-bold text-green-600">Excellent</p>
          <p className="text-sm text-gray-500">Fully crawlable content</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Server Load
            </h3>
          </div>
          <p className="text-2xl font-bold text-orange-600">High</p>
          <p className="text-sm text-gray-500">Processing per request</p>
        </div>
      </div>

      {/* Server Timestamp */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Server Render Timestamp
            </h3>
            <p className="text-green-700 dark:text-green-300">
              This page was rendered on: {new Date(timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Refresh the page to see a new timestamp - demonstrating fresh
              server rendering
            </p>
          </div>
        </div>
      </div>

      {/* Global Market Overview */}
      {globalData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Global Market Overview (Server-Rendered)
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
        </div>
      )}

      {/* Trending Cryptocurrencies */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Trending Now (Server-Rendered)
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.slice(0, 6).map((trendingCoin, index) => (
            <Link
              key={trendingCoin.item.id}
              href={`/ssr/coin/${trendingCoin.item.id}`}
              className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold">
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
              <TrendingUp className="w-4 h-4 text-green-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Cryptocurrency Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Top Cryptocurrencies (Server-Rendered)
        </h2>
        <CryptoTable data={cryptoList} linkPrefix="/ssr/coin" />
      </div>

      {/* SSR Implementation Details */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          SSR Implementation Details
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Server Components:</strong> All data fetching happens on
              the server before rendering
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Fresh Data:</strong> Every page request fetches the latest
              data from CoinGecko API
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>SEO Optimized:</strong> Search engines can crawl all
              content immediately
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>No Loading States:</strong> Content is immediately
              available to users
            </span>
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
          href="/ssg"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Compare with SSG
        </Link>
      </div>
    </div>
  );
}
