import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "My Trips", href: "/dashboard/trips", icon: "✈️" },
    { name: "Create Trip", href: "/dashboard/trips/new", icon: "➕" },
    { name: "Explore Cities", href: "/dashboard/cities", icon: "🏙️" },
    { name: "Activities", href: "/dashboard/activities", icon: "🎯" },
    { name: "Community", href: "/dashboard/community", icon: "🌐" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <span className="text-xl font-bold font-outfit tracking-tight text-slate-900 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          Traveloop
        </span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-200">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-all hover:shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-medium text-sm">
            US
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">User Settings</p>
            <p className="text-xs text-slate-400 truncate">Pro Plan</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
