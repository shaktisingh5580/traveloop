import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head><title>Profile | Traveloop</title></Head>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Account Settings</h1>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <p className="text-slate-500">Manage your profile.</p>
        </div>
      </div>
    </>
  );
}
