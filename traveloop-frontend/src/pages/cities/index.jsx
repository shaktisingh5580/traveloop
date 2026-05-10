import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import { useState, useEffect } from "react";
import * as api from "@/lib/api";

export default function CitySearch() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cities"); // cities or activities
  const [filterRegion, setFilterRegion] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    api.get("/cities/popular")
      .then(res => setResults(res || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Search on query change
  useEffect(() => {
    if (searchQuery.length >= 2) {
      setLoading(true);
      const endpoint = searchType === "cities"
        ? `/cities/search?q=${encodeURIComponent(searchQuery)}`
        : `/activities/search?q=${encodeURIComponent(searchQuery)}`;
      api.get(endpoint)
        .then(res => setResults(res || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    } else if (searchQuery.length === 0) {
      api.get("/cities/popular")
        .then(res => setResults(res || []))
        .catch(() => {});
    }
  }, [searchQuery, searchType]);

  // Sort results
  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "popularity") return (b.popularity || 0) - (a.popularity || 0);
    if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "cost") return (a.cost_index || a.estimated_cost || 0) - (b.cost_index || b.estimated_cost || 0);
    return 0;
  });

  return (
    <>
      <Head><title>{searchType === "cities" ? "City Search" : "Activity Search"} | Traveloop</title></Head>
      <div className="space-y-6 pb-20">
        {/* Search Bar + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder={searchType === "cities" ? "Search cities, countries..." : "Search activities, experiences..."}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Toggle: Cities / Activities */}
          <div className="flex bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <button
              className={`px-5 py-3 text-sm font-bold transition-all ${searchType === "cities" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => { setSearchType("cities"); setResults([]); setSearchQuery(""); }}
            >
              Cities
            </button>
            <button
              className={`px-5 py-3 text-sm font-bold transition-all ${searchType === "activities" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={() => { setSearchType("activities"); setResults([]); setSearchQuery(""); }}
            >
              Activities
            </button>
          </div>

          {/* Filter */}
          <select
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
          >
            <option value="all">Filter: All</option>
            <option value="south-asia">South Asia</option>
            <option value="europe">Europe</option>
            <option value="east-asia">East Asia</option>
          </select>

          {/* Sort */}
          <select
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Sort: Popular</option>
            <option value="name">Sort: A-Z</option>
            <option value="cost">Sort: Cost</option>
          </select>
=======
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
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
        </div>

        {/* Results Header */}
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-700">Results</h2>
          <span className="text-xs text-slate-400 font-medium">{sortedResults.length} items</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Results List */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : sortedResults.length > 0 ? (
          <div className="space-y-3">
            {sortedResults.map((item, i) => (
              <Link
                key={item.id || i}
                href={searchType === "cities" ? `/cities/${item.id}` : "#"}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* Image */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      {searchType === "cities" ? "🏙️" : item.activity_type === "food_tour" ? "🍽️" : item.activity_type === "adventure" ? "🏔️" : "📍"}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {searchType === "cities"
                      ? `${item.country_name || ""} · Cost: ${"$".repeat(item.cost_index || 1)} · Pop: ${item.popularity || 0}`
                      : `${item.activity_type || "Activity"} · ${item.duration_hours || "?"}h · ₹${item.estimated_cost || 0}`
                    }
                  </p>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 text-sm">No results found. Try a different search term.</p>
          </div>
        )}
      </div>
    </>
  );
}
