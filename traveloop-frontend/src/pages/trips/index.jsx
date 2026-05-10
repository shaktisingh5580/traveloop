import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as api from "@/lib/api";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/trips/")
      .then(res => setTrips(res || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort
  const filtered = trips
    .filter(t => filterStatus === "all" || t.status === filterStatus)
    .filter(t => t.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      if (sortBy === "oldest") return new Date(a.created_at || 0) - new Date(b.created_at || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      return 0;
    });

  // Group by status
  const ongoing = filtered.filter(t => t.status === "ongoing");
  const upcoming = filtered.filter(t => t.status === "planned" || t.status === "draft");
  const completed = filtered.filter(t => t.status === "completed");
  const cancelled = filtered.filter(t => t.status === "cancelled");

  const statusColor = (status) => ({
    draft: "bg-slate-100 text-slate-600",
    planned: "bg-blue-50 text-blue-600",
    ongoing: "bg-emerald-50 text-emerald-600",
    completed: "bg-purple-50 text-purple-600",
    cancelled: "bg-red-50 text-red-600",
  }[status] || "bg-slate-100 text-slate-600");

  const TripCard = ({ trip }) => (
    <Link
      href={`/trips/${trip.id}/view`}
      className="block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-slate-300 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{trip.name}</h3>
        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${statusColor(trip.status)}`}>
          {trip.status}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
        {trip.description || "Short overview of the trip — dates, destinations, and highlights."}
      </p>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>{trip.start_date} → {trip.end_date}</span>
        <span className="font-bold">{trip.stop_count || 0} stops</span>
      </div>
    </Link>
  );

  const TripGroup = ({ title, trips, color }) => {
    if (trips.length === 0) return null;
    return (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
          <h2 className="text-base font-bold text-slate-900 font-outfit">{title}</h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{trips.length}</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
        <div className="space-y-3">
          {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head><title>My Trips | Traveloop</title></Head>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold font-outfit text-slate-900">My Trips</h1>
          <Link href="/trips/new" className="inline-flex items-center gap-2 px-5 py-3 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Trip
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search trips..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Group by: All</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />)}
          </div>
        )}

        {/* Grouped trips */}
        {!loading && filterStatus === "all" ? (
          <div className="space-y-8">
            <TripGroup title="Ongoing" trips={ongoing} color="bg-emerald-500" />
            <TripGroup title="Up-coming" trips={upcoming} color="bg-blue-500" />
            <TripGroup title="Completed" trips={completed} color="bg-purple-500" />
            <TripGroup title="Cancelled" trips={cancelled} color="bg-red-500" />
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
                <p className="text-slate-400 mb-4">No trips found</p>
                <Link href="/trips/new" className="btn-brand px-6 py-3 text-sm inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Plan a trip
                </Link>
              </div>
            )}
          </div>
        ) : !loading ? (
          <div className="space-y-3">
            {filtered.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        ) : null}
      </div>
    </>
  );
}
