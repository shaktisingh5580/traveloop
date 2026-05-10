import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "py-2 px-6" : "py-0 px-0"
      }`}>
      <div className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${scrolled
        ? "max-w-full bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] px-8 h-16"
        : "max-w-full bg-transparent border-transparent px-8 h-20"
        }`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <span className="text-white text-xl font-bold font-outfit">T</span>
          </div>
          <span className={`text-2xl font-bold font-outfit tracking-tighter transition-colors ${scrolled ? "text-slate-900" : "text-slate-900"
            }`}>Traveloop</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Features", "Explore", "Community", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold text-slate-500 hover:text-emerald-500 transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-bold text-slate-900 hover:text-emerald-500 transition-colors">Dashboard</Link>
              <button onClick={logout} className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-emerald-500 transition-all active:scale-95">Sign Out</button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Sign In</Link>
              <Link href="/signup" className={`px-7 py-3.5 text-sm font-bold rounded-full transition-all shadow-xl active:scale-95 ${scrolled
                ? "bg-slate-900 text-white shadow-emerald-900/10 hover:bg-emerald-500"
                : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
                }`}>
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
