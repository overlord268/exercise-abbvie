/**
 * Root Layout Component
 *
 * This is the root layout component for the Next.js application. It wraps all pages
 * and provides the basic HTML structure, font configuration, and metadata.
 *
 * The layout uses the Geist font family for a modern, clean typography system
 * and includes global CSS styles for consistent styling across the application.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Font Configuration
 *
 * Geist Sans: Primary font for body text and UI elements
 * Geist Mono: Monospace font for code, numbers, and technical content
 *
 * Both fonts are loaded with Latin subset for optimal performance
 * and configured as CSS variables for consistent usage throughout the app.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application Metadata
 *
 * Defines the basic metadata for the application including title and description.
 * This metadata is used by search engines, social media platforms, and browser tabs.
 */
export const metadata: Metadata = {
  title: "Asset Library - Business Intelligence Dashboard",
  description: "Comprehensive dashboard for managing and exploring business assets including KPIs, Layouts, Data Visualizations, and Storyboards.",
};

/**
 * RootLayout Component
 *
 * The root layout that wraps all pages in the application. It provides:
 * - HTML document structure with proper language attribute
 * - Font variables for consistent typography
 * - Antialiased text rendering for crisp fonts
 * - Global CSS styles
 *
 * @param children - React nodes representing the page content
 * @returns JSX.Element - The complete HTML document structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
