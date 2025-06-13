"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PriceHistoryData } from "@/types/crypto";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface PriceChartProps {
  data: PriceHistoryData;
  days: number;
  isLoading?: boolean;
}

export default function PriceChart({
  data,
  days,
  isLoading = false,
}: PriceChartProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Transform data for recharts
  const chartData = data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: new Date(timestamp),
    formattedDate: format(new Date(timestamp), days <= 1 ? "HH:mm" : "MMM dd"),
  }));

  // Determine if price is going up or down
  const isPositive =
    chartData.length > 1
      ? chartData[chartData.length - 1].price > chartData[0].price
      : true;

  const lineColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Price Chart ({days}d)
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Historical price data
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {format(data.date, "MMM dd, yyyy HH:mm")}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(data.price)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: lineColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
