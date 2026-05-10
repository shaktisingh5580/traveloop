export default function Topbar() {
  return (
    <header className="h-16 flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-slate-500 hidden sm:block">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          Upgrade
        </button>
      </div>
    </header>
  );
}
