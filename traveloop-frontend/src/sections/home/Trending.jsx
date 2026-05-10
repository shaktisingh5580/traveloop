export default function Trending({ destinations = [] }) {
  return (
    <section id="explore" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Recommended for you</h2>
          <p className="text-slate-500">Popular destinations for your next adventure.</p>
        </div>
        <button className="text-sm font-bold text-slate-900 flex items-center gap-2 hover:translate-x-1 transition-transform">
          View all destinations
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations?.map((dest) => (
          <div key={dest.city} className="group card !p-0 cursor-pointer">
            <div className="aspect-[4/5] bg-slate-100 rounded-t-[2rem] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
              {dest.image}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold">{dest.city}</h3>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <span>⭐</span> {dest.rating}
                </div>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-4">{dest.country}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">{dest.price} <span className="text-sm font-normal text-slate-400">/ person</span></span>
                <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
