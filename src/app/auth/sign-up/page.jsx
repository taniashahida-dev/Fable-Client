"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link } from "@heroui/react"; 
import { Eye, EyeOff } from "lucide-react";
import { GiBlackBook } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmation state
  const [role, setRole] = useState("reader"); 

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || '/'; 
  const router = useRouter();

  // UI States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // Visibility state for confirmation
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation to ensure passwords match perfectly
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please recheck your input.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role: role
      });

      if (authError) {
        setError(authError.message || "Failed to create account.");
        return;
      }

      router.push(redirectTo);
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* --- Left Side: Banner --- */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-[#7c5dfa] p-16 text-white relative overflow-hidden">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 z-10">
          <span className="text-3xl font-bold"><GiBlackBook /></span>
          <span className="text-4xl font-agbalumo font-bold tracking-tight">Fable</span>
        </div>

        {/* Catchphrase */}
        <div className="max-w-md z-10 mb-24">
          <h1 className="text-[44px] font-bold tracking-tight leading-tight mb-5 text-white">
            Every story finds its reader here.
          </h1>
          <p className="text-base text-purple-100/90 leading-relaxed max-w-95">
            Join thousands of readers and writers building an open library of original ebooks.
          </p>
        </div>

        {/* Illustration Stacked Graphics */}
        <div className="absolute bottom-50 -right-10 w-95 h-85 z-10">
          <Image
            src="/image/book.png"
            alt="Stacked books illustration"
            fill
            priority
            className="object-contain object-bottom opacity-95"
          />
        </div>
      </div>

      {/* --- Right Side: Signup Form --- */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 md:p-16 xl:p-20 bg-white">
        <div className="w-full max-w-115 flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
              Create your account
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Start reading or publishing in minutes.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSignup}>
            {/* Display Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-800">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-200/80 hover:border-gray-300 focus:border-purple-500 focus:outline-none h-11 shadow-sm px-4 rounded-xl text-sm placeholder:text-gray-300 text-slate-800 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-800">Email address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200/80 hover:border-gray-300 focus:border-purple-500 focus:outline-none h-11 shadow-sm px-4 rounded-xl text-sm placeholder:text-gray-300 text-slate-800 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-800">Password</label>
              <div className="relative w-full">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200/80 hover:border-gray-300 focus:border-purple-500 focus:outline-none h-11 shadow-sm pl-4 pr-10 rounded-xl text-sm placeholder:text-gray-300 text-slate-800 transition-colors"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none text-neutral-400 hover:text-neutral-600 transition"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-800">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200/80 hover:border-gray-300 focus:border-purple-500 focus:outline-none h-11 shadow-sm pl-4 pr-10 rounded-xl text-sm placeholder:text-gray-300 text-slate-800 transition-colors"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none text-neutral-400 hover:text-neutral-600 transition"
                  type="button"
                  onClick={toggleConfirmVisibility}
                >
                  {isConfirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection Blocks */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">
                I want to join as
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Reader Card Option */}
                <button
                  type="button"
                  onClick={() => setRole("reader")}
                  className={`flex flex-col items-center justify-center text-center p-5 rounded-xl border transition-all duration-200
                    ${
                      role === "reader"
                        ? "bg-[#efeefd] border-[#7c5dfa]/60 shadow-sm"
                        : "bg-white border-gray-200/80 hover:border-gray-300"
                    }`}
                >
                  <div className="w-6 h-6 rounded-md bg-[#6366f1] mb-2.5 shadow-sm shadow-indigo-200" />
                  <span className="font-bold text-xs text-slate-900 block mb-0.5">
                    Reader
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    Browse & purchase
                  </span>
                </button>

                {/* Writer Card Option */}
                <button
                  type="button"
                  onClick={() => setRole("writer")}
                  className={`flex flex-col items-center justify-center text-center p-5 rounded-xl border transition-all duration-200
                    ${
                      role === "writer"
                        ? "bg-[#fef7eb] border-[#f5a623]/60 shadow-sm"
                        : "bg-white border-gray-200/80 hover:border-gray-300"
                    }`}
                >
                  <div className="w-6 h-6 rounded-md bg-[#f5a623] mb-2.5 shadow-sm shadow-amber-200" />
                  <span className="font-bold text-xs text-slate-900 block mb-0.5">
                    Writer
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    Publish ebooks
                  </span>
                </button>
              </div>
            </div>

            {/* Form Submission Actions Container */}
            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                radius="xl"
                className="w-full h-11 bg-[#7c5dfa] text-white font-bold hover:bg-[#694be2] shadow-sm shadow-purple-100 transition-colors duration-200"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Create account
              </Button>

              {/* In-Line Divider Line */}
              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-gray-100" />
                <span className="absolute px-3 bg-white text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                  or
                </span>
              </div>
            </div>
          </form>

          {/* Custom Google Authentication Row */}
          <Button
            type="button"
            variant="bordered"
            radius="xl"
            className="w-full h-11 bg-white border items-center border-gray-200 text-slate-800 font-bold hover:bg-gray-50 transition-colors duration-200"
          >
            <span>
              <FcGoogle/>
            </span>
            Continue with Google
          </Button>

          {/* Navigation Option Footer */}
          <div className="text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              href={`/auth/sign-in?redirect=${redirectTo}`}
              className="font-bold text-[#4f46e5] text-sm hover:underline transition-all ml-0.5"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}