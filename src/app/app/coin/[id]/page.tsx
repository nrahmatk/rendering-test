"use client";

import { useState } from "react";
import {
  useCoinDetail,
  useCoinHistory,
  useRealTimePrice,
} from "@/hooks/useCrypto";
import PriceChart from "@/components/PriceChart";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Globe,
  ExternalLink,
  Star,
  Bell,
  Share2,
  Plus,
  Minus,
  Activity,
  BarChart3,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
  formatNumber,
} from "@/lib/utils";

interface CoinDetailProps {
  params: {
    id: string;
  };
}

export default function AppCoinDetail({ params }: CoinDetailProps) {
  const { id } = params;
  const [chartDays, setChartDays] = useState(7);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [amount, setAmount] = useState("");

  const { data: coinDetail, isLoading: isLoadingDetail } = useCoinDetail(id);
  const { data: priceHistory, isLoading: isLoadingChart } = useCoinHistory(
    id,
    chartDays
  );
  const { data: realTimeData } = useRealTimePrice(id);

  if (isLoadingDetail) {
    return (
      <div className="space-y-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!coinDetail) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coin not found
        </h1>
        <Link href="/app" className="text-blue-600 hover:text-blue-800">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const currentPrice =
    realTimeData?.market_data?.current_price?.usd ||
    coinDetail.market_data?.current_price?.usd ||
    0;
  const priceChange24h =
    realTimeData?.market_data?.price_change_percentage_24h ||
    coinDetail.market_data?.price_change_percentage_24h ||
    0;
  const marketCap = coinDetail.market_data?.market_cap?.usd || 0;
  const volume24h = coinDetail.market_data?.total_volume?.usd || 0;

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    // In real app, this would save to user's watchlist
  };

  const handleBuy = () => {
    setShowBuyModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/app"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="flex items-center space-x-3">
            <Image
              src={coinDetail.image?.large || ""}
              alt={coinDetail.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {coinDetail.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 uppercase">
                {coinDetail.symbol}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleWatchlist}
            className={`p-2 rounded-lg transition-colors ${
              isWatchlisted
                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Star
              className={`w-5 h-5 ${isWatchlisted ? "fill-current" : ""}`}
            />
          </button>
          <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Price Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Current Price
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(currentPrice)}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              {priceChange24h > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <p
                className={`text-sm font-medium ${getChangeColor(
                  priceChange24h
                )}`}
              >
                {formatPercentage(priceChange24h)} (24h)
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Market Cap
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(marketCap)}
            </p>
            <p className="text-sm text-gray-500">
              Rank #{coinDetail.market_cap_rank}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Volume (24h)
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(volume24h)}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleBuy}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Buy
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <Minus className="w-4 h-4 mr-2" />
              Sell
            </button>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Price Chart
          </h2>
          <div className="flex space-x-2">
            {[1, 7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setChartDays(days)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  chartDays === days
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>

        {priceHistory ? (
          <PriceChart
            data={priceHistory}
            days={chartDays}
            isLoading={isLoadingChart}
          />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Market Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                All-Time High
              </span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(coinDetail.market_data?.ath?.usd || 0)}
                </p>
                <p
                  className={`text-sm ${getChangeColor(
                    coinDetail.market_data?.ath_change_percentage?.usd || 0
                  )}`}
                >
                  {formatPercentage(
                    coinDetail.market_data?.ath_change_percentage?.usd || 0
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                All-Time Low
              </span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(coinDetail.market_data?.atl?.usd || 0)}
                </p>
                <p
                  className={`text-sm ${getChangeColor(
                    coinDetail.market_data?.atl_change_percentage?.usd || 0
                  )}`}
                >
                  {formatPercentage(
                    coinDetail.market_data?.atl_change_percentage?.usd || 0
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Trading Volume
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(volume24h)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Supply Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Circulating Supply
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(coinDetail.market_data?.circulating_supply || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Supply
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {coinDetail.market_data?.total_supply
                  ? formatNumber(coinDetail.market_data.total_supply)
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Max Supply
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {coinDetail.market_data?.max_supply
                  ? formatNumber(coinDetail.market_data.max_supply)
                  : "No Limit"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Price Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                1h Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(
                  coinDetail.market_data?.price_change_percentage_1h_in_currency
                    ?.usd || 0
                )}`}
              >
                {formatPercentage(
                  coinDetail.market_data?.price_change_percentage_1h_in_currency
                    ?.usd || 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                7d Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(
                  coinDetail.market_data?.price_change_percentage_7d || 0
                )}`}
              >
                {formatPercentage(
                  coinDetail.market_data?.price_change_percentage_7d || 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                30d Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(
                  coinDetail.market_data?.price_change_percentage_30d || 0
                )}`}
              >
                {formatPercentage(
                  coinDetail.market_data?.price_change_percentage_30d || 0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          About {coinDetail.name}
        </h3>
        <div className="space-y-4">
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {coinDetail.description?.en ? (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    coinDetail.description.en.split(".").slice(0, 4).join(".") +
                    ".",
                }}
              />
            ) : (
              <p>No description available for this cryptocurrency.</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Official Links
              </h4>
              <div className="space-y-2">
                {coinDetail.links?.homepage?.[0] && (
                  <a
                    href={coinDetail.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Official Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {coinDetail.links?.twitter_screen_name && (
                  <a
                    href={`https://twitter.com/${coinDetail.links.twitter_screen_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <span>Twitter</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Technical Details
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {coinDetail.hashing_algorithm && (
                  <p>
                    <strong>Algorithm:</strong> {coinDetail.hashing_algorithm}
                  </p>
                )}
                {coinDetail.block_time_in_minutes && (
                  <p>
                    <strong>Block Time:</strong>{" "}
                    {coinDetail.block_time_in_minutes} minutes
                  </p>
                )}
                {coinDetail.genesis_date && (
                  <p>
                    <strong>Genesis Date:</strong>{" "}
                    {new Date(coinDetail.genesis_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Buy {coinDetail.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              {amount && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You will receive approximately:
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {(parseFloat(amount) / currentPrice).toFixed(6)}{" "}
                    {coinDetail.symbol?.toUpperCase()}
                  </p>
                </div>
              )}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In real app, this would execute the trade
                    setShowBuyModal(false);
                    setAmount("");
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
