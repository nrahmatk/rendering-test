// Fallback coin data for when API is rate limited
export const fallbackCoinData = {
  bitcoin: {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    market_cap_rank: 1,
    hashing_algorithm: "SHA-256",
    block_time_in_minutes: 10,
    genesis_date: "2009-01-03",
    market_data: {
      current_price: { usd: 45000 },
      market_cap: { usd: 850000000000 },
      total_volume: { usd: 25000000000 },
      price_change_percentage_24h: 2.5,
      price_change_percentage_7d: 5.2,
      price_change_percentage_30d: 12.8,
      ath: { usd: 69000 },
      ath_change_percentage: { usd: -35.5 },
      atl: { usd: 67.81 },
      atl_change_percentage: { usd: 66245.2 },
      circulating_supply: 19800000,
      total_supply: 21000000,
    },
    description: {
      en: "Bitcoin is the first successful internet money based on peer-to-peer technology.",
    },
    image: {
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    links: {
      homepage: ["https://bitcoin.org"],
      twitter_screen_name: "bitcoin",
    },
  },
  ethereum: {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    market_cap_rank: 2,
    hashing_algorithm: "Ethash",
    block_time_in_minutes: 0.25,
    genesis_date: "2015-07-30",
    market_data: {
      current_price: { usd: 3200 },
      market_cap: { usd: 380000000000 },
      total_volume: { usd: 15000000000 },
      price_change_percentage_24h: 1.8,
      price_change_percentage_7d: 4.1,
      price_change_percentage_30d: 8.9,
      ath: { usd: 4891.7 },
      ath_change_percentage: { usd: -34.5 },
      atl: { usd: 0.432979 },
      atl_change_percentage: { usd: 738741.2 },
      circulating_supply: 120000000,
      total_supply: null,
    },
    description: {
      en: "Ethereum is a decentralized platform that runs smart contracts.",
    },
    image: {
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    links: {
      homepage: ["https://ethereum.org"],
      twitter_screen_name: "ethereum",
    },
  },
  binancecoin: {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    market_cap_rank: 4,
    hashing_algorithm: null,
    block_time_in_minutes: null,
    genesis_date: "2017-07-26",
    market_data: {
      current_price: { usd: 320 },
      market_cap: { usd: 48000000000 },
      total_volume: { usd: 1200000000 },
      price_change_percentage_24h: 0.9,
      price_change_percentage_7d: 2.3,
      price_change_percentage_30d: 6.7,
      ath: { usd: 686.31 },
      ath_change_percentage: { usd: -53.4 },
      atl: { usd: 0.096671 },
      atl_change_percentage: { usd: 331008.7 },
      circulating_supply: 150000000,
      total_supply: 200000000,
    },
    description: {
      en: "BNB is the native token of the Binance cryptocurrency exchange.",
    },
    image: {
      large:
        "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    },
    links: {
      homepage: ["https://www.binance.com"],
      twitter_screen_name: "binance",
    },
  },
};

export const fallbackPriceHistory = {
  prices: Array.from({ length: 30 }, (_, i) => [
    Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    Math.random() * 1000 + 30000,
  ]),
  market_caps: Array.from({ length: 30 }, (_, i) => [
    Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    Math.random() * 100000000000 + 800000000000,
  ]),
  total_volumes: Array.from({ length: 30 }, (_, i) => [
    Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    Math.random() * 10000000000 + 20000000000,
  ]),
};
