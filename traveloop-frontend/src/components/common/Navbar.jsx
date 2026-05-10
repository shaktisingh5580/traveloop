import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, openLogin, openSignup, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "py-2 px-4 md:px-6" : "py-0 px-0"
      }`}>
      <div className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${scrolled
        ? "max-w-full bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] px-4 md:px-8 h-14 md:h-16"
        : "max-w-full bg-transparent border-transparent px-6 md:px-8 h-16 md:h-20"
        }`}>
        <Link href="/" className="flex items-center group">
          <div className="h-12 md:h-16 w-auto min-w-[120px] md:min-w-[200px] flex items-center justify-start md:justify-center group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Traveloop Logo" className="h-full w-auto object-contain scale-[1.1] md:scale-[1.3] origin-left" />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Features", "Explore", "Community", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-bold transition-all relative group drop-shadow-sm ${
                scrolled ? "text-slate-600 hover:text-emerald-600" : "text-slate-900 hover:text-emerald-600"
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {!loading && (
            user ? (
              <>
                <Link href="/dashboard" className="text-xs md:text-sm font-bold text-slate-900 hover:text-emerald-500 transition-colors hidden sm:block">Dashboard</Link>
                <button onClick={logout} className="px-4 md:px-6 py-2.5 md:py-3 bg-slate-900 text-white text-[10px] md:text-sm font-bold rounded-full hover:bg-emerald-500 transition-all active:scale-95 uppercase tracking-widest md:normal-case">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={openLogin} className={`hidden sm:block text-sm font-bold transition-colors ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-900 hover:text-emerald-600"}`}>Sign In</button>
                <button onClick={openSignup} className={`px-5 md:px-7 py-2.5 md:py-3.5 text-xs md:text-sm font-bold rounded-full transition-all shadow-xl active:scale-95 ${scrolled
                  ? "bg-slate-900 text-white shadow-emerald-900/10 hover:bg-emerald-500"
                  : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
                  }`}>
                  Join Now
                </button>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
