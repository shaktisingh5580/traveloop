import Head from "next/head";
import { useState } from "react";

export default function CitySearch() {
  const [search, setSearch] = useState("");

  const activities = [
    { id: 1, name: "Eiffel Tower Tour", city: "Paris, France", price: "$45", rating: "4.9", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Louvre Museum", city: "Paris, France", price: "$25", rating: "4.8", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Colosseum Walk", city: "Rome, Italy", price: "$35", rating: "4.9", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Vatican Museums", city: "Vatican City", price: "$30", rating: "4.7", img: "https://images.unsplash.com/photo-1531572751523-53b61b91c78c?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <>
      <Head><title>Explore | Traveloop</title></Head>
      <div className="max-w-[1200px] mx-auto py-12 px-6">
        {/* Search Bar matching wireframe Screen 8 */}
        <div className="mb-16">
           <h1 className="text-4xl font-bold font-outfit text-slate-900 mb-8 tracking-tight text-center">Where to next?</h1>
           <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] blur-2xl group-focus-within:bg-emerald-500/20 transition-all" />
              <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-3 shadow-2xl shadow-slate-200/50 flex items-center">
                 <div className="flex-1 relative">
                    <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input 
                      type="text" 
                      placeholder="Search activities, cities, guides..." 
                      className="w-full bg-transparent border-none pl-16 pr-6 py-5 text-lg font-medium text-slate-900 focus:outline-none"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                 </div>
                 <button className="bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-[2rem] px-10 py-5 transition-all shadow-lg">Search</button>
              </div>
           </div>
        </div>

        {/* List of Activities/Cities Section */}
        <div className="space-y-12">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold font-outfit text-slate-900">Featured Activities</h2>
             <div className="flex gap-2">
                <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
                <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
             </div>
          </div>

          <div className="space-y-6">
            {activities.map((act) => (
              <div key={act.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-center cursor-pointer">
                <div className="w-full md:w-64 aspect-[4/3] rounded-[2rem] overflow-hidden relative shadow-lg">
                  <img src={act.img} alt={act.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                    <svg className="text-amber-500 fill-amber-500" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span className="text-[10px] font-bold text-slate-900">{act.rating}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">{act.city}</p>
                  <h3 className="text-2xl font-bold font-outfit text-slate-900 group-hover:text-emerald-600 transition-colors">{act.name}</h3>
                  <p className="text-slate-500 font-medium mt-2 leading-relaxed">Experience the breathtaking views and rich history of this iconic landmark. A must-visit destination for any traveler.</p>
                  <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starting from</span>
                       <span className="text-xl font-bold text-slate-900">{act.price}</span>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                       <span className="text-lg font-bold text-slate-900">3-4 Hours</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                   <button className="w-full md:w-auto bg-slate-900 group-hover:bg-emerald-500 text-white font-bold rounded-2xl px-10 py-5 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] uppercase tracking-widest text-sm">
                      View Details
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
