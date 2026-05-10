/**
 * Budget & Cost Breakdown — Screen 9
 * Owner: Shakti & Kunal
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trip Budget" };

export default function BudgetPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <div>
      {/* TODO: Pie/bar charts, cost by category, avg per day, over-budget alerts */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Budget Breakdown
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Trip: {params.tripId} — Shakti & Kunal
      </p>
    </div>
  );
}
