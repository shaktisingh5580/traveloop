/**
 * My Trips — Screen 4
 * Owner: Aman & Pratham
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Trips" };

export default function MyTripsPage() {
  return (
    <div>
      {/* TODO: Trip cards with name, date range, stop count, edit/view/delete */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        My Trips
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Aman & Pratham</p>
    </div>
  );
}
