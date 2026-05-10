import Head from "next/head";

export default function PublicTripView() {
  return (
    <>
      <Head><title>Trip Itinerary | Traveloop</title></Head>
      <div className="min-h-screen bg-slate-50 p-8">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Shared Trip Itinerary</h1>
      </div>
    </>
  );
}
