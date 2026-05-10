/**
 * Dashboard Home — Screen 2
 * Owner: Pratham & Aman
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div>
      {/* TODO: Welcome message, recent trips, "Plan New Trip" button, recommended cities, budget highlights */}
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
        Welcome back! 👋
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Dashboard placeholder — Pratham & Aman will build this
      </p>
    </div>
  );
}
