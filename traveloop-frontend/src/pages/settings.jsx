import Head from "next/head";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("Profile");

  const sections = ["Profile", "Security", "Notifications", "Billing"];

  return (
    <>
      <Head><title>Settings | Traveloop</title></Head>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold font-outfit text-slate-900 mb-10 tracking-tight">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-2">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                  activeSection === section 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/40">
              <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-8">{activeSection} Settings</h2>
              
              {activeSection === "Profile" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-lg">
                      <img src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || 'user')}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3">
                       <button className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 transition-all uppercase tracking-widest">Change Photo</button>
                       <p className="text-xs text-slate-400 font-medium">Recommended: Square JPG or PNG, 500x500px</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 px-1">Full Name</label>
                      <input type="text" defaultValue={user?.full_name || user?.name} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 px-1">Email Address</label>
                      <input type="email" defaultValue={user?.email} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all font-medium" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 px-1">Bio</label>
                      <textarea rows="4" placeholder="Tell the community about yourself..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all font-medium resize-none"></textarea>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl px-10 py-4 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-sm">Save Changes</button>
                  </div>
                </div>
              )}

              {activeSection === "Notifications" && (
                <div className="space-y-8">
                  {[
                    { t: "Email Notifications", d: "Receive updates about your trips and messages via email." },
                    { t: "Desktop Push", d: "Get real-time alerts when someone mentions you or invites you to a trip." },
                    { t: "Marketing Emails", d: "Weekly newsletters and travel inspiration directly to your inbox." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="max-w-md">
                        <p className="font-bold text-slate-900">{item.t}</p>
                        <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                      </div>
                      <button className={`w-12 h-6 rounded-full transition-all relative ${i === 2 ? "bg-slate-200" : "bg-emerald-500"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i === 2 ? "left-1" : "left-7"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "Billing" && (
                <div className="space-y-8">
                   <div className="bg-emerald-500 rounded-3xl p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div>
                         <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Current Plan</p>
                         <h3 className="text-3xl font-bold font-outfit">Traveloop Pro</h3>
                         <p className="text-white/80 mt-2 font-medium">Billed annually • Next payment: May 2027</p>
                      </div>
                      <button className="bg-white text-emerald-600 font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-emerald-600/10 uppercase tracking-widest text-xs">Manage Plan</button>
                   </div>
                   
                   <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-6">Payment Method</h3>
                      <div className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl bg-slate-50">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-slate-900 rounded-md flex items-center justify-center">
                               <div className="flex -space-x-2">
                                  <div className="w-4 h-4 rounded-full bg-red-500 opacity-80" />
                                  <div className="w-4 h-4 rounded-full bg-amber-500 opacity-80" />
                               </div>
                            </div>
                            <div>
                               <p className="font-bold text-slate-800 text-sm">Mastercard ending in 4242</p>
                               <p className="text-xs text-slate-400 font-medium">Expiry: 12/28</p>
                            </div>
                         </div>
                         <button className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Edit</button>
                      </div>
                   </div>
                </div>
              )}

              {activeSection === "Security" && (
                <div className="space-y-8 text-center py-10">
                   <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   </div>
                   <h3 className="text-xl font-bold font-outfit text-slate-900">Security & Privacy</h3>
                   <p className="text-slate-500 max-w-sm mx-auto">Update your password, manage two-factor authentication, and review active sessions.</p>
                   <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs mt-4">Change Password</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
