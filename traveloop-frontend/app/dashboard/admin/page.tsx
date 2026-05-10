/**
 * Admin / Analytics Dashboard — Screen 14 (Optional)
 * Owner: Shakti
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  return (
    <div>
      {/* TODO: Tables/charts — trips created, top cities, user engagement, user management */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Admin Dashboard
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Shakti (admin only)</p>
    </div>
  );
}
