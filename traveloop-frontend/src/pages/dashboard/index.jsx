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

      <div className="space-y-12 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-outfit text-slate-900 tracking-tight">Welcome back, Pratham! 👋</h1>
          <p className="text-lg text-slate-500 font-medium">Your travel world at a glance. Let's plan something epic.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 hover:shadow-emerald-500/10 hover:border-emerald-100 transition-all group cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl ${stat.color === 'bg-brand-500' ? 'bg-emerald-500' : stat.color} flex items-center justify-center text-white mb-6 shadow-xl shadow-slate-900/10 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-4xl font-bold text-slate-900 font-outfit">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-900 font-outfit">Upcoming Trips</h3>
              <Link href="/trips" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">View All</Link>
            </div>
            <div className="space-y-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center gap-6 p-5 rounded-[2rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-md">
                       <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=300&q=80`} alt="Trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-slate-900 text-lg">Parisian Summer</h4>
                       <p className="text-sm text-slate-400 font-medium mt-1">June 12 – June 28 • France</p>
                    </div>
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-full">Planning</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-slate-900 font-outfit">Travel Buddies</h3>
              <Link href="/dashboard/users" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">Manage</Link>
            </div>
            <div className="flex flex-wrap gap-5">
               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <div key={i} className="group relative">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-slate-100 border-2 border-white shadow-xl overflow-hidden group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                       <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                 </div>
               ))}
               <button className="w-16 h-16 rounded-[1.25rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-all group bg-slate-50/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
               </button>
            </div>
            <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <p className="text-base text-white/80 font-medium leading-relaxed relative z-10">
                 You have <span className="text-emerald-400 font-bold">3 pending requests</span> from travelers wanting to join your workspace.
               </p>
               <button className="mt-6 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 relative z-10">Review Requests</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
