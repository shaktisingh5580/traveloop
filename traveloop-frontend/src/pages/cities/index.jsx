import Head from "next/head";

export default function CitySearch() {
  return (
    <>
      <Head><title>Search Cities | Traveloop</title></Head>
      <div className="space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Explore Cities</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <input type="text" placeholder="Search cities..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4" />
        </div>
      </div>
    </>
  );
}
