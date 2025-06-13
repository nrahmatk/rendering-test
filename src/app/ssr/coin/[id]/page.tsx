import { cryptoApi } from '@/lib/api';
import { formatCurrency, formatPercentage, getChangeColor, formatNumber } from '@/lib/utils';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Globe, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CoinDetailProps {
  params: {
    id: string;
  };
}

// Server-side data fetching for SSR
async function getCoinData(id: string) {
  try {
    const [coinDetail, priceHistory] = await Promise.all([
      cryptoApi.getCoinDetail(id),
      cryptoApi.getCoinHistory(id, 7),
    ]);

    return {
      coinDetail,
      priceHistory,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('SSR coin data fetching error:', error);
    return {
      coinDetail: null,
      priceHistory: null,
      timestamp: new Date().toISOString(),
    };
  }
}

export default async function SSRCoinDetail({ params }: CoinDetailProps) {
  const { id } = params;
  const { coinDetail, priceHistory, timestamp } = await getCoinData(id);

  if (!coinDetail) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coin not found</h1>
        <Link href="/ssr" className="text-blue-600 hover:text-blue-800">
          ← Back to SSR Demo
        </Link>
      </div>
    );
  }

  const currentPrice = coinDetail.market_data?.current_price?.usd || 0;
  const priceChange24h = coinDetail.market_data?.price_change_percentage_24h || 0;
  const marketCap = coinDetail.market_data?.market_cap?.usd || 0;
  const volume24h = coinDetail.market_data?.total_volume?.usd || 0;

  // Calculate simple price trend from history
  const pricePoints = priceHistory?.prices || [];
  const hasPositiveTrend = pricePoints.length > 1 ? 
    pricePoints[pricePoints.length - 1][1] > pricePoints[0][1] : true;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/ssr"
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

      {/* SSR Timestamp */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Server-Rendered at: {new Date(timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page was rendered on the server with fresh data for this request
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

      {/* Price Trend Visualization (Server-rendered) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          7-Day Price Trend (Server-Rendered)
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              hasPositiveTrend 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {hasPositiveTrend ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {hasPositiveTrend ? 'Upward Trend' : 'Downward Trend'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Based on 7-day price data
            </p>
          </div>
          
          {/* Simple price progression bars */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Recent Price Points:</p>
            <div className="grid grid-cols-7 gap-1 h-20">
              {pricePoints.slice(-7).map((point) => {
                const [timestamp, price] = point;
                const heightPercentage = Math.min(100, Math.max(10, (price / currentPrice) * 100));
                return (
                  <div key={timestamp} className="flex flex-col justify-end">
                    <div
                      className={`w-full rounded-t ${hasPositiveTrend ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ height: `${heightPercentage}%` }}
                      title={`${formatCurrency(price)} - ${new Date(timestamp).toLocaleDateString()}`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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

      {/* SSR Implementation Note */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Calendar className="w-6 h-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              SSR Implementation Note
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              This page demonstrates SSR by fetching all data on the server before rendering. 
              The coin details and price history are fresh for every request, ensuring users 
              always see the latest data. Notice how there are no loading states - the content 
              is immediately available.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/ssr"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          ← Back to SSR Demo
        </Link>
        <Link
          href={`/csr/coin/${id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Compare with CSR
        </Link>
      </div>
    </div>
  );
}
