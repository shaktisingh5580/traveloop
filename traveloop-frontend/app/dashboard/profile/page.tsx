/**
 * User Profile / Settings — Screen 12
 * Owner: Pratham & Aman
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div>
      {/* TODO: Editable name, photo, email, language pref, delete account, saved destinations */}
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Profile Settings
      </h1>
      <p className="text-[var(--color-text-secondary)]">Placeholder — Pratham & Aman</p>
    </div>
  );
}
