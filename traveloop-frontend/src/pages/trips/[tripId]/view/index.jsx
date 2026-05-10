import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";
=======
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import BaseModal from "@/modals/BaseModal";
import { useState } from "react";
import { useRouter } from "next/router";
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac

export default function TripView() {
  const router = useRouter();
  const { tripId } = router.query;
<<<<<<< HEAD
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
=======
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const tabs = ["Overview", "Itinerary", "Budget", "Packing", "Notes"];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://traveloop.app/trips/${tripId || 1}/join`);
    alert("Join link copied to clipboard!");
  };

  return (
    <>
      <Head><title>Trip View | Traveloop</title></Head>
      <div className="max-w-[1400px] mx-auto py-4 md:py-8">
        {/* Trip Header */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 mb-10 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Active Trip</span>
                <span className="text-slate-400 text-sm font-medium">Trip ID: #{tripId || "1234"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight">European Summer 2026</h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 text-slate-500 font-medium text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Paris, France
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  June 12 - July 05
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowInviteModal(true)}
                className="flex-1 md:flex-none bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl px-4 md:px-6 py-3 md:py-4 transition-all text-xs md:text-sm uppercase tracking-widest"
              >
                Invite Friends
              </button>
              <button 
                onClick={() => setShowManageModal(true)}
                className="flex-1 md:flex-none bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-2xl px-6 md:px-8 py-3 md:py-4 transition-all shadow-lg shadow-slate-900/10 text-xs md:text-sm uppercase tracking-widest"
              >
                Manage Trip
              </button>
            </div>
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
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

<<<<<<< HEAD
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
=======
          {/* Navigation Tabs */}
          <div className="flex items-center gap-8 mt-12 border-t border-slate-100 pt-8 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold uppercase tracking-widest pb-4 transition-all relative whitespace-nowrap ${
                  activeTab === tab ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-8 flex items-center gap-3">
                {activeTab} Content
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Draft</span>
              </h2>
              
              {/* Mock Content for Itinerary */}
              <div className="space-y-6">
                {[1, 2, 3].map(day => (
                  <div key={day} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold font-outfit text-xl shadow-lg">0{day}</div>
                      <div className="flex-1 w-0.5 bg-slate-100 my-2" />
                    </div>
                    <div className="flex-1 pb-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Day {day}: Exploring the City</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:border-emerald-200 transition-all cursor-pointer">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Morning Activity</p>
                          <p className="font-bold text-slate-800">Visit the Eiffel Tower</p>
                          <p className="text-xs text-slate-400 mt-2">10:00 AM - 12:30 PM</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:border-emerald-200 transition-all cursor-pointer">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Lunch</p>
                          <p className="font-bold text-slate-800">Bistro on the Corner</p>
                          <p className="text-xs text-slate-400 mt-2">01:00 PM - 02:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trip Members Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
              <h3 className="text-xl font-bold font-outfit text-slate-900 mb-6">Trip Members</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(m => (
                  <div key={m} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${m}`} alt="Member" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{m === 1 ? "Pratham (Host)" : "Traveler " + m}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Editor</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 font-bold text-sm hover:border-emerald-200 hover:text-emerald-500 transition-all">+ Add Member</button>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mb-10 -mr-10 blur-2xl" />
               <h3 className="text-xl font-bold font-outfit mb-6 relative z-10">Quick Actions</h3>
               <div className="space-y-3 relative z-10">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-sm text-white">Share Live Trip</p>
                       <p className="text-[10px] font-medium text-white/50">Send real-time link</p>
                    </div>
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-3 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-sm text-white">Download PDF</p>
                       <p className="text-[10px] font-medium text-white/50">Save offline itinerary</p>
                    </div>
                  </button>
               </div>
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
            </div>
          </div>
        </div>

        {/* Modals */}
        <BaseModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite Friends">
           <div className="space-y-6">
              <p className="text-sm text-slate-500">Share this link with your friends to let them view and edit this trip together.</p>
              <div className="flex gap-2">
                 <input 
                   readOnly 
                   value={`https://traveloop.app/trips/${tripId || 1}/join`} 
                   className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none"
                 />
                 <button 
                   onClick={handleCopyLink}
                   className="bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all"
                 >
                   Copy
                 </button>
              </div>
              <div className="pt-4 border-t border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Members</p>
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold shadow-sm">
                      +2
                    </div>
                 </div>
              </div>
           </div>
        </BaseModal>

        <BaseModal isOpen={showManageModal} onClose={() => setShowManageModal(false)} title="Manage Trip">
           <div className="space-y-6">
              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Trip Name</label>
                 <input defaultValue="European Summer 2026" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium">
                       <option>Planning</option>
                       <option>Active</option>
                       <option>Completed</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Visibility</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium">
                       <option>Private</option>
                       <option>Shared</option>
                       <option>Public</option>
                    </select>
                 </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10">Save Changes</button>
              <button className="w-full text-red-500 font-bold text-sm py-2 hover:bg-red-50 rounded-xl transition-all mt-4">Delete Trip</button>
           </div>
        </BaseModal>

        <BaseModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Share Live Trip">
           <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl mx-auto flex items-center justify-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-outfit">Real-time Sharing</h4>
              <p className="text-sm text-slate-500">Your friends can follow your journey in real-time. This link expires in 24 hours.</p>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                 <span className="text-xs font-mono text-slate-600 font-bold">tloop.live/x9k2m1</span>
                 <button onClick={handleCopyLink} className="text-blue-500 font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors">Copy Link</button>
              </div>
              <div className="flex gap-4">
                 <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800">Done</button>
              </div>
           </div>
        </BaseModal>
      </div>
    </>
  );
}
