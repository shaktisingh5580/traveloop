import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  // Fallback if user is not loaded yet (though AuthProvider handles this)
  if (!user) return null;
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
    { name: "My Trips", href: "/trips", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> },
    { name: "Cities", href: "/cities", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V10"/><path d="M18 22V4"/><path d="M7 2H2v20"/><path d="M22 7h-5"/><path d="M22 11h-5"/><path d="M22 15h-5"/><path d="M2 14h5"/><path d="M2 10h5"/><path d="M2 18h5"/></svg> },
    { name: "Users", href: "/dashboard/users", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { name: "Community", href: "/community", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/><path d="M2 12a14.5 14.5 0 0 0 20 0"/><path d="M2 12a14.5 14.5 0 0 1 20 0"/></svg> },
  ];

  return (
    <aside className="w-24 lg:w-72 flex-shrink-0 bg-white border-r border-slate-100 hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-24 flex items-center px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
            <span className="text-white text-lg font-bold font-outfit">T</span>
          </div>
          <span className="hidden lg:block text-xl font-bold font-outfit tracking-tight text-slate-900">Traveloop</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 lg:px-6 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                isActive
                  ? "bg-brand-500 text-white shadow-brand"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="hidden lg:block font-bold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-100 space-y-4">
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 border-2 border-white shadow-sm flex items-center justify-center text-brand-600 font-bold text-sm shrink-0 overflow-hidden">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-400 font-medium truncate">{user.plan} Plan</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span className="hidden lg:block font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
