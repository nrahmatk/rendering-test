"use client";

import { useQuery } from "@tanstack/react-query";
import { cryptoApi } from "@/lib/api";

// Hook for fetching cryptocurrency list with pagination
export const useCryptoList = (page: number = 1, perPage: number = 100) => {
  return useQuery({
    queryKey: ["cryptoList", page, perPage],
    queryFn: () => cryptoApi.getCryptoList(page, perPage),
    staleTime: 1000 * 60 * 2, // 2 minutes - market data changes frequently
    gcTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Hook for fetching top cryptocurrencies (good for SSG)
export const useTopCryptos = (limit: number = 10) => {
  return useQuery({
    queryKey: ["topCryptos", limit],
    queryFn: () => cryptoApi.getTopCryptos(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook for fetching coin details
export const useCoinDetail = (id: string) => {
  return useQuery({
    queryKey: ["coinDetail", id],
    queryFn: () => cryptoApi.getCoinDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 3, // 3 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook for fetching coin price history
export const useCoinHistory = (id: string, days: number = 7) => {
  return useQuery({
    queryKey: ["coinHistory", id, days],
    queryFn: () => cryptoApi.getCoinHistory(id, days),
    enabled: !!id,
    staleTime: 1000 * 60 * 1, // 1 minute for price data
    gcTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Hook for fetching trending cryptocurrencies
export const useTrending = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: cryptoApi.getTrending,
    staleTime: 1000 * 60 * 10, // 10 minutes - trending doesn't change that often
    gcTime: 1000 * 60 * 20, // 20 minutes
  });
};

// Hook for searching cryptocurrencies
export const useSearchCoins = (query: string) => {
  return useQuery({
    queryKey: ["searchCoins", query],
    queryFn: () => cryptoApi.searchCoins(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 15, // 15 minutes - search results are relatively stable
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook for fetching global market data
export const useGlobalData = () => {
  return useQuery({
    queryKey: ["globalData"],
    queryFn: cryptoApi.getGlobalData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook for fetching exchanges
export const useExchanges = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ["exchanges", page, perPage],
    queryFn: () => cryptoApi.getExchanges(page, perPage),
    staleTime: 1000 * 60 * 30, // 30 minutes - exchange data is relatively stable
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for fetching fear and greed index
export const useFearGreedIndex = () => {
  return useQuery({
    queryKey: ["fearGreedIndex"],
    queryFn: cryptoApi.getFearGreedIndex,
    staleTime: 1000 * 60 * 60, // 1 hour - sentiment data doesn't change frequently
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

// Hook for real-time price updates (refetches more frequently)
export const useRealTimePrice = (id: string) => {
  return useQuery({
    queryKey: ["realTimePrice", id],
    queryFn: () => cryptoApi.getCoinDetail(id),
    enabled: !!id,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 0, // Always consider stale for real-time updates
    gcTime: 1000 * 60 * 2, // 2 minutes cache
  });
};

// Hook for categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: cryptoApi.getCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - categories don't change often
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
  });
};

// Hook for coins by category
export const useCoinsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["coinsByCategory", categoryId],
    queryFn: () => cryptoApi.getCoinsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
