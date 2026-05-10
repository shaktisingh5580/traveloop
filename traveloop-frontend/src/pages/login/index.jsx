import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    }
  };
  return (
    <>
      <Head><title>Sign In | Traveloop</title></Head>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="card max-w-md w-full bg-white !p-12">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-brand">
                <span className="text-white text-2xl font-bold font-outfit">T</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-slate-500">Sign in to continue your adventure.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="input-field" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-brand-500 hover:text-brand-600">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-brand w-full py-4 text-lg">Sign In</button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-brand-500 font-bold hover:text-brand-600">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
