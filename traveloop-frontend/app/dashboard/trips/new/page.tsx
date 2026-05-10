/**
 * Create Trip — Screen 3
 * Owner: Aman & Shakti
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Trip" };

export default function CreateTripPage() {
  return (
    <div>
      {/* TODO: Trip name, start/end dates, description, cover photo, save button */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Plan a New Trip
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Aman & Shakti</p>
    </div>
  );
}
