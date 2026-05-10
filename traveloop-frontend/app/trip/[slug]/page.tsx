/**
 * Shared/Public Trip View — Screen 11
 * Owner: Shakti & Kunal
 * Public route — no auth required
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Itinerary",
};

export default function SharedTripPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen p-8">
      {/* TODO: Fetch public trip by share_slug, display read-only itinerary */}
      <h1>Shared Trip: {params.slug}</h1>
    </div>
  );
}
