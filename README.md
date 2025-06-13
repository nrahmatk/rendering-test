# Cryptocurrency Website - Rendering Strategies Demo

A comprehensive Next.js application demonstrating the differences between **CSR**, **SSR**, **SSG**, and **Hybrid** rendering strategies using real cryptocurrency data from the CoinGecko API.

## 🚀 Features

- **Real-time Cryptocurrency Data** - Live prices, market caps, and charts
- **Multiple Rendering Strategies** - Compare CSR, SSR, SSG, and Hybrid approaches
- **Performance Optimized** - React Query for efficient data fetching and caching
- **Responsive Design** - Mobile-first design with dark mode support
- **TypeScript** - Full type safety throughout the application
- **Educational Content** - Each demo includes detailed explanations

## 🏗️ Architecture

### Rendering Strategies Demonstrated

#### 1. CSR (Client-Side Rendering) - `/csr`

- **Use Case**: Interactive dashboards, real-time data, personalized content
- **Implementation**: Data fetched on client after page load
- **Benefits**: Smooth interactions, reduced server load
- **Trade-offs**: Slower initial load, SEO challenges

#### 2. SSR (Server-Side Rendering) - `/ssr`

- **Use Case**: SEO-critical pages, fresh data requirements
- **Implementation**: Data fetched on server for each request
- **Benefits**: Better SEO, faster perceived load time
- **Trade-offs**: Higher server load, slower page transitions

#### 3. SSG (Static Site Generation) - `/ssg`

- **Use Case**: Content that doesn't change often, landing pages
- **Implementation**: Data fetched at build time
- **Benefits**: Fastest loading, excellent SEO, CDN cacheable
- **Trade-offs**: Stale data, requires rebuilds for updates

#### 4. Hybrid - `/hybrid`

- **Use Case**: Complex applications requiring multiple strategies
- **Implementation**: Strategic combination of CSR, SSR, and SSG
- **Benefits**: Optimized for specific use cases
- **Trade-offs**: More complex implementation

## 📦 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management and caching
- **Recharts** - Chart library for data visualization
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📖 API Integration

This project uses the **CoinGecko API** (free tier) to fetch cryptocurrency data:

- **Market Data**: `/coins/markets` - List of cryptocurrencies with prices
- **Coin Details**: `/coins/{id}` - Detailed information about specific coins
- **Price History**: `/coins/{id}/market_chart` - Historical price data for charts

### Rate Limiting

- Free tier: 10-50 calls/minute
- Implemented with request queuing and error handling
- Cached responses to minimize API calls

## 🎯 Learning Objectives

### Performance Comparison

- **Time to First Byte (TTFB)**: SSR fastest, then SSG, then CSR
- **Largest Contentful Paint (LCP)**: SSG fastest, then SSR, then CSR
- **First Input Delay (FID)**: CSR best (after hydration), others equal
- **Cumulative Layout Shift (CLS)**: SSG best, others depend on implementation

### SEO Considerations

- **SSR/SSG**: Content available in initial HTML
- **CSR**: Requires JavaScript execution for content
- **Hybrid**: Strategic rendering based on page importance

### Caching Strategies

- **SSG**: Build-time caching, CDN distribution
- **SSR**: Server-side caching, revalidation strategies
- **CSR**: Client-side caching with React Query
- **Hybrid**: Multi-layered caching approach

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page with strategy overview
│   ├── loading.tsx        # Global loading component
│   ├── not-found.tsx      # 404 page with helpful navigation
│   ├── csr/               # Client-Side Rendering demo
│   │   ├── page.tsx       # CSR cryptocurrency list
│   │   └── coin/[id]/     # Dynamic CSR coin details
│   ├── ssr/               # Server-Side Rendering demo
│   │   ├── page.tsx       # SSR cryptocurrency list
│   │   └── coin/[id]/     # Dynamic SSR coin details
│   ├── ssg/               # Static Site Generation demo
│   │   ├── page.tsx       # SSG cryptocurrency list
│   │   └── coin/[id]/     # Dynamic SSG coin details
│   ├── hybrid/            # Hybrid strategy demo
│   │   └── page.tsx       # Mixed rendering approaches
│   ├── performance/       # Performance comparison page
│   │   └── page.tsx       # Detailed metrics and analysis
│   └── app/               # Full application example
│       ├── page.tsx       # Complete crypto dashboard
│       └── coin/[id]/     # Full-featured coin details
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Responsive nav with dark mode
│   ├── Footer.tsx         # Site footer with links
│   ├── CryptoTable.tsx    # Cryptocurrency data table
│   ├── LoadingSpinner.tsx # Loading states and spinners
│   ├── PriceChart.tsx     # Recharts price visualization
│   ├── StrategyCard.tsx   # Strategy explanation cards
│   └── ErrorBoundary.tsx  # Error handling component
├── hooks/                 # Custom React hooks
│   └── useCrypto.ts       # React Query hooks for API calls
├── lib/                   # Utility functions and API client
│   ├── api.ts             # CoinGecko API integration
│   └── utils.ts           # Formatting and utility functions
├── providers/             # React context providers
│   └── QueryProvider.tsx  # React Query configuration
└── types/                 # TypeScript type definitions
    └── crypto.ts          # API response and component types
```

## 🔍 Key Files

- **`src/lib/api.ts`** - CoinGecko API integration with error handling
- **`src/hooks/useCrypto.ts`** - React Query hooks for data fetching
- **`src/components/Navigation.tsx`** - Responsive navigation with dark mode
- **`src/providers/QueryProvider.tsx`** - React Query configuration
- **`src/types/crypto.ts`** - TypeScript definitions for API responses

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Static Export (for SSG pages)

```bash
npm run build && npm run export
```

### Deployment Platforms

- **Vercel** - Optimized for Next.js, supports all rendering strategies
- **Netlify** - Good for SSG, limited SSR support
- **AWS/Azure/GCP** - Full control, requires more configuration

## 📊 Performance Metrics

Each demo page includes performance metrics and explanations:

- **Bundle Size**: JavaScript payload delivered to client
- **Cache Strategy**: How data is cached and revalidated
- **Hydration Time**: Time for client-side JavaScript to become interactive
- **Data Freshness**: How current the displayed data is

## 🎨 Features Implemented

### Core Features

- ✅ Real-time cryptocurrency data from CoinGecko API
- ✅ Multiple rendering strategies (CSR, SSR, SSG, Hybrid)
- ✅ Responsive design with dark mode support
- ✅ TypeScript for type safety
- ✅ React Query for efficient data fetching
- ✅ Interactive price charts with Recharts
- ✅ Error handling and loading states
- ✅ Performance comparison page
- ✅ SEO optimization for different strategies

### UI/UX Features

- ✅ Mobile-first responsive design
- ✅ Dark/light mode toggle with localStorage persistence
- ✅ Smooth transitions and hover effects
- ✅ Accessible navigation and components
- ✅ Loading spinners and skeleton states
- ✅ Error boundaries with helpful error messages
- ✅ 404 page with navigation suggestions

### Technical Features

- ✅ API rate limiting and error handling
- ✅ React Query caching and background updates
- ✅ Static generation for top 50 cryptocurrencies
- ✅ Server-side rendering with fresh data
- ✅ Client-side rendering with real-time updates
- ✅ Hybrid approach combining multiple strategies

## 🧪 Testing

Run the development server and visit different routes to see each rendering strategy in action:

- **`/`** - Landing page with strategy explanations
- **`/csr`** - Client-side rendering demo
- **`/ssr`** - Server-side rendering demo
- **`/ssg`** - Static site generation demo
- **`/hybrid`** - Hybrid approach demo
- **`/performance`** - Performance comparison and metrics
- **`/app`** - Full application showcase

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)
- [Web Vitals](https://web.dev/vitals/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 License

This project is for educational purposes and demonstrates modern web development practices with different rendering strategies.

---

**Built with Next.js 14, TypeScript, React Query, and Tailwind CSS**
