import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { requireAuth } = useAuth();
  
  const handlePlanTrip = () => {
    requireAuth(() => {
      // Navigate to plan trip or show modal
    });
  };
  return (
    <header className="h-24 px-6 lg:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-focus-within:text-brand-500 transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search trips, cities, or activities..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/5 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span className="absolute top-3 right-3 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>
        <button 
          onClick={handlePlanTrip}
          className="bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span>Plan Trip</span>
        </button>
      </div>
    </header>
  );
}
