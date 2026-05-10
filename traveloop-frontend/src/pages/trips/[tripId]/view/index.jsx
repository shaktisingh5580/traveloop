import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

export default function TripView() {
  const router = useRouter();
  const { tripId } = router.query;
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDay, setFilterDay] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const [tripData, stopsData, expensesData] = await Promise.all([
          api.get(`/trips/${tripId}`),
          api.get(`/trips/${tripId}/stops`).catch(() => []),
          api.get(`/trips/${tripId}/expenses`).catch(() => []),
        ]);
        setTrip(tripData);
        setStops(stopsData || []);
        setExpenses(expensesData || []);
      } catch (err) {
        console.error("Failed to load trip:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  // Build day-wise itinerary from stops and their activities
  const buildDayWise = () => {
    const days = [];
    stops.forEach((stop) => {
      const arrival = new Date(stop.arrival_date);
      const departure = new Date(stop.departure_date);
      const diffDays = Math.ceil((departure - arrival) / (1000 * 60 * 60 * 24)) + 1;

      for (let d = 0; d < diffDays; d++) {
        const date = new Date(arrival);
        date.setDate(date.getDate() + d);
        const dateStr = date.toISOString().split("T")[0];

        const dayActivities = (stop.activities || [])
          .filter(a => !a.scheduled_date || a.scheduled_date === dateStr)
          .map(a => ({
            ...a,
            cityName: stop.city?.name || stop.city_name || "Unknown",
            stopId: stop.id,
          }));

        // Also add the stop itself as context
        days.push({
          date: dateStr,
          dayNumber: days.length + 1,
          cityName: stop.city?.name || stop.city_name || "Unknown",
          activities: dayActivities,
          stop,
        });
      }
    });
    return days;
  };

  const dayWise = buildDayWise();

  // Calculate budget
  const totalBudget = trip?.total_budget || 0;
  const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const expensesByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (parseFloat(e.amount) || 0);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-8 w-8 text-brand-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Head><title>{trip?.name || "Trip"} | Traveloop</title></Head>
      <div className="space-y-6 pb-20">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-brand-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
            <option value="all">Group by: All Days</option>
            {dayWise.map((d, i) => <option key={i} value={d.dayNumber}>Day {d.dayNumber}</option>)}
          </select>
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-colors">
            Filter
          </button>
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="time">Sort: Time</option>
            <option value="cost">Sort: Cost</option>
          </select>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-outfit">Itinerary for {trip?.name || "a selected place"}</h1>
            <p className="text-sm text-slate-500 mt-1">{trip?.start_date} → {trip?.end_date} · {stops.length} stops</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/trips/${tripId}/edit`} className="px-4 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-all">
              Edit
            </Link>
            <Link href={`/trips/${tripId}/budget`} className="px-4 py-2.5 bg-white border border-slate-200 text-sm font-bold rounded-xl hover:border-slate-300 transition-all">
              Budget
            </Link>
          </div>
        </div>

        {/* Day-wise Itinerary */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Timeline */}
          <div className="flex-1 space-y-8">
            {(filterDay === "all" ? dayWise : dayWise.filter(d => d.dayNumber === parseInt(filterDay))).map((day, di) => (
              <div key={di}>
                {/* Day Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg">
                    Day {day.dayNumber}
                  </div>
                  <span className="text-sm font-medium text-slate-500">{day.date} · {day.cityName}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Activity Table Header */}
                <div className="flex items-center px-4 py-2 mb-2">
                  <span className="flex-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Physical Activity</span>
                  <span className="w-28 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Expense</span>
                </div>

                {/* Activities */}
                <div className="space-y-2">
                  {day.activities.length > 0 ? (
                    day.activities.map((act, ai) => (
                      <div key={ai} className="flex items-center bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-sm transition-all group">
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-900">{act.activity?.name || act.name || "Activity"}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {act.start_time && `${act.start_time} - ${act.end_time || ""}`}
                            {act.activity?.duration_hours && ` · ${act.activity.duration_hours}h`}
                          </p>
                        </div>
                        <div className="w-28 text-right">
                          <span className="text-sm font-bold text-slate-900">
                            ₹{act.custom_cost || act.activity?.estimated_cost || 0}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show stop info if no specific activities
                    <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">Stay in {day.cityName}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{day.stop.accommodation || "Accommodation"}</p>
                      </div>
                      <div className="w-28 text-right">
                        <span className="text-sm font-bold text-slate-900">₹{day.stop.accommodation_cost || 0}</span>
                      </div>
                    </div>
                  )}

                  {/* Transport between stops */}
                  {day.stop.transport_mode && di < dayWise.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-px h-4 bg-slate-200" />
                        <span>↓ {day.stop.transport_mode} · ₹{day.stop.transport_cost || 0}</span>
                        <div className="w-px h-4 bg-slate-200" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {dayWise.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
                <p className="text-slate-400 mb-4">No itinerary built yet.</p>
                <Link href={`/trips/${tripId}/edit`} className="btn-brand px-6 py-3 text-sm">
                  Build Itinerary
                </Link>
              </div>
            )}
          </div>

          {/* Right: Budget Summary */}
          <div className="w-full lg:w-80 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-8">
              <h3 className="text-base font-bold text-slate-900 mb-4">Budget Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-slate-500">Total Budget</span>
                  <span className="text-sm font-bold text-slate-900">₹{totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-600">Total Expenses</span>
                  <span className="text-sm font-bold text-emerald-700">₹{totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-slate-500">Remaining</span>
                  <span className={`text-sm font-bold ${totalBudget - totalExpenses >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    ₹{(totalBudget - totalExpenses).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Category breakdown */}
              {Object.keys(expensesByCategory).length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">By Category</h4>
                  <div className="space-y-2">
                    {Object.entries(expensesByCategory).map(([cat, amount]) => (
                      <div key={cat} className="flex justify-between text-sm">
                        <span className="text-slate-600 capitalize">{cat}</span>
                        <span className="font-bold text-slate-900">₹{amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link href={`/trips/${tripId}/budget`} className="mt-4 block w-full text-center py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all">
                Manage Budget
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
