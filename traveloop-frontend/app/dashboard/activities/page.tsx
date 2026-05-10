/**
 * Activity Search — Screen 8
 * Owner: Kunal & Aman
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Discover Activities" };

export default function ActivitiesPage() {
  return (
    <div>
      {/* TODO: Activity filters (type, cost, duration), add/remove, quick view */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Discover Activities
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Kunal & Aman</p>
    </div>
  );
}
