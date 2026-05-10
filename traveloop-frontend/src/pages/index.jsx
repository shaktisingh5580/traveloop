import Head from "next/head";
import { useState, useEffect } from "react";
import * as api from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch mock or real data
    api.get("/cities/popular").then(res => setDestinations(res || [])).catch(console.error);
    // Assuming trips endpoint exists or we use placeholders
    api.get("/trips").then(res => setTrips(res || [])).catch(console.error);
  }, []);

  // Placeholders if API fails or returns empty
  const regionalSelections = destinations.length > 0 ? destinations.slice(0, 5) : [
    { city: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600" },
    { city: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600" },
    { city: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600" },
    { city: "Himachal", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600" },
    { city: "Meghalaya", image: "https://images.unsplash.com/photo-1576487248805-fcb03b222d41?q=80&w=600" }
  ];

  const previousTrips = trips.length > 0 ? trips.slice(0, 3) : [
    { title: "Weekend in Gokarna", date: "Oct 2025", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600" },
    { title: "Jaipur Heritage Walk", date: "Dec 2025", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=600" },
    { title: "Manali Snow Trek", date: "Jan 2026", image: "https://images.unsplash.com/photo-1605640840424-916c80cda773?q=80&w=600" }
  ];

  return (
    <>
      <Head>
        <title>Traveloop | Main Landing Page</title>
        <meta name="description" content="Traveloop landing page based on wireframe." />
      </Head>

      {/* Banner Image - Full Screen Edge to Edge */}
      <div className="w-full h-screen relative mb-10 group overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000"
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
        x
      </div>

      <div className="px-6 max-w-[1400px] mx-auto min-h-screen relative">

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 bg-white p-3 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 items-center">
          <div className="flex-1 w-full relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              type="text"
              placeholder="Search bar ___"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-900"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap appearance-none">
              <option>Group by</option>
              <option>Region</option>
              <option>Date</option>
            </select>
            <button className="px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors whitespace-nowrap shadow-lg">
              Filter
            </button>
            <select className="px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap appearance-none">
              <option>Sort by...</option>
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>
        </div>

        {/* Top Regional Selections */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold font-outfit text-slate-900 whitespace-nowrap">Top Regional Selections</h2>
            <div className="h-[2px] w-full bg-slate-100 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {regionalSelections.map((dest, i) => (
              <div key={i} className="aspect-square rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl transition-all">
                <img src={dest.image || `https://images.unsplash.com/photo-1506461883276-594a12b11ac3?q=80&w=400&auto=format&fit=crop&sig=${i}`} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white font-bold text-xl drop-shadow-md">{dest.city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Trips */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold font-outfit text-slate-900 whitespace-nowrap">Previous Trips</h2>
            <div className="h-[2px] w-full bg-slate-100 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {previousTrips.map((trip, i) => (
              <div key={i} className="aspect-[3/4] rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <img src={trip.image || `https://images.unsplash.com/photo-1506461883276-594a12b11ac3?q=80&w=600&auto=format&fit=crop&sig=${i + 10}`} alt={trip.title || "Trip"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-widest">{trip.date || "Past Trip"}</span>
                  <h3 className="text-white font-bold text-3xl font-outfit leading-tight drop-shadow-md">{trip.title || "Trip Title"}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Plan a Trip Button */}
        <Link
          href="/trips/new"
          className="fixed bottom-10 right-10 bg-slate-900 text-white px-8 py-5 rounded-full font-bold shadow-2xl shadow-slate-900/40 hover:bg-emerald-500 hover:scale-105 hover:shadow-emerald-500/40 transition-all z-50 flex items-center gap-3 text-lg border border-slate-700 hover:border-emerald-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
          Plan a trip
        </Link>

      </div>
    </>
  );
}
