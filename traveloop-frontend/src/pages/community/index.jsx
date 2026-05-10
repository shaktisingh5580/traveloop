import Head from "next/head";
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

  return (
    <>
      <Head><title>Community | Traveloop</title></Head>
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
