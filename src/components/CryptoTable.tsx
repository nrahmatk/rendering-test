import { CryptoData } from "@/types/crypto";
import {
  formatCurrency,
  formatPercentage,
  getChangeColor,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CryptoTableProps {
  data: CryptoData[];
  isLoading?: boolean;
  showRank?: boolean;
  linkPrefix?: string;
}

export default function CryptoTable({
  data,
  isLoading = false,
  showRank = true,
  linkPrefix = "/coin",
}: CryptoTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700"></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <div className="h-16 bg-gray-50 dark:bg-gray-750 flex items-center px-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {showRank && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((crypto) => (
              <tr
                key={crypto.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {showRank && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {crypto.market_cap_rank}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`${linkPrefix}/${crypto.id}`}
                    className="flex items-center space-x-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {crypto.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                        {crypto.symbol}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(crypto.current_price)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${getChangeColor(
                    crypto.price_change_percentage_24h
                  )}`}
                >
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  {formatCurrency(crypto.market_cap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  {formatCurrency(crypto.total_volume)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
