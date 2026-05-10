import Head from "next/head";

export default function Community() {
  return (
    <>
      <Head><title>Community | Traveloop</title></Head>
      <div className="space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Community</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <p className="text-slate-500">Shared itineraries.</p>
        </div>
      </div>
    </>
  );
}
