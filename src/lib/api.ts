import axios from "axios";
import {
  CryptoData,
  CoinDetail,
  PriceHistoryData,
  TrendingCoin,
  ExchangeData,
  SearchResult,
  GlobalMarketData,
  CategoryData,
} from "@/types/crypto";
import { fallbackCoinData, getFallbackCryptoList } from "./fallback-data";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Create axios instance with default config
export const coinGeckoApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Add request interceptor for rate limiting
coinGeckoApi.interceptors.request.use((config) => {
  // Use environment variable for delay, with fallbacks
  const baseDelay = process.env.COINGECKO_API_DELAY
    ? parseInt(process.env.COINGECKO_API_DELAY)
    : 2000; // 2 seconds default

  // Increase delay during build to avoid rate limits
  const delay =
    process.env.NODE_ENV === "production" || process.env.VERCEL
      ? Math.max(baseDelay, 3000) // Minimum 3 seconds in production
      : 500; // 500ms in development

  return new Promise((resolve) => {
    setTimeout(() => resolve(config), delay);
  });
});

// Response interceptor for error handling with retry logic
coinGeckoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // If rate limited (429), wait and retry during build time
    if (error.response?.status === 429) {
      // Only retry during build/production
      if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
        config.retryCount = config.retryCount || 0;

        if (config.retryCount < 3) {
          config.retryCount += 1;
          const waitTime = 30000; // 30 seconds

          console.log(
            `Rate limited. Waiting ${waitTime / 1000}s before retry ${
              config.retryCount
            }/3...`
          );

          await new Promise((resolve) => setTimeout(resolve, waitTime));
          return coinGeckoApi(config);
        }
      }

      console.log(`Rate limited. Using fallback data.`);
      return Promise.reject(error);
    }

    console.error(
      "CoinGecko API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export const cryptoApi = {
  // Get cryptocurrency list with market data
  getCryptoList: async (
    page: number = 1,
    perPage: number = 100,
    order: string = "market_cap_desc"
  ): Promise<CryptoData[]> => {
    const response = await coinGeckoApi.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order,
        per_page: perPage,
        page,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
    return response.data;
  },
  // Get top cryptocurrencies (for SSG)
  getTopCryptos: async (limit: number = 10): Promise<CryptoData[]> => {
    try {
      const response = await coinGeckoApi.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: limit,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get top cryptos, using fallback:", error);
      // Return fallback data with top cryptocurrencies
      return getFallbackCryptoList(limit);
    }
  },

  // Get detailed information about a specific coin
  getCoinDetail: async (id: string): Promise<CoinDetail> => {
    const response = await coinGeckoApi.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return response.data;
  },

  // Get price history for a specific coin
  getCoinHistory: async (
    id: string,
    days: number = 7,
    interval?: string
  ): Promise<PriceHistoryData> => {
    const response = await coinGeckoApi.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
        interval: interval || (days <= 1 ? "hourly" : "daily"),
      },
    });
    return response.data;
  },

  // Get trending cryptocurrencies
  getTrending: async (): Promise<TrendingCoin[]> => {
    const response = await coinGeckoApi.get("/search/trending");
    return response.data.coins;
  },
  // Search cryptocurrencies
  searchCoins: async (query: string): Promise<SearchResult[]> => {
    const response = await coinGeckoApi.get("/search", {
      params: { query },
    });
    return response.data.coins;
  },

  // Get global market data
  getGlobalData: async (): Promise<GlobalMarketData> => {
    const response = await coinGeckoApi.get("/global");
    return response.data.data;
  },

  // Get exchange list
  getExchanges: async (
    page: number = 1,
    perPage: number = 10
  ): Promise<ExchangeData[]> => {
    const response = await coinGeckoApi.get("/exchanges", {
      params: {
        per_page: perPage,
        page,
      },
    });
    return response.data;
  },

  // Get fear and greed index (simulated since CoinGecko doesn't have this)
  getFearGreedIndex: async (): Promise<{
    value: number;
    classification: string;
  }> => {
    // Simulate fear and greed index based on market data
    const marketData = await cryptoApi.getGlobalData();
    const changePercentage =
      marketData.market_cap_change_percentage_24h_usd || 0;

    let value: number;
    let classification: string;

    if (changePercentage > 5) {
      value = Math.floor(Math.random() * 25) + 75; // 75-100 (Extreme Greed)
      classification = "Extreme Greed";
    } else if (changePercentage > 2) {
      value = Math.floor(Math.random() * 20) + 55; // 55-75 (Greed)
      classification = "Greed";
    } else if (changePercentage > -2) {
      value = Math.floor(Math.random() * 20) + 40; // 40-60 (Neutral)
      classification = "Neutral";
    } else if (changePercentage > -5) {
      value = Math.floor(Math.random() * 20) + 20; // 20-40 (Fear)
      classification = "Fear";
    } else {
      value = Math.floor(Math.random() * 20) + 0; // 0-20 (Extreme Fear)
      classification = "Extreme Fear";
    }

    return { value, classification };
  },
  // Get coin categories
  getCategories: async (): Promise<CategoryData[]> => {
    const response = await coinGeckoApi.get("/coins/categories");
    return response.data;
  },

  // Get coins by category
  getCoinsByCategory: async (categoryId: string): Promise<CryptoData[]> => {
    const response = await coinGeckoApi.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        category: categoryId,
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
      },
    });
    return response.data;
  },
};

// Wrapper function for getCoinDetail with fallback data
export const getCoinDetail = async (id: string): Promise<CoinDetail> => {
  try {
    console.log(`Fetching data for ${id}...`);
    return await cryptoApi.getCoinDetail(id);
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number };
      message?: string;
    };
    if (axiosError.response?.status === 429) {
      console.log(`Rate limited for ${id}. Using fallback data.`);
      return (fallbackCoinData[id as keyof typeof fallbackCoinData] ||
        fallbackCoinData.bitcoin) as unknown as CoinDetail;
    }
    console.error(`Error fetching ${id}:`, axiosError.message);
    throw error;
  }
};

// Wrapper function for getGlobalData with fallback
export const getGlobalData = async (): Promise<GlobalMarketData> => {
  try {
    return await cryptoApi.getGlobalData();
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number };
      message?: string;
    };
    if (axiosError.response?.status === 429) {
      console.log("Rate limited for global data. Using fallback data.");
      // Return fallback global data
      return {
        active_cryptocurrencies: 13000,
        upcoming_icos: 0,
        ongoing_icos: 0,
        ended_icos: 3376,
        markets: 1000,
        total_market_cap: {
          usd: 2400000000000,
          btc: 25000000,
        },
        total_volume: {
          usd: 50000000000,
          btc: 520000,
        },
        market_cap_percentage: {
          btc: 54.5,
          eth: 13.2,
        },
        market_cap_change_percentage_24h_usd: 1.5,
        updated_at: Date.now(),
      };
    }
    console.error("Error fetching global data:", axiosError.message);
    throw error;
  }
};

// Wrapper function for getTopCryptos with fallback
export const getTopCryptos = async (
  limit: number = 10
): Promise<CryptoData[]> => {
  try {
    return await cryptoApi.getTopCryptos(limit);
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number };
      message?: string;
    };
    if (axiosError.response?.status === 429) {
      console.log("Rate limited for top cryptos. Using fallback data.");
      // Return basic fallback data for top cryptos
      return [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          current_price: 95000,
          market_cap: 1800000000000,
          market_cap_rank: 1,
          fully_diluted_valuation: 2000000000000,
          total_volume: 25000000000,
          high_24h: 97000,
          low_24h: 93000,
          price_change_24h: 1500,
          price_change_percentage_24h: 1.6,
          market_cap_change_24h: 28000000000,
          market_cap_change_percentage_24h: 1.6,
          circulating_supply: 19500000,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 108000,
          ath_change_percentage: -12.0,
          ath_date: "2024-11-15T00:00:00.000Z",
          atl: 67.81,
          atl_change_percentage: 140000,
          atl_date: "2013-07-06T00:00:00.000Z",
          roi: undefined,
          last_updated: new Date().toISOString(),
        },
      ].slice(0, limit);
    }
    console.error("Error fetching top cryptos:", axiosError.message);
    throw error;
  }
};

// Sequential API wrapper for build-time to avoid rate limits
export const buildTimeApi = {
  async getCoinsSequentially(coinIds: string[]) {
    const results = [];
    const delay = process.env.COINGECKO_API_DELAY
      ? parseInt(process.env.COINGECKO_API_DELAY)
      : 3000;

    console.log(
      `[BuildTime] Processing ${coinIds.length} coins with ${delay}ms delay...`
    );

    for (let i = 0; i < coinIds.length; i++) {
      const coinId = coinIds[i];
      console.log(
        `[BuildTime] Processing ${i + 1}/${coinIds.length}: ${coinId}`
      );

      try {
        const coinDetail = await cryptoApi.getCoinDetail(coinId);
        results.push({ coinId, data: coinDetail, success: true });
        console.log(`[BuildTime] ✓ ${coinId} completed`);

        // Add delay between requests (except for the last one)
        if (i < coinIds.length - 1) {
          console.log(`[BuildTime] Waiting ${delay}ms before next request...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`[BuildTime] ✗ ${coinId} failed:`, error);
        results.push({ coinId, data: null, success: false, error });
      }
    }

    console.log(
      `[BuildTime] Completed processing. Success: ${
        results.filter((r) => r.success).length
      }/${coinIds.length}`
    );
    return results;
  },
};
