/**
 * Landing Page — public home page.
 * Owner: Pratham
 * Screen: Landing (public, no auth)
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traveloop — Personalized Travel Planning Made Easy",
  description:
    "Plan multi-city trips, manage budgets, build day-wise itineraries, and share your travel plans with friends.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TODO: Pratham — Build the full landing page here */}
      <h1>Landing Page</h1>
      <p>Placeholder — Pratham will build this</p>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}
