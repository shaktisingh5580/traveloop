import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, tripsRes] = await Promise.all([
          api.get("/cities/popular").catch(() => []),
          api.get("/trips/").catch(() => []),
        ]);
        setDestinations(citiesRes || []);
        setTrips(tripsRes || []);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort trips
  const filteredTrips = trips
    .filter(t => filterStatus === "all" || t.status === filterStatus)
    .filter(t => t.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "oldest") return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      return 0;
    });

  const statusColor = (status) => {
    const map = {
      draft: "bg-slate-100 text-slate-600",
      planned: "bg-blue-50 text-blue-600",
      ongoing: "bg-emerald-50 text-emerald-600",
      completed: "bg-purple-50 text-purple-600",
      cancelled: "bg-red-50 text-red-600",
    };
    return map[status] || "bg-slate-100 text-slate-600";
  };

  const bannerImages = [
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1400",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1400",
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Traveloop</title>
      </Head>

      <div className="space-y-8 pb-20">
        {/* Banner Image */}
        <div className="relative w-full h-[280px] md:h-[340px] rounded-3xl overflow-hidden shadow-lg group">
          <img
            src={bannerImages[0]}
            alt="Travel Banner"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
              Welcome back, {user?.full_name?.split(" ")[0] || user?.name?.split(" ")[0] || "Traveler"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-outfit">
              Where will you go next?
            </h1>
          </div>
          <div className="absolute top-6 right-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
              🌍 {trips.length} trips planned
            </span>
          </div>
        </div>

        {/* Search Bar + Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search trips, destinations..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
            </select>
          </div>
        </div>

        {/* Top Regional Selections */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-lg font-bold text-slate-900 font-outfit">Top Regional Selections</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <Link href="/cities" className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(destinations.length > 0 ? destinations.slice(0, 5) : Array(5).fill(null)).map((city, i) => (
              <Link
                key={i}
                href={city ? `/cities/${city.id}` : "#"}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {city?.image_url ? (
                  <img
                    src={city.image_url}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                    {loading ? (
                      <div className="w-full h-full animate-pulse bg-slate-200" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold text-white truncate">{city?.name || "—"}</h3>
                  {city?.country_name && (
                    <p className="text-[10px] text-white/70 font-medium">{city.country_name}</p>
                  )}
                </div>
                {city?.cost_index && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white">
                    {"$".repeat(city.cost_index)}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Previous Trips */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-lg font-bold text-slate-900 font-outfit">Previous Trips</h2>
            <div className="flex-1 h-px bg-slate-200" />
            <Link href="/trips" className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredTrips.slice(0, 6).map((trip, i) => (
                <Link
                  key={trip.id || i}
                  href={`/trips/${trip.id}`}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {trip.cover_image_url ? (
                    <img
                      src={trip.cover_image_url}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-3 p-6">
                      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 text-center">{trip.name}</h3>
                      <p className="text-xs text-slate-400 text-center">
                        {trip.start_date} → {trip.end_date}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${statusColor(trip.status)}`}>
                      {trip.status || "draft"}
                    </span>
                  </div>
                  {trip.cover_image_url && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <h3 className="text-sm font-bold text-white">{trip.name}</h3>
                      <p className="text-[11px] text-white/70 mt-0.5">{trip.start_date} → {trip.end_date}</p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No trips yet</h3>
              <p className="text-sm text-slate-500 mb-6">Start planning your first adventure!</p>
              <Link href="/trips/new" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Plan a trip
              </Link>
            </div>
          )}
        </div>

        {/* Floating "Plan a trip" Button */}
        <Link
          href="/trips/new"
          className="fixed bottom-8 right-8 bg-brand-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-brand-500/30 hover:bg-brand-600 hover:shadow-brand-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 font-bold text-sm z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Plan a trip
        </Link>
      </div>
    </>
  );
}
