import Head from "next/head";

export default function ActivitySearch() {
  return (
    <>
      <Head><title>Explore Activities | Traveloop</title></Head>
      <div className="space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Find Activities</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <input type="text" placeholder="Search activities..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4" />
        </div>
      </div>
    </>
  );
}
