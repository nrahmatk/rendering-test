"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useCryptoList,
  useSearchCoins,
  useRealTimePrice,
} from "@/hooks/useCrypto";
import CryptoTable from "@/components/CryptoTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import StrategyCard from "@/components/StrategyCard";
import { Search, RefreshCw, Zap, Clock, TrendingUp } from "lucide-react";
import { RenderingStrategy } from "@/types/crypto";
import { debounce } from "@/lib/utils";

const csrStrategy: RenderingStrategy = {
  name: "Client-Side Rendering (CSR)",
  description:
    "All rendering happens in the browser using JavaScript and React Query for data fetching",
  advantages: [
    "Real-time data updates with React Query",
    "Excellent for interactive dashboards",
    "Efficient client-side caching",
    "Smooth user interactions",
  ],
  disadvantages: [
    "Slow initial page load",
    "No SEO optimization",
    "Requires JavaScript enabled",
    "Loading states visible to users",
  ],
  useCases: [
    "Trading dashboards",
    "Portfolio management",
    "Real-time price monitoring",
    "User-specific data views",
  ],
  implementation: "'use client' + React Query hooks",
};

export default function CSRDemo() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  // CSR data fetching with React Query
  const {
    data: cryptoList,
    isLoading: isLoadingList,
    refetch: refetchList,
  } = useCryptoList(page, 20);
  const { data: searchResults, isLoading: isSearching } =
    useSearchCoins(searchQuery);
  const { data: realTimeData, isLoading: isLoadingRealTime } =
    useRealTimePrice(selectedCoin);

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleRefresh = () => {
    refetchList();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CSR Demo - Client-Side Rendering
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          This page demonstrates Client-Side Rendering with React Query. All
          data is fetched in the browser, providing real-time updates and
          interactive features.
        </p>
      </div>

      {/* Strategy Overview */}
      <StrategyCard strategy={csrStrategy} isActive={true} />

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Initial Load
            </h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">~2-3s</p>
          <p className="text-sm text-gray-500">Includes JS bundle loading</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Interactivity
            </h3>
          </div>
          <p className="text-2xl font-bold text-green-600">Excellent</p>
          <p className="text-sm text-gray-500">Real-time updates</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Search className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              SEO Score
            </h3>
          </div>
          <p className="text-2xl font-bold text-red-600">Poor</p>
          <p className="text-sm text-gray-500">Content not crawlable</p>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interactive Cryptocurrency Data
          </h2>
          <button
            onClick={handleRefresh}
            disabled={isLoadingList}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoadingList ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>
        </div>

        {/* Search Feature */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-time Search
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {isSearching && searchQuery && (
            <div className="mt-4">
              <LoadingSpinner size="sm" />
            </div>
          )}

          {searchResults && searchQuery && !isSearching && (
            <div className="mt-4 space-y-2">
              {" "}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Found {searchResults.length} results for &quot;{searchQuery}
                &quot;
              </p>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {searchResults
                  .slice(0, 5)
                  .map(
                    (coin: {
                      id: string;
                      name: string;
                      symbol: string;
                      thumb: string;
                    }) => (
                      <div
                        key={coin.id}
                        onClick={() => setSelectedCoin(coin.id)}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                      >
                        {" "}
                        <Image
                          src={coin.thumb}
                          alt={coin.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {coin.name}
                          </p>
                          <p className="text-sm text-gray-500 uppercase">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Real-time Price Tracker */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-time Price Tracker - {selectedCoin}
          </h3>
          {isLoadingRealTime ? (
            <LoadingSpinner />
          ) : realTimeData ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Price
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${realTimeData.market_data?.current_price?.usd?.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  24h Change
                </p>
                <p
                  className={`text-xl font-bold ${
                    realTimeData.market_data?.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {realTimeData.market_data?.price_change_percentage_24h?.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Market Cap
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  $
                  {(realTimeData.market_data?.market_cap?.usd / 1e9)?.toFixed(
                    2
                  )}
                  B
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Volume
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  $
                  {(realTimeData.market_data?.total_volume?.usd / 1e9)?.toFixed(
                    2
                  )}
                  B
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        {/* Cryptocurrency List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Cryptocurrencies (Live Data)
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                Next
              </button>
            </div>
          </div>

          <CryptoTable
            data={cryptoList || []}
            isLoading={isLoadingList}
            linkPrefix="/csr/coin"
          />
        </div>
      </div>

      {/* CSR Characteristics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          CSR Implementation Details
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>React Query:</strong> Handles caching, background updates,
              and error retry logic
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Client Components:</strong> All components use &apos;use
              client&apos; directive
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Real-time Updates:</strong> Data refreshes automatically
              every 30 seconds
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>Loading States:</strong> Skeleton loaders and spinners for
              better UX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
