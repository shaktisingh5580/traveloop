import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Traveloop — Travel Planning Made Easy",
    template: "%s | Traveloop",
  },
  description:
    "Plan personalized multi-city trips, manage budgets, build itineraries, and share your adventures with Traveloop.",
  keywords: ["travel", "trip planner", "itinerary", "budget", "vacation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark`}
    >
      <body>{children}</body>
    </html>
  );
}
