import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/lib/api";

export default function BuildItinerary() {
  const router = useRouter();
  const { tripId } = router.query;
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // New section form
  const [newSection, setNewSection] = useState({
    cityId: null,
    cityName: "",
    description: "",
    arrivalDate: "",
    departureDate: "",
    budget: "",
    transport: "",
    accommodation: "",
  });

  // Load trip data
  useEffect(() => {
    if (!tripId) return;
    const fetchTrip = async () => {
      try {
        const tripData = await api.get(`/trips/${tripId}`);
        setTrip(tripData);
        // Fetch stops for this trip
        const stopsData = await api.get(`/trips/${tripId}/stops`).catch(() => []);
        setStops(stopsData || []);
      } catch (err) {
        console.error("Failed to load trip:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  // Search cities as user types
  useEffect(() => {
    if (searchCity.length >= 2) {
      api.get(`/cities/search?q=${encodeURIComponent(searchCity)}`)
        .then(res => setSearchResults(res || []))
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults([]);
    }
  }, [searchCity]);

  const selectCityForSection = (city) => {
    setNewSection({ ...newSection, cityId: city.id, cityName: city.name });
    setSearchCity("");
    setSearchResults([]);
  };

  const handleAddSection = async () => {
    if (!newSection.cityId || !newSection.arrivalDate || !newSection.departureDate) {
      alert("Please select a city and date range.");
      return;
    }
    setSaving(true);
    try {
      const stop = await api.post(`/trips/${tripId}/stops`, {
        city_id: newSection.cityId,
        arrival_date: newSection.arrivalDate,
        departure_date: newSection.departureDate,
        sort_order: stops.length,
        transport_mode: newSection.transport || null,
        transport_cost: 0,
        accommodation: newSection.accommodation || null,
        accommodation_cost: parseFloat(newSection.budget) || 0,
        notes: newSection.description || null,
      });
      setStops([...stops, stop]);
      setNewSection({ cityId: null, cityName: "", description: "", arrivalDate: "", departureDate: "", budget: "", transport: "", accommodation: "" });
      setShowAddSection(false);
    } catch (err) {
      console.error("Failed to add section:", err);
      alert("Failed to add section. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (stopId, index) => {
    if (!confirm("Remove this section?")) return;
    try {
      await api.del(`/trips/${tripId}/stops/${stopId}`);
      setStops(stops.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to delete section:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 mx-auto mb-4 text-brand-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-slate-500 font-medium">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head><title>Build Itinerary | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-outfit text-slate-900">Build Itinerary</h1>
            <p className="text-sm text-slate-500 mt-1">{trip?.name || "Your Trip"} · {stops.length} section{stops.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/trips/${tripId}/view`} className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all">
              Preview
            </Link>
            <Link href={`/trips/${tripId}/budget`} className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-300 transition-all">
              Budget
            </Link>
          </div>
        </div>

        {/* Sections (Stops) */}
        {stops.map((stop, index) => (
          <div
            key={stop.id || index}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Section {index + 1}: {stop.city?.name || stop.city_name || `Stop ${index + 1}`}
                </h3>
              </div>
              <button
                onClick={() => handleDeleteSection(stop.id, index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 p-2"
                title="Remove section"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
              </button>
            </div>

            {/* Section Body */}
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              {stop.notes || "All the necessary information about this section. This can be anything like travel section, hotel or any other activity."}
            </p>

            {/* Date Range & Budget */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
                <span className="font-bold text-slate-700">Date Range:</span>
                <span className="text-slate-600">{stop.arrival_date || "xxx"} to {stop.departure_date || "yyy"}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span className="font-bold text-slate-700">Budget:</span>
                <span className="text-slate-600">₹{stop.accommodation_cost || 0}</span>
              </div>
              {stop.transport_mode && (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium">
                  🚗 {stop.transport_mode}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Section Form */}
        {showAddSection && (
          <div className="bg-white border-2 border-dashed border-brand-300 rounded-3xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-900">New Section</h3>

            {/* City Search */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Select City</label>
              {newSection.cityName ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-sm font-bold text-emerald-700">📍 {newSection.cityName}</span>
                  <button type="button" onClick={() => setNewSection({ ...newSection, cityId: null, cityName: "" })} className="ml-auto text-emerald-600 hover:text-red-500 text-xs font-bold">Change</button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                      {searchResults.slice(0, 5).map(city => (
                        <button key={city.id} type="button" onClick={() => selectCityForSection(city)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium border-b border-slate-50 last:border-0">
                          📍 {city.name} {city.country_name ? `· ${city.country_name}` : ""}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
              <textarea
                rows={2}
                placeholder="What will you do here? Hotels, activities, etc."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none"
                value={newSection.description}
                onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Arrival Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={newSection.arrivalDate} onChange={(e) => setNewSection({ ...newSection, arrivalDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Departure Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={newSection.departureDate} onChange={(e) => setNewSection({ ...newSection, departureDate: e.target.value })} />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Budget for this section</label>
              <input type="number" placeholder="₹ 10,000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={newSection.budget} onChange={(e) => setNewSection({ ...newSection, budget: e.target.value })} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleAddSection} disabled={saving} className="flex-1 bg-brand-500 text-white font-bold py-3 rounded-xl hover:bg-brand-600 transition-all disabled:opacity-50">
                {saving ? "Saving..." : "Add Section"}
              </button>
              <button onClick={() => setShowAddSection(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Another Section Button */}
        {!showAddSection && (
          <button
            onClick={() => setShowAddSection(true)}
            className="w-full py-5 border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 font-bold hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/50 transition-all duration-300 flex items-center justify-center gap-2 text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Add another Section
          </button>
        )}
      </div>
    </>
  );
}
