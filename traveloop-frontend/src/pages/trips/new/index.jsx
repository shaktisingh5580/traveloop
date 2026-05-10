import Head from "next/head";

export default function CreateTrip() {
  return (
    <>
      <Head><title>Create Trip | Traveloop</title></Head>
      <div className="max-w-2xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Create New Trip</h1>
          <p className="text-slate-500">Where are you heading next? Let's setup your workspace.</p>
        </div>
        <form className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Trip Name</label>
              <input type="text" placeholder="e.g. Euro Summer 2026" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Start Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">End Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button type="button" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Reset Form</button>
            <button type="button" className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl px-8 py-4 transition-all shadow-lg shadow-slate-900/10">Create Trip Workspace</button>
          </div>
        </form>
      </div>
    </>
  );
}
