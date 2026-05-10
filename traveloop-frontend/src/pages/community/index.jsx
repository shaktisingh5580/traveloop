import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function Community() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  // Fetch public/shared trips
  useEffect(() => {
    const fetchPublic = async () => {
      try {
        // Fetch public trips — these are trips marked is_public=true
        const res = await api.get("/trips/public").catch(() => []);
        setTrips(res || []);
      } catch (err) {
        console.error("Failed to load community trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublic();
  }, []);

  // Filter and sort
  const filtered = trips
    .filter(t => t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 t.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(t => filterType === "all" || t.status === filterType)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      if (sortBy === "popular") return (b.stop_count || 0) - (a.stop_count || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      return 0;
    });
=======
import { useState } from "react";

export default function Community() {
  const [search, setSearch] = useState("");

  const groups = [
    { id: 1, name: "Solo Travelers", members: "12k", description: "Tips and tricks for the lone wanderer.", img: "https://images.unsplash.com/photo-1501504905953-f8319bdc8f85?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Digital Nomads", members: "45k", description: "Working remotely from the best beaches.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Budget Backpackers", members: "89k", description: "Seeing the world on $20 a day.", img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Luxury Escapes", members: "5k", description: "The finest stays and travel experiences.", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
  ];
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac

  return (
    <>
      <Head><title>Community | Traveloop</title></Head>
<<<<<<< HEAD
      <div className="space-y-6 pb-20">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search community trips, experiences..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Group by: All</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Planned</option>
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-colors">
            Filter
          </button>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Sort: Newest</option>
            <option value="popular">Sort: Popular</option>
            <option value="name">Sort: A-Z</option>
          </select>
=======
      <div className="max-w-[1400px] mx-auto py-12 px-6">
        {/* Community Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight mb-4">Traveloop Community</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">Connect with thousands of travelers, share your itineraries, and find your next travel buddy.</p>
           </div>
           <div className="w-full md:w-96">
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <input 
                   type="text" 
                   placeholder="Find groups or discussions..." 
                   className="w-full bg-white border border-slate-100 rounded-[2rem] py-5 pl-14 pr-6 text-base font-medium shadow-xl shadow-slate-200/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Trending Posts */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold font-outfit text-slate-900">Trending Discussions</h2>
                <div className="flex gap-4">
                   <button className="text-sm font-bold text-emerald-600">Latest</button>
                   <button className="text-sm font-bold text-slate-400 hover:text-slate-900">Hot</button>
                </div>
             </div>

             {[1, 2, 3].map(p => (
               <div key={p} className="bg-white border border-slate-50 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-emerald-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${p+10}`} alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">Alex Wanderlust</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posted 2h ago in Solo Travelers</p>
                     </div>
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Has anyone traveled through Vietnam lately? Looking for hidden gems!</h3>
                  <p className="text-slate-500 leading-relaxed line-clamp-2 mb-6">Thinking of doing a 3-week trip from North to South. I've seen the usual spots but looking for something a bit more off the beaten path...</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                           <span className="text-xs font-bold uppercase tracking-widest">128</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                           <span className="text-xs font-bold uppercase tracking-widest">42</span>
                        </div>
                     </div>
                     <button className="text-sm font-bold text-slate-900 hover:text-emerald-500 flex items-center gap-2 transition-colors">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                     </button>
                  </div>
               </div>
             ))}
          </div>

          {/* Sidebar: Recommended Groups */}
          <div className="space-y-8">
             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                <h3 className="text-xl font-bold font-outfit mb-6 relative z-10">Popular Communities</h3>
                <div className="space-y-6 relative z-10">
                   {groups.map(group => (
                     <div key={group.id} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white/10 group-hover:border-emerald-500 transition-all">
                           <img src={group.img} alt={group.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="font-bold text-sm truncate group-hover:text-emerald-400 transition-colors">{group.name}</p>
                           <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{group.members} Members</p>
                        </div>
                        <button className="p-2 text-white/40 hover:text-white transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 bg-white/10 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm transition-all uppercase tracking-widest">Explore All Groups</button>
             </div>

             <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-500/20">
                <h3 className="text-xl font-bold font-outfit mb-4">Start a Discussion</h3>
                <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">Have a question or want to share your latest trip itinerary with the world?</p>
                <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl text-sm hover:scale-[1.02] transition-all uppercase tracking-widest shadow-xl shadow-slate-900/10">Create Post</button>
             </div>
          </div>
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900 font-outfit">Community Tab</h2>
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">{filtered.length} shared trips</span>
        </div>

        {/* Community Posts */}
        {loading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((trip, i) => (
              <div
                key={trip.id || i}
                className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* User Avatar */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                    {trip.user?.avatar_url ? (
                      <img src={trip.user.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${trip.user_id || trip.id || i}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {trip.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {trip.user?.full_name || "Traveler"} · {trip.start_date} → {trip.end_date}
                      </p>
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                      trip.status === "completed" ? "bg-purple-50 text-purple-600" :
                      trip.status === "ongoing" ? "bg-emerald-50 text-emerald-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {trip.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {trip.description || "A shared travel experience — explore the itinerary, get inspired, and plan your own adventure."}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-slate-400 font-medium">📍 {trip.stop_count || 0} stops</span>
                    {trip.total_budget && (
                      <span className="text-xs text-slate-400 font-medium">💰 ₹{trip.total_budget}</span>
                    )}
                    {trip.share_slug && (
                      <Link
                        href={`/public/${trip.share_slug}`}
                        className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        View Itinerary →
                      </Link>
                    )}
                  </div>
                </div>

                {/* Trip Cover Image */}
                {trip.cover_image_url && (
                  <div className="hidden sm:block w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={trip.cover_image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No shared trips yet</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Community section where all users can share their experience about a certain trip or activity.
              Be the first to share your adventure!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
