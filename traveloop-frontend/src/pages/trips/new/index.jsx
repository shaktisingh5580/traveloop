import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

export default function CreateTrip() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    cityId: null,
    startDate: "",
    endDate: "",
    description: "",
    total_budget: "",
  });

  // Fetch popular cities for suggestions
  useEffect(() => {
    api.get("/cities/popular").then(res => setCities(res || [])).catch(() => {});
  }, []);

  // Fetch activities when a city is selected
  useEffect(() => {
    if (formData.cityId) {
      api.get(`/cities/${formData.cityId}/activities`)
        .then(res => setActivities(res || []))
        .catch(() => setActivities([]));
    }
  }, [formData.cityId]);

  // Search cities
  useEffect(() => {
    if (searchCity.length >= 2) {
      api.get(`/cities/search?q=${encodeURIComponent(searchCity)}`)
        .then(res => setCities(res || []))
        .catch(() => {});
    }
  }, [searchCity]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectCity = (city) => {
    setFormData({ ...formData, place: city.name, cityId: city.id });
    setSearchCity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate || !formData.endDate) return;

    setLoading(true);
    try {
      const trip = await api.post("/trips/", {
        name: formData.name,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        total_budget: formData.total_budget ? parseFloat(formData.total_budget) : null,
      });
      // If a city was selected, add it as the first stop
      if (formData.cityId && trip?.id) {
        await api.post(`/trips/${trip.id}/stops`, {
          city_id: formData.cityId,
          arrival_date: formData.startDate,
          departure_date: formData.endDate,
          sort_order: 0,
        }).catch(() => {});
      }
      router.push(`/trips/${trip.id}/edit`);
    } catch (err) {
      console.error("Failed to create trip:", err);
      alert("Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
=======
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
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
  };

  return (
    <>
<<<<<<< HEAD
      <Head><title>Create Trip | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Plan a new trip</h1>
          <p className="text-slate-500">Set up your travel plan and we'll help you build the perfect itinerary.</p>
        </div>

        {/* Trip Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          {/* Trip Name */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Trip Name</label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Goa Beach Getaway 2026"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Select a Place */}
          <div className="relative">
            <label className="block text-sm font-bold text-slate-800 mb-2">Select a Place</label>
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
              value={formData.place || searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
                setFormData({ ...formData, place: "", cityId: null });
              }}
            />
            {/* City dropdown */}
            {searchCity.length >= 1 && !formData.cityId && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                {cities.filter(c => c.name?.toLowerCase().includes(searchCity.toLowerCase())).slice(0, 6).map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    className="w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                    onClick={() => selectCity(city)}
                  >
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{city.name}</p>
                      <p className="text-xs text-slate-500">{city.country_name || ""}</p>
                    </div>
                  </button>
                ))}
                {cities.filter(c => c.name?.toLowerCase().includes(searchCity.toLowerCase())).length === 0 && (
                  <p className="px-5 py-4 text-sm text-slate-400 text-center">No cities found</p>
                )}
              </div>
            )}
            {formData.place && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                📍 {formData.place}
                <button type="button" onClick={() => setFormData({ ...formData, place: "", cityId: null })} className="hover:text-red-500">✕</button>
              </div>
            )}
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Start Date</label>
              <input
                name="startDate"
                type="date"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">End Date</label>
              <input
                name="endDate"
                type="date"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
=======
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
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
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

<<<<<<< HEAD
          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Description (optional)</label>
            <textarea
              name="description"
              rows={3}
              placeholder="What's this trip about?"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Total Budget (optional)</label>
            <input
              name="total_budget"
              type="number"
              placeholder="₹ 50,000"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
              value={formData.total_budget}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Cancel</Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl px-8 py-4 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creating...
                </>
              ) : "Create Trip"}
=======
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
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
            </button>
          </div>
        </form>

<<<<<<< HEAD
        {/* Suggestion for Places to Visit / Activities */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-lg font-bold text-slate-900 font-outfit">
              {formData.place ? `Things to do in ${formData.place}` : "Suggestion for Places to Visit / Activities to perform"}
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(activities.length > 0 ? activities : cities).slice(0, 8).map((item, i) => (
              <div
                key={item.id || i}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {(item.image_url) ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <span className="text-3xl">{item.activity_type === "food_tour" ? "🍽️" : item.activity_type === "adventure" ? "🏔️" : item.activity_type === "sightseeing" ? "🏛️" : "📍"}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xs font-bold text-white truncate">{item.name}</h3>
                  {item.estimated_cost && (
                    <p className="text-[10px] text-white/70 mt-0.5">₹{item.estimated_cost}</p>
                  )}
                  {item.duration_hours && (
                    <p className="text-[10px] text-white/70">{item.duration_hours}h</p>
                  )}
                </div>
              </div>
            ))}
            {activities.length === 0 && cities.length === 0 && (
              Array(8).fill(null).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                </div>
              ))
            )}
=======
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
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">Curated by Traveloop</p>
                  </div>
                  <button className="text-emerald-600 font-bold text-sm">Clone</button>
                </div>
              </div>
            ))}
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
          </div>
        </div>
      </div>
    </>
  );
}
