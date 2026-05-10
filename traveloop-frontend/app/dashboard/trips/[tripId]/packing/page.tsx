/**
 * Packing Checklist — Screen 10
 * Owner: Aman & Pratham
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Packing Checklist" };

export default function PackingPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <div>
      {/* TODO: Add/remove items, toggle packed, category grouping, reset */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Packing Checklist
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Trip: {params.tripId} — Aman & Pratham
      </p>
    </div>
  );
}
