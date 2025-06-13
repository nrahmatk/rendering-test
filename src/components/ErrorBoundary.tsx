"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 text-red-500">
                <AlertTriangle className="w-full h-full" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We encountered an error while loading this page. This might be
                due to:
              </p>

              <ul className="text-left text-sm text-gray-500 dark:text-gray-400 mb-8 space-y-2">
                <li>• Network connectivity issues</li>
                <li>• API rate limiting</li>
                <li>• Temporary server problems</li>
                <li>• Invalid cryptocurrency data</li>
              </ul>

              {/* Error details for development */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-6">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto text-red-600 dark:text-red-400">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.reload();
                  }}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If the problem persists, try:
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                <li>• Checking your internet connection</li>
                <li>• Waiting a few minutes and trying again</li>
                <li>• Clearing your browser cache</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
