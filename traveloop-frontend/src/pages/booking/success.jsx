import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <>
      <Head><title>Booking Confirmed | Traveloop</title></Head>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
        <div className="max-w-xl w-full bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl shadow-slate-200/40 text-center relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          
          {/* Success Icon */}
          <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/10">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <h1 className="text-4xl font-bold font-outfit text-slate-900 tracking-tight mb-4">Booking Confirmed!</h1>
          <p className="text-slate-500 font-medium text-lg mb-12">Your adventure in Paris is officially on the calendar. We've sent a copy of your receipt to your email.</p>

          {/* Receipt Card */}
          <div className="bg-slate-50 rounded-3xl p-8 mb-12 text-left space-y-6">
             <div className="flex justify-between items-center pb-6 border-b border-slate-200/60">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Booking ID</p>
                   <p className="font-bold text-slate-900">#TRV-99420-EXP</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Paid</span>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between">
                   <span className="text-sm font-medium text-slate-500">Activity</span>
                   <span className="text-sm font-bold text-slate-900">Eiffel Tower Summit Access</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-sm font-medium text-slate-500">Date</span>
                   <span className="text-sm font-bold text-slate-900">June 15, 2026</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-sm font-medium text-slate-500">Travelers</span>
                   <span className="text-sm font-bold text-slate-900">2 Adults</span>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-200/60 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900 font-outfit">Total Paid</span>
                <span className="text-2xl font-bold text-emerald-600 font-outfit">$170.00</span>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Link href="/trips/1/view" className="w-full bg-slate-900 hover:bg-emerald-500 text-white font-bold rounded-2xl py-5 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                View Itinerary
             </Link>
             <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-2xl py-5 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
             </button>
          </div>

          <div className="mt-12">
             <button onClick={() => router.push("/")} className="text-sm font-bold text-slate-400 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Return to Home
             </button>
          </div>
        </div>
      </div>
    </>
  );
}
