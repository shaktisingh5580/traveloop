import Head from "next/head";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Head><title>Create Account | Traveloop</title></Head>
      <div className="min-h-screen flex bg-white">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
          <div className="w-full max-w-sm mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 mb-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white text-sm font-bold font-outfit">T</span>
              </div>
              <span className="text-xl font-bold font-outfit tracking-tight text-slate-900">Traveloop</span>
            </Link>
            <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-1">Create your account</h2>
            <p className="text-sm text-slate-500 mb-8">Start planning your next adventure today.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">First name</label>
                  <input type="text" placeholder="John" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last name</label>
                  <input type="text" placeholder="Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <input type="password" placeholder="Min 8 characters" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all" />
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl px-4 py-3 transition-colors mt-2 shadow-md">Create Account</button>
            </form>
            <div className="mt-6 text-sm text-slate-500 text-center">
              Already have an account? <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
