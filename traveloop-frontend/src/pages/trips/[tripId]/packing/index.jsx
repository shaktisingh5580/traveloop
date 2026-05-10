import Head from "next/head";

export default function PackingChecklist() {
  return (
    <>
      <Head><title>Packing Checklist | Traveloop</title></Head>
      <div className="max-w-3xl mx-auto space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Packing Checklist</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <p className="text-slate-500">Add items to your checklist.</p>
        </div>
      </div>
    </>
  );
}
