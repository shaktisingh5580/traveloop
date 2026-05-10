/**
 * Trip Notes / Journal — Screen 13
 * Owner: Kunal & Aman
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trip Notes" };

export default function NotesPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <div>
      {/* TODO: Add/edit/delete notes per trip/stop, timestamp display, date sort */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Trip Notes
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Trip: {params.tripId} — Kunal & Aman
      </p>
    </div>
  );
}
