import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    });
    if (success) {
      router.push("/dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head><title>Create Account | Traveloop</title></Head>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="card max-w-xl w-full bg-white !p-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <Link href="/" className="mb-8">
              <div className="w-auto h-12 flex items-center justify-center">
                <img src="/logo.png" alt="Traveloop Logo" className="w-auto h-full object-contain" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Registration</h1>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">First Name</label>
              <input 
                name="firstName"
                type="text" 
                placeholder="First Name" 
                className="input-field" 
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Last Name</label>
              <input 
                name="lastName"
                type="text" 
                placeholder="Last Name" 
                className="input-field" 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                placeholder="Email Address" 
                className="input-field" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Date of birth</label>
              <input 
                name="dob"
                type="date" 
                className="input-field" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">City</label>
              <input 
                name="city"
                type="text" 
                placeholder="City" 
                className="input-field" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Country</label>
              <input 
                name="country"
                type="text" 
                placeholder="Country" 
                className="input-field" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Password</label>
              <input 
                name="password"
                type="password" 
                placeholder="Password" 
                className="input-field" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="md:col-span-2 text-center my-2">
              <button type="button" className="text-sm font-bold text-slate-500 hover:text-brand-500">
                + Add more details...
              </button>
            </div>

            <button type="submit" className="md:col-span-2 btn-brand py-4 text-lg mt-2">Register</button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-500 font-bold hover:text-brand-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
