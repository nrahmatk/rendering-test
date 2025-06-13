import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CryptoRender - Cryptocurrency Rendering Strategies Demo",
  description:
    "A comprehensive demo showcasing CSR, SSR, SSG, and Hybrid rendering strategies for cryptocurrency applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}
      >
        <QueryProvider>
          <Navigation />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
