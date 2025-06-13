"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default stale time for all queries
            staleTime: 1000 * 60 * 5, // 5 minutes            // Default cache time
            gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
            // Retry configuration
            retry: (
              failureCount: number,
              error: Error & { response?: { status: number } }
            ) => {
              // Don't retry for 4xx errors
              if (
                error?.response?.status &&
                error.response.status >= 400 &&
                error.response.status < 500
              ) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Default retry for mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
