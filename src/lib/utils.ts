export const formatCurrency = (
  value: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toFixed(2);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return "text-green-500";
  if (change < 0) return "text-red-500";
  return "text-gray-500";
};

export const getChangeBgColor = (change: number): string => {
  if (change > 0) return "bg-green-500/10 text-green-500";
  if (change < 0) return "bg-red-500/10 text-red-500";
  return "bg-gray-500/10 text-gray-500";
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatMarketCap = (marketCap: number): string => {
  return formatNumber(marketCap);
};

export const formatVolume = (volume: number): string => {
  return formatNumber(volume);
};

export const debounce = <T extends (...args: string[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const generateRandomData = (
  length: number,
  min: number = 0,
  max: number = 100
): number[] => {
  return Array.from({ length }, () => Math.random() * (max - min) + min);
};

export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
): number => {
  return ((newValue - oldValue) / oldValue) * 100;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getRiskLevel = (
  volatility: number
): { level: string; color: string } => {
  if (volatility > 10) return { level: "High Risk", color: "text-red-500" };
  if (volatility > 5) return { level: "Medium Risk", color: "text-yellow-500" };
  return { level: "Low Risk", color: "text-green-500" };
};

export const getMarketSentiment = (
  change24h: number
): { sentiment: string; color: string } => {
  if (change24h > 5)
    return { sentiment: "Very Bullish", color: "text-green-600" };
  if (change24h > 2) return { sentiment: "Bullish", color: "text-green-500" };
  if (change24h > -2) return { sentiment: "Neutral", color: "text-gray-500" };
  if (change24h > -5) return { sentiment: "Bearish", color: "text-red-500" };
  return { sentiment: "Very Bearish", color: "text-red-600" };
};
