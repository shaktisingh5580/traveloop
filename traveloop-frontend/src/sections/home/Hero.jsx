import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Hero() {
  const { requireAuth } = useAuth();
  const [formData, setFormData] = useState({
    region: "",
    city: "",
    startDate: "",
    endDate: ""
  });

  const handleSearch = (e) => {
    e.preventDefault();
    requireAuth(() => {
      console.log("Planning trip for:", formData);
    });
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left: Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Join 10k+ Travelers</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Plan your <span className="text-emerald-500 italic font-outfit">dream</span> escape.
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
            The intelligent travel planner for modern explorers.
            Collaborate in real-time, optimize budgets, and discover
            hidden Indian gems in seconds.
          </p>

          {/* Redesigned Search Bar - Floating Separate Pill Design (Airbnb Style) */}
          <form onSubmit={handleSearch} className="max-w-[700px] w-full bg-white p-2 rounded-[3.5rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-1 group">

            <div className="flex-1 flex items-center w-full">
              {/* State Selector */}
              <div className="flex-1 flex flex-col px-6 py-3 rounded-full hover:bg-slate-50 transition-colors cursor-pointer border-r border-slate-100">
                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">State</label>
                <select
                  className="bg-transparent outline-none text-slate-900 font-bold text-sm appearance-none cursor-pointer w-full truncate"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="">Where in India?</option>
                  {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              {/* City Input */}
              <div className="flex-1 flex flex-col px-6 py-3 rounded-full hover:bg-slate-50 transition-colors cursor-text border-r border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300 text-sm w-full"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            {/* Dates Section */}
            <div className="flex-1 flex flex-col px-6 py-3 rounded-full hover:bg-slate-50 transition-colors cursor-pointer mr-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Travel Dates</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="bg-transparent outline-none text-[11px] font-bold cursor-pointer w-full"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                />
                <span className="text-slate-300">-</span>
                <input
                  type="date"
                  className="bg-transparent outline-none text-[11px] font-bold cursor-pointer w-full"
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Action Button */}
            <button type="submit" className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all shadow-xl active:scale-95 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
          </form>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
              ))}
            </div>
            <p className="text-sm text-slate-400 font-medium">
              <span className="text-slate-900 font-bold">4.9/5</span> from 2k+ reviews
            </p>
          </div>
        </div>

        {/* Right: Visual Experience */}
        <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200"
              alt="Travel Destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Next Stop</p>
              <h3 className="text-4xl font-bold font-outfit">South Goa, India</h3>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 card !p-4 !rounded-3xl bg-white/90 backdrop-blur shadow-2xl animate-bounce-slow max-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                📍
              </div>
              <p className="text-xs font-bold">Trending Now</p>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-tight">120+ people are planning trips to Leh this week.</p>
          </div>

          <div className="absolute top-1/2 -left-12 card !p-4 !rounded-2xl bg-slate-900 text-white shadow-2xl -translate-y-1/2 hover:-translate-x-2 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                ✈️
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase">Booking</p>
                <p className="text-xs font-bold">Flight to Kochi Confirmed</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/40 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
