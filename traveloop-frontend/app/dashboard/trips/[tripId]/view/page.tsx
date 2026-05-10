/**
 * Itinerary View — Screen 6
 * Owner: Kunal & Shakti
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Itinerary View" };

export default function ItineraryViewPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <div>
      {/* TODO: Day-wise layout, city headers, activity blocks, calendar/list toggle */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Trip Itinerary
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Trip: {params.tripId} — Kunal & Shakti
      </p>
    </div>
  );
}
