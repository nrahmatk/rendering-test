import Link from "next/link";
import { Home, Search, TrendingUp } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>{" "}
          <p className="text-gray-600 dark:text-gray-300">
            The cryptocurrency page you&apos;re looking for doesn&apos;t exist
            or may have been moved.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Explore Our Demos
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/csr"
              className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">
                  CSR Demo
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Client-Side Rendering
                </div>
              </div>
            </Link>

            <Link
              href="/ssr"
              className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-green-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">
                  SSR Demo
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Server-Side Rendering
                </div>
              </div>
            </Link>

            <Link
              href="/ssg"
              className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">
                  SSG Demo
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Static Site Generation
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Link
            href="/app"
            className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Full App Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
