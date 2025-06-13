import Link from "next/link";
import {
  TrendingUp,
  Zap,
  Globe,
  Layers,
  Rocket,
  BarChart3,
} from "lucide-react";
import StrategyCard from "@/components/StrategyCard";
import { RenderingStrategy } from "@/types/crypto";

const renderingStrategies: RenderingStrategy[] = [
  {
    name: "Client-Side Rendering (CSR)",
    description: "Rendering happens entirely in the browser using JavaScript",
    advantages: [
      "Highly interactive user experience",
      "Real-time data updates",
      "Reduced server load",
      "Rich client-side state management",
    ],
    disadvantages: [
      "Slower initial page load",
      "Poor SEO without additional setup",
      "Requires JavaScript enabled",
      "Potential for content layout shift",
    ],
    useCases: [
      "Real-time trading interfaces",
      "Interactive dashboards",
      "User-specific portfolio tracking",
      "Live price monitoring",
    ],
    implementation: "React Query + Client Components",
  },
  {
    name: "Server-Side Rendering (SSR)",
    description: "Pages are rendered on the server for each request",
    advantages: [
      "Excellent SEO optimization",
      "Fast initial content display",
      "Better social media sharing",
      "Consistent rendering across devices",
    ],
    disadvantages: [
      "Higher server resource usage",
      "Slower subsequent navigation",
      "More complex caching strategy",
      "Potential server overload",
    ],
    useCases: [
      "Cryptocurrency news pages",
      "Market analysis reports",
      "Coin detail pages with fresh data",
      "Search result pages",
    ],
    implementation: "Next.js Server Components + fetch",
  },
  {
    name: "Static Site Generation (SSG)",
    description: "Pages are pre-rendered at build time",
    advantages: [
      "Lightning-fast page loads",
      "Excellent SEO performance",
      "High scalability",
      "CDN-friendly deployment",
    ],
    disadvantages: [
      "Data can become stale",
      "Longer build times",
      "Less dynamic content",
      "Requires rebuild for updates",
    ],
    useCases: [
      "Cryptocurrency information pages",
      "About and FAQ pages",
      "Market overview pages",
      "Educational content",
    ],
    implementation: "generateStaticParams + Static Props",
  },
  {
    name: "Hybrid Approach",
    description: "Strategic combination of CSR, SSR, and SSG",
    advantages: [
      "Optimized for each use case",
      "Best of all worlds",
      "Flexible architecture",
      "Performance-focused",
    ],
    disadvantages: [
      "More complex implementation",
      "Requires careful planning",
      "Multiple rendering strategies to maintain",
      "Potential inconsistencies",
    ],
    useCases: [
      "Complete cryptocurrency platforms",
      "Multi-feature applications",
      "Content + interactive elements",
      "Production-ready applications",
    ],
    implementation: "Mixed Next.js strategies",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            CryptoRender
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Cryptocurrency Rendering Strategies Demo
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore and compare different rendering strategies (CSR, SSR, SSG,
            and Hybrid) through a comprehensive cryptocurrency application. See
            how each approach affects performance, SEO, and user experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/csr"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            <Zap className="w-5 h-5 mr-2" />
            Try CSR Demo
          </Link>
          <Link
            href="/ssr"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
          >
            <Globe className="w-5 h-5 mr-2" />
            Try SSR Demo
          </Link>
          <Link
            href="/ssg"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium"
          >
            <Layers className="w-5 h-5 mr-2" />
            Try SSG Demo
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transition-all font-medium"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Full Application
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Performance Metrics
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Compare loading times, bundle sizes, and runtime performance across
            different rendering strategies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Real Crypto Data
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Live cryptocurrency data from CoinGecko API showcasing real-world
            implementation scenarios.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Modern Tech Stack
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Built with Next.js 14, React Query, TypeScript, and Tailwind CSS for
            modern development practices.
          </p>
        </div>
      </section>

      {/* Rendering Strategies */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Rendering Strategies Comparison
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Each strategy has its own strengths and use cases. Explore the
            detailed comparison below to understand when to use each approach.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {renderingStrategies.map((strategy) => (
            <StrategyCard key={strategy.name} strategy={strategy} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Start with any demo to see the rendering strategies in action, or jump
          straight to the full application to experience a complete
          cryptocurrency platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/hybrid"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-purple-600 hover:bg-gray-100 transition-colors font-medium"
          >
            <Layers className="w-5 h-5 mr-2" />
            Hybrid Demo
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-colors font-medium"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Full Application
          </Link>
        </div>
      </section>
    </div>
  );
}
