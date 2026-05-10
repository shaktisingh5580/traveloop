import Head from "next/head";
import { useRouter } from "next/router";

export default function EditTrip() {
  const router = useRouter();
  const { tripId } = router.query;

  return (
    <>
      <Head><title>Edit Trip | Traveloop</title></Head>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900 mb-2">Edit Itinerary</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold text-slate-800 mb-2">Trip Name</label>
                 <input type="text" defaultValue="Tokyo Express" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900" />
              </div>
           </div>
           <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold">Save Changes</button>
           </div>
        </div>
      </div>
    </>
  );
}
