import Head from "next/head";
import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const success = await signup({
      full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: formData.password,
      phone: formData.phone || undefined,
    });
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      setError("Registration failed. Email may already be in use.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const popularCountries = [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "Germany", "France", "Japan", "Singapore", "UAE",
    "Thailand", "Indonesia", "Italy", "Spain", "Netherlands"
  ];

  return (
    <>
      <Head><title>Create Account | Traveloop</title></Head>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="card max-w-2xl w-full bg-white !p-10 md:!p-12">
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              onClick={handleAvatarClick}
              className="group relative w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-brand-500 hover:bg-emerald-50 transition-all duration-300 mb-4"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-brand-500 transition-colors">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-brand-500 transition-colors">Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </button>

            <Link href="/" className="mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
                <span className="text-white text-lg font-bold font-outfit">T</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold mb-1">Join Traveloop</h1>
            <p className="text-slate-500 text-sm">Plan your next adventure with the community.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="John"
                className="input-field"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                className="input-field"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">City</label>
              <input
                name="city"
                type="text"
                placeholder="Mumbai"
                className="input-field"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Country</label>
              <select
                name="country"
                className="input-field appearance-none"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select country</option>
                {popularCountries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Additional Information</label>
              <textarea
                name="additionalInfo"
                placeholder="Tell us about yourself — favorite travel style, dream destinations, travel experience..."
                className="input-field !min-h-[100px] resize-none"
                rows={4}
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 px-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 btn-brand py-4 text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
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
