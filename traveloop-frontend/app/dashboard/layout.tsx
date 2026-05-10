/**
 * Dashboard Layout — wraps all protected pages with Sidebar + Topbar.
 * Owner: Pratham (layout/design) & Shakti (auth guard)
 * 
 * All routes under /dashboard/* share this layout.
 */

import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <Topbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
