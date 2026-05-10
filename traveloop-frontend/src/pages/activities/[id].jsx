import Head from "next/head";
import { useRouter } from "next/router";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head><title>Activity Details | Traveloop</title></Head>
      <div className="max-w-[1200px] mx-auto py-12 px-6">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors uppercase tracking-widest text-xs">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
           Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="space-y-6">
             <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                <img src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80" alt="Activity" className="w-full h-full object-cover" />
             </div>
             <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-all cursor-pointer">
                     <img src={`https://images.unsplash.com/photo-${1511739001486 + i}-6bfe10ce785f?auto=format&fit=crop&w=400&q=80`} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-10">
             <div>
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Top Choice</span>
                   <div className="flex items-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="text-sm font-bold text-slate-900 ml-1">4.9 (2,450 Reviews)</span>
                   </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight leading-tight">Eiffel Tower Summit Priority Access</h1>
                <p className="text-lg text-slate-500 font-medium mt-4">Paris, France • Hosted by Paris Tours Inc.</p>
             </div>

             <div className="flex items-center gap-12 py-8 border-y border-slate-50">
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price</span>
                   <span className="text-3xl font-bold text-slate-900 font-outfit">$85<span className="text-sm font-medium text-slate-400 ml-1">/person</span></span>
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                   <span className="text-xl font-bold text-slate-900">3.5 Hours</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Language</span>
                   <span className="text-xl font-bold text-slate-900">English</span>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="text-xl font-bold font-outfit text-slate-900">About this activity</h3>
                <p className="text-slate-500 leading-relaxed font-medium">Experience the magic of Paris with priority access to the summit of the Eiffel Tower. Marvel at the city's landmarks from above and learn about the history of this architectural masterpiece with a professional guide.</p>
                <ul className="space-y-3">
                   {["Skip-the-line entrance", "Professional local guide", "Elevator access to summit", "Small group experience"].map(item => (
                     <li key={item} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                        <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {item}
                     </li>
                   ))}
                </ul>
             </div>

             <div className="pt-8 flex gap-4">
                <button className="flex-1 bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-[1.5rem] py-5 transition-all shadow-2xl shadow-slate-900/10 active:scale-[0.98] uppercase tracking-widest text-sm">Book Now</button>
                <button className="w-16 h-16 border-2 border-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
