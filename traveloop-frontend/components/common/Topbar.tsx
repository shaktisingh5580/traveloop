/**
 * Topbar — top navigation with search and user avatar.
 * Owner: Pratham
 */

"use client";

export default function Topbar() {
  return (
    <header
      className="flex items-center justify-between px-8 border-b border-[var(--color-border)] sticky top-0 z-40"
      style={{
        height: "var(--topbar-height)",
        background: "var(--color-bg-secondary)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <input
          type="search"
          placeholder="Search trips, cities, activities..."
          className="input-field text-sm"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
          🔔
        </button>
        <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold">
          S
        </div>
      </div>
    </header>
  );
}
