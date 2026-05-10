import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateTrip() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd call the API here.
    // For now, we'll just redirect to a mock trip view page.
    router.push("/trips/1");
  };

  return (
    <>
      <Head><title>New Trip | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-outfit text-slate-900 tracking-tight">New Trip</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">Map out your next destination and share it with friends.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-[2.5rem] p-10 space-y-8 shadow-2xl shadow-slate-200/40">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 px-1 uppercase tracking-wider">Trip Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Summer in Santorini" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg font-medium"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 px-1 uppercase tracking-wider">Destination</label>
              <div className="relative">
                <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <input 
                  type="text" 
                  required
                  placeholder="Where are you going?" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg font-medium"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3 px-1 uppercase tracking-wider">Start Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg font-medium"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3 px-1 uppercase tracking-wider">End Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg font-medium"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 px-1 uppercase tracking-wider">Description</label>
              <textarea 
                rows="4"
                placeholder="What's the plan? (Optional)" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg font-medium resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100 flex items-center justify-between gap-6">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-8 py-5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 w-full sm:max-w-xs bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-2xl px-6 md:px-10 py-4 md:py-5 transition-all shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/20 active:scale-[0.98] text-sm md:text-lg uppercase tracking-widest"
            >
              Create Itinerary
            </button>
          </div>
        </form>

        {/* Suggestion Section from Wireframe */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-outfit text-slate-900">Suggested Itineraries</h2>
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="group cursor-pointer bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl transition-all">
                <div className="aspect-video bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Popular</p>
                    <p className="font-bold">European Highlights</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=curator${i}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">Curated by Traveloop</p>
                  </div>
                  <button className="text-emerald-600 font-bold text-sm">Clone</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
