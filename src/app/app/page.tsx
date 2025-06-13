"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useCryptoList,
  useTrending,
  useGlobalData,
  useFearGreedIndex,
} from "@/hooks/useCrypto";
import CryptoTable from "@/components/CryptoTable";
import {
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  Bell,
  Settings,
  ChevronDown,
  Star,
  BarChart3,
  DollarSign,
  Briefcase,
  Globe,
  Activity,
} from "lucide-react";
import { formatCurrency, formatPercentage, debounce } from "@/lib/utils";
import Link from "next/link";

export default function FullApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);

  // Data fetching
  const {
    data: cryptoList,
    isLoading: isLoadingCrypto,
    refetch: refetchCrypto,
  } = useCryptoList(page, perPage);
  const { data: trending, isLoading: isLoadingTrending } = useTrending();
  const { data: globalData, isLoading: isLoadingGlobal } = useGlobalData();
  const { data: fearGreedData } = useFearGreedIndex();

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredCryptos =
    cryptoList?.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">CryptoDashboard Pro</h1>
            <p className="text-blue-100">
              Complete cryptocurrency trading and analysis platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Market Cap</span>
              <Globe className="w-4 h-4 text-blue-200" />
            </div>
            {isLoadingGlobal ? (
              <div className="h-6 bg-white/20 rounded animate-pulse"></div>
            ) : (
              <>
                <p className="text-xl font-bold">
                  {globalData
                    ? formatCurrency(globalData.total_market_cap?.usd || 0)
                    : "Loading..."}
                </p>{" "}
                <p
                  className={`text-sm ${
                    globalData?.market_cap_change_percentage_24h_usd &&
                    globalData.market_cap_change_percentage_24h_usd > 0
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {globalData
                    ? formatPercentage(
                        globalData.market_cap_change_percentage_24h_usd || 0
                      )
                    : ""}
                </p>
              </>
            )}
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">24h Volume</span>
              <BarChart3 className="w-4 h-4 text-blue-200" />
            </div>
            {isLoadingGlobal ? (
              <div className="h-6 bg-white/20 rounded animate-pulse"></div>
            ) : (
              <p className="text-xl font-bold">
                {globalData
                  ? formatCurrency(globalData.total_volume?.usd || 0)
                  : "Loading..."}
              </p>
            )}
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">BTC Dominance</span>
              <DollarSign className="w-4 h-4 text-blue-200" />
            </div>
            {isLoadingGlobal ? (
              <div className="h-6 bg-white/20 rounded animate-pulse"></div>
            ) : (
              <p className="text-xl font-bold">
                {globalData
                  ? `${globalData.market_cap_percentage?.btc?.toFixed(1) || 0}%`
                  : "Loading..."}
              </p>
            )}
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Fear & Greed</span>
              <Activity className="w-4 h-4 text-blue-200" />
            </div>
            {fearGreedData ? (
              <>
                <p className="text-xl font-bold">{fearGreedData.value}</p>
                <p className="text-sm text-blue-200">
                  {fearGreedData.classification}
                </p>
              </>
            ) : (
              <div className="h-6 bg-white/20 rounded animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Trending Cryptocurrencies */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Trending Now
          </h2>
          <Link
            href="/trending"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        {isLoadingTrending ? (
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {trending?.slice(0, 7).map((coin, index) => (
              <Link
                key={coin.item.id}
                href={`/app/coin/${coin.item.id}`}
                className="flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors min-w-[160px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>{" "}
                  <Image
                    src={coin.item.thumb}
                    alt={coin.item.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {coin.item.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {coin.item.symbol}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Cryptocurrency Markets
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => refetchCrypto()}
              disabled={isLoadingCrypto}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${
                  isLoadingCrypto ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="market_cap_desc">
                    Market Cap (High to Low)
                  </option>
                  <option value="market_cap_asc">
                    Market Cap (Low to High)
                  </option>
                  <option value="volume_desc">Volume (High to Low)</option>
                  <option value="id_asc">Name (A to Z)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Market Cap Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="">All</option>
                  <option value="large">$10B+</option>
                  <option value="mid">$1B - $10B</option>
                  <option value="small">$100M - $1B</option>
                  <option value="micro">Under $100M</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Change (24h)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="">All</option>
                  <option value="gainers">Gainers (+)</option>
                  <option value="losers">Losers (-)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredCryptos.length} cryptocurrencies
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {page}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
            >
              Next
            </button>
          </div>
        </div>

        {/* Cryptocurrency Table */}
        <CryptoTable
          data={filteredCryptos}
          isLoading={isLoadingCrypto}
          linkPrefix="/app/coin"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/app/portfolio"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Portfolio
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Track your cryptocurrency investments and performance
          </p>
        </Link>

        <Link
          href="/app/watchlist"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800 transition-colors">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Watchlist
            </h3>
          </div>{" "}
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Keep track of cryptocurrencies you&apos;re interested in
          </p>
        </Link>

        <Link
          href="/app/news"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
              <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              News & Analysis
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Stay updated with latest cryptocurrency news and market analysis
          </p>
        </Link>
      </div>

      {/* Implementation Note */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🚀 Full Application Implementation
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This represents a complete cryptocurrency platform that strategically
          uses all rendering strategies:
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
              CSR Components
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Real-time price updates</li>
              <li>• Interactive charts</li>
              <li>• Portfolio management</li>
              <li>• Search and filtering</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
              SSR Pages
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Market overview</li>
              <li>• News articles</li>
              <li>• Coin detail pages</li>
              <li>• Search results</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
              SSG Content
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Educational guides</li>
              <li>• About pages</li>
              <li>• Documentation</li>
              <li>• Landing pages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
