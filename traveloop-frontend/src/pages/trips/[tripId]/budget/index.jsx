import Head from "next/head";

export default function TripBudget() {
  return (
    <>
      <Head><title>Budget | Traveloop</title></Head>
      <div className="space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Trip Budget</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <p className="text-2xl font-bold text-slate-900">$2,400.00 Spent</p>
        </div>
      </div>
    </>
  );
}
