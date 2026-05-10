import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Head><title>Profile | Traveloop</title></Head>
      <div className="max-w-6xl mx-auto py-12">
        {/* Profile Header Card */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-12 mb-16 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform group-hover:scale-110 duration-700" />
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden ring-1 ring-slate-100">
                <img src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || 'user')}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:bg-emerald-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 tracking-tight">{user?.full_name || user?.name || "Traveler"}</h1>
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
          </div>
        </div>
      </div>
    </>
  );
}
