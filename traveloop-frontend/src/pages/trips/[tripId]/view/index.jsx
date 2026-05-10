import Head from "next/head";
import { useRouter } from "next/router";
import { MOCK_DATA } from "@/data/mockData";

export default function TripView() {
  const router = useRouter();
  const { tripId } = router.query;
  const itinerary = MOCK_DATA.itinerary;

  return (
    <>
      <Head><title>Tokyo Express | Traveloop</title></Head>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Itinerary Timeline */}
        <div className="flex-1 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tokyo Express</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <span>🇯🇵</span> Tokyo, Japan • Oct 12 – Oct 24
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </button>
              <button className="btn-brand !px-4 !py-2.5 text-sm">Add Activity</button>
            </div>
          </div>

          <div className="space-y-12">
            {itinerary.map((day) => (
              <div key={day.day} className="relative">
                <div className="flex items-center gap-4 mb-6 sticky top-28 bg-white/80 backdrop-blur-sm z-10 py-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold font-outfit shadow-lg">
                    D{day.day}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{day.date}</h3>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-slate-100 pl-10 space-y-6">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="relative group">
                      <div className="absolute -left-[51px] top-4 w-5 h-5 rounded-full border-4 border-white bg-slate-200 group-hover:bg-brand-500 group-hover:scale-125 transition-all" />
                      <div className="card !p-5 flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl">
                          {activity.type === 'food' ? '🍜' : activity.type === 'transport' ? '✈️' : activity.type === 'stay' ? '🏨' : '⛩️'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-slate-900">{activity.title}</h4>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1">📍 {activity.location}</span>
                            <span>•</span>
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary & Stats */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="card">
            <h3 className="text-lg font-bold mb-6">Trip Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-500">Activities</span>
                <span className="text-lg font-bold text-slate-900">24</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-500">Total Budget</span>
                <span className="text-lg font-bold text-slate-900">$2,450</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-brand-100">
                <span className="text-sm font-bold text-brand-600">Spent so far</span>
                <span className="text-lg font-bold text-brand-600">$1,200</span>
              </div>
            </div>
            <button className="btn-primary w-full mt-6">Manage Budget</button>
          </div>

          <div className="card !p-0 overflow-hidden relative aspect-square bg-slate-100 flex items-center justify-center">
             <div className="text-4xl grayscale opacity-30">🗺️ MAP VIEW</div>
             <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
               <p className="text-sm font-bold text-slate-900">Next activity in 2h</p>
               <p className="text-xs text-slate-500">Shinjuku Gyoen National Garden</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
