export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-50/50 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-6 border border-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          v2.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-outfit text-slate-900 tracking-tight leading-[1.1] mb-6">
          Plan your next <span className="text-emerald-500">adventure</span> without the mess.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          The collaborative travel workspace for modern explorers. Map out your itinerary, track expenses, and coordinate with friends in one polished app.
        </p>

        {/* Airbnb Style Search Bar */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-full p-2 pl-8 flex flex-col md:flex-row items-center gap-2 shadow-2xl shadow-emerald-900/5 group hover:border-slate-300 transition-all">
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 py-2">
            <div className="flex flex-col items-start w-full px-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Where</label>
              <input type="text" placeholder="Search destinations" className="w-full bg-transparent border-none outline-none text-slate-600 placeholder-slate-400 font-medium" />
            </div>
            <div className="flex flex-col items-start w-full px-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">When</label>
              <input type="text" placeholder="Add dates" className="w-full bg-transparent border-none outline-none text-slate-600 placeholder-slate-400 font-medium cursor-pointer" readOnly />
            </div>
            <div className="flex flex-col items-start w-full px-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">Who</label>
              <input type="text" placeholder="Add guests" className="w-full bg-transparent border-none outline-none text-slate-600 placeholder-slate-400 font-medium cursor-pointer" readOnly />
            </div>
          </div>
          
          <button className="w-full md:w-auto p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg shadow-emerald-500/25">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
