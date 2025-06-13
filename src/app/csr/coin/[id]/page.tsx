'use client';

import { useCoinDetail, useCoinHistory } from '@/hooks/useCrypto';
import PriceChart from '@/components/PriceChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency, formatPercentage, getChangeColor, formatNumber } from '@/lib/utils';
import { useState } from 'react';

interface CoinDetailProps {
  params: {
    id: string;
  };
}

export default function CoinDetail({ params }: CoinDetailProps) {
  const { id } = params;
  const [chartDays, setChartDays] = useState(7);

  const { data: coinDetail, isLoading: isLoadingDetail } = useCoinDetail(id);
  const { data: priceHistory, isLoading: isLoadingChart } = useCoinHistory(id, chartDays);

  if (isLoadingDetail) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!coinDetail) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coin not found</h1>
        <Link href="/csr" className="text-blue-600 hover:text-blue-800">
          ← Back to CSR Demo
        </Link>
      </div>
    );
  }

  const currentPrice = coinDetail.market_data?.current_price?.usd || 0;
  const priceChange24h = coinDetail.market_data?.price_change_percentage_24h || 0;
  const marketCap = coinDetail.market_data?.market_cap?.usd || 0;
  const volume24h = coinDetail.market_data?.total_volume?.usd || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/csr"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex items-center space-x-3">
          <Image
            src={coinDetail.image?.large || ''}
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

      {/* Price Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(currentPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">24h Change</p>
            <div className="flex items-center space-x-2">
              {priceChange24h > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <p className={`text-xl font-bold ${getChangeColor(priceChange24h)}`}>
                {formatPercentage(priceChange24h)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Market Cap</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(marketCap)}
            </p>
            <p className="text-sm text-gray-500">
              Rank #{coinDetail.market_cap_rank}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Volume (24h)</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(volume24h)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Price Chart</h2>
          <div className="flex space-x-2">
            {[1, 7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setChartDays(days)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  chartDays === days
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>
        
        {priceHistory ? (
          <PriceChart data={priceHistory} days={chartDays} isLoading={isLoadingChart} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Market Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Market Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">All-Time High</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(coinDetail.market_data?.ath?.usd || 0)}
                </p>
                <p className={`text-sm ${getChangeColor(coinDetail.market_data?.ath_change_percentage?.usd || 0)}`}>
                  {formatPercentage(coinDetail.market_data?.ath_change_percentage?.usd || 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">All-Time Low</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(coinDetail.market_data?.atl?.usd || 0)}
                </p>
                <p className={`text-sm ${getChangeColor(coinDetail.market_data?.atl_change_percentage?.usd || 0)}`}>
                  {formatPercentage(coinDetail.market_data?.atl_change_percentage?.usd || 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Circulating Supply</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(coinDetail.market_data?.circulating_supply || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Supply</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {coinDetail.market_data?.total_supply 
                  ? formatNumber(coinDetail.market_data.total_supply)
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            About {coinDetail.name}
          </h3>
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {coinDetail.description?.en ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: coinDetail.description.en.split('.').slice(0, 3).join('.') + '.' 
                  }} 
                />
              ) : (
                <p>No description available.</p>
              )}
            </div>
            
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
        </div>
      </div>

      {/* CSR Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Calendar className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              CSR Implementation Note
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              This page demonstrates CSR by fetching all data client-side using React Query. 
              The price chart updates dynamically based on the selected time period, and all 
              data is cached for optimal performance. Notice how the loading states are visible 
              during data fetching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
