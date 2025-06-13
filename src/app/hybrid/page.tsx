"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCryptoList, useTrending, useGlobalData } from "@/hooks/useCrypto";
import CryptoTable from "@/components/CryptoTable";
import StrategyCard from "@/components/StrategyCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Layers,
  Zap,
  Globe,
  TrendingUp,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { RenderingStrategy } from "@/types/crypto";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";

const hybridStrategy: RenderingStrategy = {
  name: "Hybrid Rendering Strategy",
  description:
    "Strategic combination of CSR, SSR, and SSG for optimal performance and user experience",
  advantages: [
    "Best of all rendering strategies",
    "Optimized for each content type",
    "Excellent performance and SEO",
    "Flexible and scalable architecture",
  ],
  disadvantages: [
    "More complex implementation",
    "Requires careful planning",
    "Multiple strategies to maintain",
    "Potential consistency challenges",
  ],
  useCases: [
    "Complete cryptocurrency platforms",
    "Multi-feature web applications",
    "Content + interactive elements",
    "Production-ready systems",
  ],
  implementation: "Mixed Next.js strategies + Smart component selection",
};

// This would be fetched during SSG/SSR for static content
const staticEducationalContent = {
  title: "Understanding Cryptocurrency Market",
  content:
    "Cryptocurrency markets operate 24/7, providing continuous trading opportunities...",
  buildTime: "2024-01-15T10:30:00Z", // This would be actual build time
  tips: [
    "Always do your own research (DYOR)",
    "Diversify your cryptocurrency portfolio",
    "Understand market volatility",
    "Keep your private keys secure",
  ],
};

export default function HybridDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "live" | "static">(
    "overview"
  );

  // CSR: Real-time data fetching for dynamic content
  const {
    data: cryptoList,
    isLoading: isLoadingCrypto,
    refetch: refetchCrypto,
  } = useCryptoList(1, 10);
  const { data: trending, isLoading: isLoadingTrending } = useTrending();
  const { data: globalData, isLoading: isLoadingGlobal } = useGlobalData(); // Simulate SSR data (would be fetched server-side in real implementation)
  const [ssrData, setSsrData] = useState<{
    marketSummary: {
      totalMarketCap: number;
      totalVolume: number;
      btcDominance: number;
      change24h: number;
    };
  } | null>(null);
  const [ssrTimestamp, setSsrTimestamp] = useState<string>("");

  useEffect(() => {
    // Simulate SSR data fetch
    setSsrData({
      marketSummary: {
        totalMarketCap: 2450000000000,
        totalVolume: 98000000000,
        btcDominance: 42.5,
        change24h: 2.3,
      },
    });
    setSsrTimestamp(new Date().toISOString());
  }, []);
  const handleRefreshAll = () => {
    refetchCrypto();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hybrid Demo - Mixed Rendering Strategies
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          This page demonstrates a hybrid approach, strategically combining CSR,
          SSR, and SSG to optimize performance, SEO, and user experience for
          different content types.
        </p>
      </div>

      {/* Strategy Overview */}
      <StrategyCard strategy={hybridStrategy} isActive={true} />

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Overview (SSR)</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === "live"
                ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-b-2 border-green-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Live Data (CSR)</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("static")}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === "static"
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Static Content (SSG)</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab - SSR */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Market Overview (Server-Side Rendered)
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Generated:{" "}
                  {ssrTimestamp
                    ? new Date(ssrTimestamp).toLocaleString()
                    : "Loading..."}
                </div>
              </div>

              {ssrData ? (
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                      Total Market Cap
                    </h3>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {formatCurrency(ssrData.marketSummary.totalMarketCap)}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {formatPercentage(ssrData.marketSummary.change24h)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                      24h Volume
                    </h3>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {formatCurrency(ssrData.marketSummary.totalVolume)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                      BTC Dominance
                    </h3>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {ssrData.marketSummary.btcDominance}%
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
                      Market Status
                    </h3>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      Active
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      24/7 Trading
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 animate-pulse"
                    >
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  SSR Implementation
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This content is server-side rendered for optimal SEO and
                  immediate content availability. The data is fresh on every
                  page load, ensuring users always see up-to-date market
                  information.
                </p>
              </div>
            </div>
          )}

          {/* Live Data Tab - CSR */}
          {activeTab === "live" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Live Cryptocurrency Data (Client-Side Rendered)
                </h2>
                <button
                  onClick={handleRefreshAll}
                  disabled={isLoadingCrypto}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${
                      isLoadingCrypto ? "animate-spin" : ""
                    }`}
                  />
                  Refresh Live Data
                </button>
              </div>

              {/* Real-time Global Data */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                  Global Market Data (Live)
                </h3>
                {isLoadingGlobal ? (
                  <LoadingSpinner />
                ) : globalData ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Active Cryptocurrencies
                      </p>
                      <p className="text-xl font-bold text-green-800 dark:text-green-200">
                        {globalData.active_cryptocurrencies?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Total Market Cap
                      </p>
                      <p className="text-xl font-bold text-green-800 dark:text-green-200">
                        {formatCurrency(globalData.total_market_cap?.usd || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        24h Change
                      </p>
                      <p
                        className={`text-xl font-bold ${
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
                  </div>
                ) : (
                  <p className="text-green-700 dark:text-green-300">
                    Failed to load global data
                  </p>
                )}
              </div>

              {/* Live Cryptocurrency List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top 10 Cryptocurrencies (Real-time)
                </h3>
                <CryptoTable
                  data={cryptoList || []}
                  isLoading={isLoadingCrypto}
                  linkPrefix="/hybrid/coin"
                />
              </div>

              {/* Trending Coins */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
                  Trending Now (Live)
                </h3>
                {isLoadingTrending ? (
                  <LoadingSpinner />
                ) : trending ? (
                  <div className="grid md:grid-cols-3 gap-3">
                    {trending.slice(0, 6).map((coin, index) => (
                      <div
                        key={coin.item.id}
                        className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-3"
                      >
                        <span className="text-yellow-600 font-bold">
                          #{index + 1}
                        </span>{" "}
                        <Image
                          src={coin.item.thumb}
                          alt={coin.item.name}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {coin.item.name}
                          </p>
                          <p className="text-sm text-gray-500 uppercase">
                            {coin.item.symbol}
                          </p>
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Failed to load trending data
                  </p>
                )}
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  CSR Implementation
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  This content is client-side rendered using React Query for
                  optimal interactivity. Data is cached and updated
                  automatically, providing real-time updates with excellent user
                  experience.
                </p>
              </div>
            </div>
          )}

          {/* Static Content Tab - SSG */}
          {activeTab === "static" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Educational Content (Static Site Generated)
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Built:{" "}
                  {new Date(
                    staticEducationalContent.buildTime
                  ).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-4">
                  {staticEducationalContent.title}
                </h3>
                <p className="text-purple-700 dark:text-purple-300 mb-6 leading-relaxed">
                  {staticEducationalContent.content}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                      💡 Investment Tips
                    </h4>
                    <ul className="space-y-2">
                      {staticEducationalContent.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-purple-700 dark:text-purple-300"
                        >
                          <span className="text-purple-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                      📚 Learn More
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Link
                        href="/ssg"
                        className="block text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        → Understanding Market Analysis
                      </Link>
                      <Link
                        href="/ssg"
                        className="block text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        → Cryptocurrency Security Guide
                      </Link>
                      <Link
                        href="/ssg"
                        className="block text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        → Portfolio Diversification Strategies
                      </Link>
                      <Link
                        href="/ssg"
                        className="block text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        → Technical Analysis Basics
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  SSG Implementation
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  {" "}
                  This educational content is statically generated at build time
                  for optimal SEO and loading performance. Perfect for content
                  that doesn&apos;t change frequently but needs to be highly
                  discoverable.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hybrid Strategy Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              SSR for SEO
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Critical pages like market overviews are server-rendered for optimal
            SEO and immediate content availability.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              CSR for Interactivity
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Real-time data and interactive features use client-side rendering
            for optimal user experience and live updates.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              SSG for Performance
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Static educational content and documentation are pre-generated for
            lightning-fast loading and perfect SEO.
          </p>
        </div>
      </div>

      {/* Implementation Strategy */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hybrid Implementation Strategy
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
              🏗️ SSR Usage
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Market overview pages</li>
              <li>• News and blog posts</li>
              <li>• Search result pages</li>
              <li>• User profile pages</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
              ⚡ CSR Usage
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Trading interfaces</li>
              <li>• Real-time price charts</li>
              <li>• Portfolio dashboards</li>
              <li>• Interactive tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
              📄 SSG Usage
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Educational content</li>
              <li>• Cryptocurrency guides</li>
              <li>• Landing pages</li>
              <li>• Documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/app"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all font-medium"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          See Full Application
        </Link>
      </div>
    </div>
  );
}
