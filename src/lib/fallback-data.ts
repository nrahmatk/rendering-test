import { CryptoData } from "@/types/crypto";

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
  cardano: {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    market_cap_rank: 4,
    hashing_algorithm: "Ouroboros",
    block_time_in_minutes: 0.33,
    genesis_date: "2017-09-29",
    market_data: {
      current_price: { usd: 0.45 },
      market_cap: { usd: 15000000000 },
      total_volume: { usd: 800000000 },
      price_change_percentage_24h: 1.2,
      price_change_percentage_7d: 3.5,
      price_change_percentage_30d: 7.1,
      ath: { usd: 3.1 },
      ath_change_percentage: { usd: -85.5 },
      atl: { usd: 0.01925 },
      atl_change_percentage: { usd: 2238.9 },
      circulating_supply: 34000000000,
      total_supply: 45000000000,
    },
    description: {
      en: "Cardano is a blockchain platform for changemakers, innovators, and visionaries.",
    },
    image: {
      large: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    },
    links: {
      homepage: ["https://cardano.org"],
      twitter_screen_name: "cardano",
    },
  },
  solana: {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    market_cap_rank: 5,
    hashing_algorithm: "Proof of History",
    block_time_in_minutes: 0.007,
    genesis_date: "2020-03-16",
    market_data: {
      current_price: { usd: 95 },
      market_cap: { usd: 42000000000 },
      total_volume: { usd: 2500000000 },
      price_change_percentage_24h: 3.2,
      price_change_percentage_7d: 8.1,
      price_change_percentage_30d: 15.4,
      ath: { usd: 260 },
      ath_change_percentage: { usd: -63.5 },
      atl: { usd: 0.5 },
      atl_change_percentage: { usd: 18900.2 },
      circulating_supply: 440000000,
      total_supply: 580000000,
    },
    description: {
      en: "Solana is a fast, secure, and censorship resistant blockchain.",
    },
    image: {
      large: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
    links: {
      homepage: ["https://solana.com"],
      twitter_screen_name: "solana",
    },
  },
  polkadot: {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    market_cap_rank: 6,
    hashing_algorithm: "GRANDPA/BABE",
    block_time_in_minutes: 0.1,
    genesis_date: "2020-05-26",
    market_data: {
      current_price: { usd: 6.5 },
      market_cap: { usd: 8500000000 },
      total_volume: { usd: 320000000 },
      price_change_percentage_24h: 0.8,
      price_change_percentage_7d: 2.3,
      price_change_percentage_30d: 9.7,
      ath: { usd: 55 },
      ath_change_percentage: { usd: -88.2 },
      atl: { usd: 2.7 },
      atl_change_percentage: { usd: 140.7 },
      circulating_supply: 1300000000,
      total_supply: 1400000000,
    },
    description: {
      en: "Polkadot enables cross-blockchain transfers of any type of data or asset.",
    },
    image: {
      large:
        "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    },
    links: {
      homepage: ["https://polkadot.network"],
      twitter_screen_name: "polkadot",
    },
  },
  dogecoin: {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    market_cap_rank: 7,
    hashing_algorithm: "Scrypt",
    block_time_in_minutes: 1,
    genesis_date: "2013-12-06",
    market_data: {
      current_price: { usd: 0.078 },
      market_cap: { usd: 11000000000 },
      total_volume: { usd: 450000000 },
      price_change_percentage_24h: 1.5,
      price_change_percentage_7d: 4.2,
      price_change_percentage_30d: 12.8,
      ath: { usd: 0.74 },
      ath_change_percentage: { usd: -89.5 },
      atl: { usd: 0.00008547 },
      atl_change_percentage: { usd: 91157.2 },
      circulating_supply: 142000000000,
      total_supply: 142000000000,
    },
    description: {
      en: "Dogecoin is a cryptocurrency based on the popular Doge Internet meme.",
    },
    image: {
      large: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    },
    links: {
      homepage: ["https://dogecoin.com"],
      twitter_screen_name: "dogecoin",
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

// Helper function to convert fallback coin data to CryptoData array format
export const getFallbackCryptoList = (limit: number = 10): CryptoData[] => {
  const coins = Object.values(fallbackCoinData);
  return coins.slice(0, limit).map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image.large,
    current_price: coin.market_data.current_price.usd,
    market_cap: coin.market_data.market_cap.usd,
    market_cap_rank: coin.market_cap_rank,
    fully_diluted_valuation: coin.market_data.market_cap.usd,
    total_volume: coin.market_data.total_volume.usd,
    high_24h: coin.market_data.current_price.usd * 1.05,
    low_24h: coin.market_data.current_price.usd * 0.95,
    price_change_24h:
      coin.market_data.current_price.usd *
      (coin.market_data.price_change_percentage_24h / 100),
    price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
    market_cap_change_24h:
      coin.market_data.market_cap.usd *
      (coin.market_data.price_change_percentage_24h / 100),
    market_cap_change_percentage_24h:
      coin.market_data.price_change_percentage_24h,
    circulating_supply: coin.market_data.circulating_supply,
    total_supply: coin.market_data.total_supply || undefined,
    max_supply: coin.market_data.total_supply || undefined,
    ath: coin.market_data.ath.usd,
    ath_change_percentage: coin.market_data.ath_change_percentage.usd,
    ath_date: new Date().toISOString(),
    atl: coin.market_data.atl.usd,
    atl_change_percentage: coin.market_data.atl_change_percentage.usd,
    atl_date: new Date().toISOString(),
    roi: undefined,
    last_updated: new Date().toISOString(),
  }));
};
