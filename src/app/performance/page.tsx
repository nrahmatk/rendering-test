import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Zap,
  Server,
  Globe,
  TrendingUp,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Comparison - Rendering Strategies",
  description:
    "Compare the performance characteristics of different rendering strategies",
};

import React from "react";
import { LucideIcon } from "lucide-react";

interface PerformanceMetric {
  metric: string;
  csr: {
    value: string;
    color: string;
    icon: LucideIcon;
  };
  ssr: {
    value: string;
    color: string;
    icon: LucideIcon;
  };
  ssg: {
    value: string;
    color: string;
    icon: LucideIcon;
  };
  description: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    metric: "Time to First Byte (TTFB)",
    csr: { value: "~50ms", color: "text-yellow-600", icon: Clock },
    ssr: { value: "~200ms", color: "text-orange-600", icon: Clock },
    ssg: { value: "~10ms", color: "text-green-600", icon: Clock },
    description: "Time between request and first byte received",
  },
  {
    metric: "Largest Contentful Paint (LCP)",
    csr: { value: "~2.5s", color: "text-red-600", icon: BarChart3 },
    ssr: { value: "~1.2s", color: "text-yellow-600", icon: BarChart3 },
    ssg: { value: "~0.8s", color: "text-green-600", icon: BarChart3 },
    description: "Time to render the largest content element",
  },
  {
    metric: "First Input Delay (FID)",
    csr: { value: "~100ms", color: "text-yellow-600", icon: Zap },
    ssr: { value: "~50ms", color: "text-green-600", icon: Zap },
    ssg: { value: "~50ms", color: "text-green-600", icon: Zap },
    description: "Time from first user interaction to browser response",
  },
  {
    metric: "SEO Friendliness",
    csr: { value: "Poor", color: "text-red-600", icon: XCircle },
    ssr: { value: "Excellent", color: "text-green-600", icon: CheckCircle },
    ssg: { value: "Excellent", color: "text-green-600", icon: CheckCircle },
    description: "How well search engines can crawl and index content",
  },
  {
    metric: "Server Load",
    csr: { value: "Low", color: "text-green-600", icon: Server },
    ssr: { value: "High", color: "text-red-600", icon: Server },
    ssg: { value: "Minimal", color: "text-green-600", icon: Server },
    description: "Computational resources required on the server",
  },
  {
    metric: "Data Freshness",
    csr: { value: "Real-time", color: "text-green-600", icon: TrendingUp },
    ssr: { value: "Fresh", color: "text-green-600", icon: TrendingUp },
    ssg: { value: "Stale", color: "text-red-600", icon: TrendingUp },
    description: "How current the displayed data is",
  },
];

const useCases = {
  csr: [
    "Real-time trading dashboards",
    "Interactive data visualization",
    "User-specific personalized content",
    "Frequently updating live feeds",
  ],
  ssr: [
    "Product detail pages for e-commerce",
    "News articles and blog posts",
    "User profile pages",
    "Search result pages",
  ],
  ssg: [
    "Marketing landing pages",
    "Documentation sites",
    "Company about pages",
    "Cryptocurrency information pages",
  ],
};

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Comparison
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding the performance characteristics and trade-offs of
            different rendering strategies
          </p>
        </div>

        {/* Performance Metrics Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Performance Metrics
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    CSR
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SSR
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SSG
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {performanceMetrics.map((metric, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {metric.metric}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div
                        className={`flex items-center justify-center ${metric.csr.color}`}
                      >
                        <metric.csr.icon className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {metric.csr.value}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div
                        className={`flex items-center justify-center ${metric.ssr.color}`}
                      >
                        <metric.ssr.icon className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {metric.ssr.value}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div
                        className={`flex items-center justify-center ${metric.ssg.color}`}
                      >
                        <metric.ssg.icon className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {metric.ssg.value}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {metric.description}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Best for CSR
              </h3>
            </div>
            <ul className="space-y-2">
              {useCases.csr.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {useCase}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Server className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Best for SSR
              </h3>
            </div>
            <ul className="space-y-2">
              {useCases.ssr.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {useCase}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Best for SSG
              </h3>
            </div>
            <ul className="space-y-2">
              {useCases.ssg.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {useCase}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Try Each Strategy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/csr"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              CSR Demo
            </Link>
            <Link
              href="/ssr"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              SSR Demo
            </Link>
            <Link
              href="/ssg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              SSG Demo
            </Link>
            <Link
              href="/hybrid"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Hybrid Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
