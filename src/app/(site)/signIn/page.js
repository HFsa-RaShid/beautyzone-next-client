"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const SignInPage = () => {
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const result = await loginUser(email, password);
      if (result) {
        toast.success("Successfully logged In!");
        router.push("/"); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="bg-[#f5e9da] min-h-screen font-sans flex flex-col">

      <div className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center">
          <h2 className="text-4xl font-serif mb-2 text-black">Sign in to your account</h2>
          <p className="text-sm mb-10 text-gray-600">
            Or <Link href="/signUp" className="font-bold underline hover:text-gray-800">create a new account</Link>
          </p>
          
          <div className="bg-white p-10 shadow-sm rounded-sm text-left">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  Email address
                </label>
                <input 
                  name="email"
                  type="email" 
                  required
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  Password
                </label>
                <input 
                  name="password"
                  type="password" 
                  required
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition-colors"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black" /> 
                  Show password
                </label>
                <Link href="/" className="hover:underline">Forgot your password?</Link>
              </div>

              <button type="submit" className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all active:scale-95">
                Sign In
              </button>
            </form>
          </div>
          
          <p className="mt-8 text-[11px] text-gray-400 leading-relaxed">
            By signing in, you agree to our <span className="text-black font-bold border-b border-black">Terms of Service</span> and <span className="text-black font-bold border-b border-black">Privacy Policy</span>.
          </p>
        </div>
      </div>
      

    </div>
  );
};

export default SignInPage;