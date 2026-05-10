/**
 * Itinerary Builder — Screen 5
 * Owner: Shakti & Kunal
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Itinerary Builder" };

export default function ItineraryBuilderPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <div>
      {/* TODO: Add Stop button, city selector, date picker, activity assignment, drag-to-reorder */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Itinerary Builder
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Trip: {params.tripId} — Shakti & Kunal
      </p>
    </div>
  );
}
