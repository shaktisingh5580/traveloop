/**
 * City Search / Explore — Screen 7
 * Owner: Aman & Pratham
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Explore Cities" };

export default function CitiesPage() {
  return (
    <div>
      {/* TODO: Search bar, city cards with meta, "Add to Trip" button, filters */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Explore Cities
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Aman & Pratham</p>
    </div>
  );
}
