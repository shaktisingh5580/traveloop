import Head from "next/head";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head><title>Sign In | Traveloop</title></Head>
      <div className="min-h-screen flex bg-white">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="w-full max-w-sm mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 mb-12">
              <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="text-xl font-bold font-outfit tracking-tight text-slate-900">Traveloop</span>
            </Link>
            <h2 className="text-2xl font-bold font-outfit text-slate-900 mb-2">Welcome back</h2>
            <p className="text-sm text-slate-500 mb-8">Enter your details to access your dashboard.</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400">Forgot?</a>
                </div>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg px-4 py-2.5 transition-colors mt-2">Sign In</button>
            </form>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              Don't have an account? <Link href="/signup" className="text-slate-900 font-medium hover:text-emerald-500 transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 bg-slate-50 border-l border-slate-200 items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[80px]" />
          <div className="z-10 max-w-md text-center">
            <div className="bg-white/80 backdrop-blur-md p-8 border border-white rounded-3xl shadow-xl text-left">
              <p className="text-slate-700 italic">"Traveloop completely changed how my friend group plans our annual trips. No more messy spreadsheets."</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
