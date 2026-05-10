/**
 * Sidebar — main navigation for protected pages.
 * Owner: Pratham
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/trips", label: "My Trips", icon: "✈️" },
  { href: "/dashboard/trips/new", label: "Create Trip", icon: "➕" },
  { href: "/dashboard/cities", label: "Explore Cities", icon: "🌍" },
  { href: "/dashboard/activities", label: "Activities", icon: "🎯" },
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 flex flex-col border-r border-[var(--color-border)] z-50"
      style={{
        width: "var(--sidebar-width)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <Link href="/dashboard">
          <h2
            className="text-xl font-bold gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ✈️ Traveloop
          </h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-lg"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button className="w-full btn-secondary text-sm">🚪 Logout</button>
      </div>
    </aside>
  );
}
