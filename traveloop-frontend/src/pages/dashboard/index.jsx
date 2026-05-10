import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { label: "Planned Trips", value: "12", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>, color: "bg-emerald-500" },
    { label: "Travel Buddies", value: "24", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: "bg-brand-500" },
    { label: "Cities Visited", value: "48", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V10"/><path d="M18 22V4"/><path d="M7 2H2v20"/><path d="M22 7h-5"/><path d="M22 11h-5"/><path d="M22 15h-5"/><path d="M2 14h5"/><path d="M2 10h5"/><path d="M2 18h5"/></svg>, color: "bg-blue-500" },
    { label: "Active Budget", value: "$4.2k", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, color: "bg-purple-500" },
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Traveloop</title>
      </Head>

      <div className="space-y-10 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-outfit text-slate-900">Welcome back, Pratham! 👋</h1>
          <p className="text-slate-500">Here's what's happening with your travel plans today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 font-outfit">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 font-outfit">Recent Trip Plans</h3>
              <Link href="/trips" className="text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">View All</Link>
            </div>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                       <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=200`} alt="Trip" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-slate-900">Tokyo Adventure</h4>
                       <p className="text-xs text-slate-400 font-medium">Oct 12 – Oct 24 • Japan</p>
                    </div>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-full">Planning</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 font-outfit">Active Travel Buddies</h3>
              <Link href="/dashboard/users" className="text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">Manage</Link>
            </div>
            <div className="flex flex-wrap gap-4">
               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <div key={i} className="group relative">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                 </div>
               ))}
               <button className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-brand-500 hover:text-brand-500 transition-all group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
               </button>
            </div>
            <div className="mt-8 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 You have <span className="text-slate-900 font-bold">3 pending requests</span> from buddies wanting to join your Euro Trip.
               </p>
               <button className="mt-4 w-full py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all">Review Requests</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
