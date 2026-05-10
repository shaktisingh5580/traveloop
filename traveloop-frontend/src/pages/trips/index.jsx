import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as api from "@/lib/api";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/trips/").then(res => setTrips(res || [])).catch(console.error);
  }, []);
  return (
    <>
      <Head><title>My Trips | Traveloop</title></Head>
      <div className="space-y-8 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">My Trips</h1>
            <p className="text-slate-500">Manage all your travel itineraries in one place.</p>
          </div>
          <Link href="/dashboard/trips/new" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Trip
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <Link key={trip.id} href={`/dashboard/trips/${trip.id}/view`} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all">
               <div className="h-48 overflow-hidden relative">
                  <img src={trip.img} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-slate-900 shadow-sm">
                     {trip.status}
                  </div>
               </div>
               <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 font-outfit group-hover:text-emerald-600 transition-colors">{trip.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{trip.dates}</p>
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{trip.country}</span>
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                     </div>
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
