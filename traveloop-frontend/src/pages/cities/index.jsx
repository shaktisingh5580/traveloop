import Head from "next/head";
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
