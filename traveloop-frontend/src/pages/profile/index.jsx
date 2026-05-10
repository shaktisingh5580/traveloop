import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    language_pref: "en",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        phone: user.phone || "",
        language_pref: user.language_pref || "en",
      });
      setAvatarPreview(user.avatar_url);
    }
  }, [user]);

  useEffect(() => {
    api.get("/trips/").then(res => setTrips(res || [])).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/users/me", formData);
      setEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
    // Upload to backend
    const fd = new FormData();
    fd.append("file", file);
    try {
      await api.upload("/users/me/avatar", fd);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  const preplannedTrips = trips.filter(t => t.status === "planned" || t.status === "draft");
  const previousTrips = trips.filter(t => t.status === "completed");

  const statusColor = (status) => ({
    draft: "bg-slate-100 text-slate-600",
    planned: "bg-blue-50 text-blue-600",
    ongoing: "bg-emerald-50 text-emerald-600",
    completed: "bg-purple-50 text-purple-600",
  }[status] || "bg-slate-100 text-slate-600");

  const TripGrid = ({ title, list }) => (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-bold text-slate-900 font-outfit">{title}</h2>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {list.slice(0, 3).map((trip, i) => (
            <div key={trip.id || i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                {trip.cover_image_url ? (
                  <img src={trip.cover_image_url} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full ${statusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 truncate mb-1">{trip.name}</h3>
                <p className="text-xs text-slate-400">{trip.start_date} → {trip.end_date}</p>
                <Link
                  href={`/trips/${trip.id}/view`}
                  className="mt-3 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-brand-600 transition-all"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 bg-slate-50 rounded-2xl p-6 text-center">No trips here yet.</p>
      )}
    </div>
  );
=======
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac

  return (
    <>
      <Head><title>Profile | Traveloop</title></Head>
<<<<<<< HEAD
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* User Info Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center hover:border-brand-500 transition-colors"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span className="text-[9px] text-slate-400 font-bold">Image of User</span>
                  </div>
                )}
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">{user?.full_name || "User"}</h2>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-brand-500 text-white text-xs font-bold rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50">
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditing(false)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                    <input name="full_name" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={formData.full_name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
                    <input type="email" disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed" value={user?.email || ""} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Language</label>
                    <select name="language_pref" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500" value={formData.language_pref} onChange={handleChange}>
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-bold text-slate-800">Email:</span> {user?.email}</p>
                  <p><span className="font-bold text-slate-800">Phone:</span> {user?.phone || "Not set"}</p>
                  <p><span className="font-bold text-slate-800">Language:</span> {user?.language_pref || "English"}</p>
                  <p><span className="font-bold text-slate-800">Member since:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preplanned Trips */}
        <TripGrid title="Preplanned Trips" list={preplannedTrips} />

        {/* Previous Trips */}
        <TripGrid title="Previous Trips" list={previousTrips} />

        {/* Danger Zone */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sign Out</h3>
              <p className="text-xs text-slate-500 mt-1">Sign out of your Traveloop account.</p>
            </div>
            <button onClick={logout} className="px-5 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors">
              Logout
            </button>
=======
      <div className="max-w-6xl mx-auto py-12">
        {/* Profile Header Card */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-12 mb-16 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform group-hover:scale-110 duration-700" />
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden ring-1 ring-slate-100">
                <img src={user?.avatar || "https://i.pravatar.cc/150?img=11"} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:bg-emerald-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight">{user?.name || "Traveler"}</h1>
              <p className="text-slate-500 text-lg mt-2 font-medium">{user?.email || "traveler@example.com"}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <div className="bg-emerald-50 border border-emerald-100 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-bold text-emerald-700 uppercase tracking-widest">{user?.plan || "Pro"} Account</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                   <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">Joined May 2026</span>
                </div>
              </div>
            </div>
            <button className="bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-2xl px-10 py-5 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] uppercase tracking-widest text-sm">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Trips Sections */}
        <div className="space-y-20">
          {/* Explored Trips Section */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold font-outfit text-slate-900">Explored Trips</h2>
                <p className="text-slate-400 font-medium mt-1">Trips you've successfully completed.</p>
              </div>
              <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">See All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="group cursor-pointer bg-white border border-slate-100 rounded-[2.5rem] p-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] mb-6 overflow-hidden relative">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`} alt="Trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Completed</p>
                      <p className="text-xl font-bold font-outfit">Paris Escape {i}</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span className="text-sm font-bold text-slate-500 tracking-tight">12 Days</span>
                     </div>
                     <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Trips Section */}
          <div className="pt-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold font-outfit text-slate-900">Previous Trips</h2>
                <p className="text-slate-400 font-medium mt-1">Your history of planned adventures.</p>
              </div>
              <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">See All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {[4, 5].map(i => (
                <div key={i} className="group cursor-pointer bg-white border border-slate-100 rounded-[2.5rem] p-4 hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] mb-6 overflow-hidden relative">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`} alt="Trip" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-lg font-bold text-slate-800 font-outfit">Bali Retreat {i-3}</p>
                    <p className="text-sm text-slate-400 font-medium mt-1">Oct 2025 • 8 Members</p>
                  </div>
                </div>
              ))}
            </div>
>>>>>>> dd1cdb9e1bffd1773a60055a1c9a10ad4038c1ac
          </div>
        </div>
      </div>
    </>
  );
}
