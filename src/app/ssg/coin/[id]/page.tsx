import { getCoinDetail, getTopCryptos } from "@/lib/api";
import { fallbackCoinData, fallbackPriceHistory } from "@/lib/fallback-data";
import { CryptoData } from "@/types/crypto";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
  formatNumber,
} from "@/lib/utils";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Globe,
  ExternalLink,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CoinDetailProps {
  params: {
    id: string;
  };
}

// Generate static paths for popular cryptocurrencies
export async function generateStaticParams() {
  try {
    // Use environment variable to control number of coins, with fallback
    const maxCoins = process.env.SSG_MAX_COINS
      ? parseInt(process.env.SSG_MAX_COINS)
      : 10; // Increased from 5 to 10

    console.log(`Generating static params for ${maxCoins} coins...`);
    const cryptoList = await getTopCryptos(maxCoins);

    console.log(
      `Successfully got ${cryptoList.length} coins for SSG:`,
      cryptoList.map((c) => c.id).join(", ")
    );

    return cryptoList.map((crypto: CryptoData) => ({
      id: crypto.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback to top cryptocurrencies
    return [
      { id: "bitcoin" },
      { id: "ethereum" },
      { id: "binancecoin" },
      { id: "cardano" },
      { id: "solana" },
      { id: "polkadot" },
      { id: "dogecoin" },
      { id: "avalanche-2" },
      { id: "chainlink" },
      { id: "polygon" },
    ];
  }
}

// Build-time data fetching for each coin
async function getCoinStaticData(id: string) {
  try {
    // Sequential calls to avoid overwhelming the API
    console.log(`[SSG] Fetching data for ${id}...`);

    const coinDetail = await getCoinDetail(id);
    // Skip price history to avoid rate limit during build, use fallback data
    const priceHistory = fallbackPriceHistory;

    console.log(`[SSG] Successfully fetched data for ${id}`);
    return {
      coinDetail,
      priceHistory,
      buildTimestamp: new Date().toISOString(),
      isFromAPI: true,
    };
  } catch (error) {
    console.error(`[SSG] Data fetching error for ${id}:`, error);

    // Use fallback data if API fails
    const fallbackCoin = fallbackCoinData[id as keyof typeof fallbackCoinData];

    if (fallbackCoin) {
      console.log(`[SSG] Using fallback data for ${id}`);
      return {
        coinDetail: fallbackCoin,
        priceHistory: fallbackPriceHistory,
        buildTimestamp: new Date().toISOString(),
        isFromAPI: false,
      };
    }

    // If no fallback available, create minimal data
    console.warn(
      `[SSG] No data available for ${id}, creating minimal fallback`
    );
    return {
      coinDetail: {
        id,
        symbol: id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        market_cap_rank: 999,
        hashing_algorithm: "Unknown",
        block_time_in_minutes: 0,
        genesis_date: "Unknown",
        market_data: {
          current_price: { usd: 0 },
          market_cap: { usd: 0 },
          total_volume: { usd: 0 },
          price_change_percentage_24h: 0,
          price_change_percentage_7d: 0,
          price_change_percentage_30d: 0,
          ath: { usd: 0 },
          ath_change_percentage: { usd: 0 },
          atl: { usd: 0 },
          atl_change_percentage: { usd: 0 },
          circulating_supply: 0,
          total_supply: 0,
        },
        description: {
          en: `Information for ${id} is currently unavailable.`,
        },
        image: {
          large:
            "https://via.placeholder.com/200x200.png?text=" + id.toUpperCase(),
        },
        links: {
          homepage: [],
          twitter_screen_name: "",
        },
      },
      priceHistory: fallbackPriceHistory,
      buildTimestamp: new Date().toISOString(),
      isFromAPI: false,
    };
  }
}

export default async function SSGCoinDetail({ params }: CoinDetailProps) {
  const { id } = params;
  const { coinDetail, priceHistory, buildTimestamp, isFromAPI } =
    await getCoinStaticData(id);

  if (!coinDetail) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coin not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This coin page was not pre-generated. Check our popular coins list.
        </p>
        <Link href="/ssg" className="text-blue-600 hover:text-blue-800">
          ← Back to SSG Demo
        </Link>
      </div>
    );
  }

  const currentPrice = coinDetail.market_data?.current_price?.usd || 0;
  const priceChange24h =
    coinDetail.market_data?.price_change_percentage_24h || 0;
  const priceChange7d = coinDetail.market_data?.price_change_percentage_7d || 0;
  const priceChange30d =
    coinDetail.market_data?.price_change_percentage_30d || 0;
  const marketCap = coinDetail.market_data?.market_cap?.usd || 0;
  const volume24h = coinDetail.market_data?.total_volume?.usd || 0;
  // Calculate price statistics from historical data
  const pricePoints = priceHistory?.prices || [];
  const prices = pricePoints.map((point: number[]) => point[1]);
  const avgPrice =
    prices.length > 0
      ? prices.reduce((a: number, b: number) => a + b, 0) / prices.length
      : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/ssg"
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
      </div>{" "}
      {/* SSG Build Information */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Layers className="w-5 h-5 text-purple-600" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">
              Static Page Generated at:{" "}
              {new Date(buildTimestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page was pre-rendered at build time with snapshot data -
              perfect for SEO and lightning-fast loading
            </p>
            {!isFromAPI && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  Using fallback data due to API rate limit during build
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Price Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Price Overview (Build-time Snapshot)
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Current Price
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(currentPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              24h Change
            </p>
            <div className="flex items-center space-x-2">
              {priceChange24h > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <p
                className={`text-xl font-bold ${getChangeColor(
                  priceChange24h
                )}`}
              >
                {formatPercentage(priceChange24h)}
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
        </div>
      </div>
      {/* Extended Price Analysis */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Price Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                24h Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(priceChange24h)}`}
              >
                {formatPercentage(priceChange24h)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                7d Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(priceChange7d)}`}
              >
                {formatPercentage(priceChange7d)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                30d Change
              </span>
              <span
                className={`font-semibold ${getChangeColor(priceChange30d)}`}
              >
                {formatPercentage(priceChange30d)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            30-Day Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Average Price
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(avgPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Highest Price
              </span>
              <span className="font-semibold text-green-600">
                {formatCurrency(maxPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Lowest Price
              </span>
              <span className="font-semibold text-red-600">
                {formatCurrency(minPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Market Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Comprehensive Market Data
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              All-Time High
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
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

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              All-Time Low
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
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

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Circulating Supply
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatNumber(coinDetail.market_data?.circulating_supply || 0)}
            </p>
            <p className="text-sm text-gray-500">
              {coinDetail.symbol?.toUpperCase()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Total Supply
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {coinDetail.market_data?.total_supply
                ? formatNumber(coinDetail.market_data.total_supply)
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {coinDetail.symbol?.toUpperCase()}
            </p>
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
                    coinDetail.description.en.split(".").slice(0, 5).join(".") +
                    ".",
                }}
              />
            ) : (
              <p>No description available for this cryptocurrency.</p>
            )}
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
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
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Technical Info
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
      {/* SSG Benefits for this page */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          SSG Benefits for Cryptocurrency Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
              ⚡ Performance
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Instant loading from CDN</li>
              <li>• Perfect for SEO and sharing</li>
              <li>• No API calls on page load</li>
              <li>• Consistent fast experience</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
              📊 Use Cases
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Cryptocurrency profiles & overviews</li>
              <li>• Educational content about coins</li>
              <li>• Historical analysis reports</li>
              <li>• Marketing and landing pages</li>
            </ul>
          </div>
        </div>
      </div>
      {/* SSG Implementation Note */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Calendar className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              SSG Implementation for Coin Pages
            </h4>{" "}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              This page was pre-generated using generateStaticParams for the top
              50 cryptocurrencies. The data represents a snapshot from build
              time, making it perfect for general information that doesn&apos;t
              need real-time updates.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <code className="text-xs text-gray-800 dark:text-gray-200">
                export async function generateStaticParams() {"{"}
                <br />
                &nbsp;&nbsp;const cryptos = await cryptoApi.getTopCryptos(50);
                <br />
                &nbsp;&nbsp;return cryptos.map(crypto =&gt; (
                <code>&#123; id: crypto.id &#125;</code>));
                <br />
                {"}"}
              </code>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/ssg"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          ← Back to SSG Demo
        </Link>
        <Link
          href={`/csr/coin/${id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Compare with CSR
        </Link>
        <Link
          href={`/ssr/coin/${id}`}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Compare with SSR
        </Link>
      </div>
    </div>
  );
}
