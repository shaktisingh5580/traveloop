import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ItineraryView() {
  const router = useRouter();
  const { tripId } = router.query;

  return (
    <>
      <Head>
        <title>Tokyo Express | Traveloop Planner</title>
      </Head>
      
      {/* Cover Image */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden -mt-8 mb-8 rounded-b-3xl">
        <div className="absolute inset-0 bg-slate-900/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" 
          alt="Tokyo Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-8 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Upcoming Trip
          </div>
        </div>
      </div>

      <div className="space-y-10 px-4 md:px-8 max-w-7xl mx-auto pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-5xl font-bold font-outfit text-slate-900 tracking-tight mb-3">Tokyo Express</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                Oct 12 - Oct 24, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Tokyo • Kyoto • Osaka
              </span>
              <div className="flex -space-x-2 ml-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">P</div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">S</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium text-sm flex items-center gap-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              Share
            </button>
            <Link href={`/dashboard/trips/${tripId}/edit`} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all font-medium text-sm shadow-md">
              Edit Trip
            </Link>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            <div className="flex gap-6 border-b border-slate-200 overflow-x-auto pb-px">
              <button className="pb-3 border-b-2 border-slate-900 text-slate-900 font-semibold whitespace-nowrap">Itinerary</button>
              <Link href="/dashboard/activities" className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap transition-colors">Explore</Link>
              <Link href={`/dashboard/trips/${tripId}/budget`} className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap transition-colors">Expenses ($2,400)</Link>
              <Link href={`/dashboard/trips/${tripId}/packing`} className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap transition-colors">Packing List</Link>
              <Link href={`/dashboard/trips/${tripId}/notes`} className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap transition-colors">Notes</Link>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 shadow-sm">12</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-outfit">Arrival & Shibuya</h3>
                      <p className="text-sm text-slate-500">Monday, Oct 12 • Tokyo</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex gap-4 group">
                    <div className="text-sm font-semibold text-slate-400 w-14 pt-3">14:00</div>
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm group-hover:border-slate-300 transition-all flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.9.1-1.1.5l-.6 1.4 3.9 1.4 1.4 3.9.6-.6c.4-.2.6-.7.5-1.1L6 18l4-4 4 6 1.2-.7c.4-.2.7-.6.6-1.1z"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-base font-bold text-slate-900">Land at Narita (NRT)</h4>
                          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">JL001</span>
                        </div>
                        <p className="text-sm text-slate-500">Terminal 2. Need to pick up JR Pass and Pocket WiFi.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-100 rounded-2xl h-64 border border-slate-200 overflow-hidden relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Map View" />
              <div className="absolute inset-0 bg-slate-900/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="bg-white/90 backdrop-blur text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                  Open Map View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
