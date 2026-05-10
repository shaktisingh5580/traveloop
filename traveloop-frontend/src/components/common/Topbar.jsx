import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Topbar({ onMenuClick }) {
  const router = useRouter();
  const { requireAuth } = useAuth();
  
  const handlePlanTrip = () => {
    requireAuth(() => {
      router.push("/trips/new");
    });
  };

  return (
    <header className="h-20 md:h-24 px-4 md:px-6 lg:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-50/50">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>

        <div className="relative group flex-1 hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-focus-within:text-brand-500 transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search trips..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-brand-200 transition-all"
          />
        </div>
        {/* Mobile Search Icon */}
        <button className="sm:hidden w-10 h-10 flex items-center justify-center text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>
        <button 
          onClick={handlePlanTrip}
          className="bg-slate-900 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span className="hidden sm:inline">Plan Trip</span>
        </button>
      </div>
    </header>
  );
}
