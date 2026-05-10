import Head from "next/head";

export default function TripNotes() {
  return (
    <>
      <Head><title>Trip Notes | Traveloop</title></Head>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Trip Journal & Notes</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <p className="text-slate-500">Capture your memories.</p>
        </div>
      </div>
    </>
  );
}
