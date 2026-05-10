import BaseModal from "@/modals/BaseModal";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function AuthModals() {
  const { isLoginModalOpen, isSignupModalOpen, closeModals, openLogin, openSignup, login, signup } = useAuth();
  const router = useRouter();

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    city: "",
    country: ""
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      closeModals();
      router.push("/dashboard");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const success = await signup({
      name: `${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      password: signupData.password
    });
    if (success) {
      closeModals();
      router.push("/dashboard");
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Login Modal */}
      <BaseModal isOpen={isLoginModalOpen} onClose={closeModals} title="Welcome back">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-auto min-w-[200px] flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Traveloop Logo" className="h-full w-auto object-contain scale-[1.3]" />
          </div>
          <p className="text-slate-500 text-sm">Sign in to continue your adventure.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 px-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input-field"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-brand w-full py-3 text-base mt-4">Sign In</button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <button onClick={openSignup} className="text-brand-500 font-bold hover:text-brand-600">
              Create an account
            </button>
          </p>
        </div>
      </BaseModal>

      {/* Signup Modal */}
      <BaseModal isOpen={isSignupModalOpen} onClose={closeModals} title="Join Traveloop">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="h-16 w-auto min-w-[200px] flex items-center justify-center mb-2">
            <img src="/logo.png" alt="Traveloop Logo" className="h-full w-auto object-contain scale-[1.3]" />
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSignupSubmit}>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="input-field text-sm py-2"
              value={signupData.firstName}
              onChange={handleSignupChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="input-field text-sm py-2"
              value={signupData.lastName}
              onChange={handleSignupChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input-field text-sm py-2"
              value={signupData.email}
              onChange={handleSignupChange}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">Date of birth</label>
            <input
              name="dob"
              type="date"
              className="input-field text-sm py-2"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">City</label>
            <input
              name="city"
              type="text"
              placeholder="City"
              className="input-field text-sm py-2"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">Country</label>
            <input
              name="country"
              type="text"
              placeholder="Country"
              className="input-field text-sm py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1 px-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-field text-sm py-2"
              value={signupData.password}
              onChange={handleSignupChange}
            />
          </div>

          <div className="md:col-span-2 text-center my-1">
            <button type="button" className="text-xs font-bold text-slate-500 hover:text-brand-500">
              + Add more details...
            </button>
          </div>

          <button type="submit" className="md:col-span-2 btn-brand py-3 text-base mt-2">Register</button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <button onClick={openLogin} className="text-brand-500 font-bold hover:text-brand-600">
              Sign in
            </button>
          </p>
        </div>
      </BaseModal>
    </>
  );
}
