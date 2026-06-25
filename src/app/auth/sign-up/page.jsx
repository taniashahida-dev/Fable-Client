"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link } from "@heroui/react"; 
import { Eye, EyeOff } from "lucide-react";
import { GiBlackBook } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { authClient, signIn } from "@/lib/auth-client";

function SignupFormContent() {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [role, setRole] = useState("reader"); 

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || '/'; 
  const router = useRouter();

  // UI States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

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

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signIn.social({
        provider: "google",
        redirectTo: redirectTo,
      });
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  return (
    /* pt-[65px] যোগ করা হয়েছে যাতে গ্লোবাল নেভিগেশন বারের নিচে কন্টেন্ট না ঢোকে */
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* --- Left Side: Banner --- */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-[#7c5dfa] p-16 text-white relative overflow-hidden">
        <div className="flex items-center gap-3 z-10">
          <span className="text-3xl font-bold"><GiBlackBook /></span>
          <span className="text-4xl font-agbalumo font-bold tracking-tight">Fable</span>
        </div>

        <div className="max-w-md z-10 my-auto py-12">
          <h1 className="text-[40px] font-bold tracking-tight leading-tight mb-5 text-white">
            Every story finds its reader here.
          </h1>
          <p className="text-base text-purple-100/90 leading-relaxed max-w-sm">
            Join thousands of readers and writers building an open library of original ebooks.
          </p>
        </div>

        <div className="absolute -bottom-10 -right-10 w-80 h-80 z-10">
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
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your account
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Start reading or publishing in minutes.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-200">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-200 hover:border-gray-300 focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa] focus:outline-none h-11 px-4 rounded-xl text-sm text-slate-800 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 hover:border-gray-300 focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa] focus:outline-none h-11 px-4 rounded-xl text-sm text-slate-800 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <div className="relative w-full">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 hover:border-gray-300 focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa] focus:outline-none h-11 pl-4 pr-10 rounded-xl text-sm text-slate-800 transition-all"
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

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 hover:border-gray-300 focus:border-[#7c5dfa] focus:ring-1 focus:ring-[#7c5dfa] focus:outline-none h-11 pl-4 pr-10 rounded-xl text-sm text-slate-800 transition-all"
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">I want to join as</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("reader")}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border transition-all duration-200
                    ${role === "reader" ? "bg-[#efeefd] border-[#7c5dfa] shadow-sm ring-1 ring-[#7c5dfa]" : "bg-white border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="w-5 h-5 rounded-md bg-[#6366f1] mb-2 shadow-sm" />
                  <span className="font-bold text-xs text-slate-900 block mb-0.5">Reader</span>
                  <span className="text-[11px] font-medium text-slate-400">Browse & purchase</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("writer")}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-xl border transition-all duration-200
                    ${role === "writer" ? "bg-[#fef7eb] border-[#f5a623] shadow-sm ring-1 ring-[#f5a623]" : "bg-white border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="w-5 h-5 rounded-md bg-[#f5a623] mb-2 shadow-sm" />
                  <span className="font-bold text-xs text-slate-900 block mb-0.5">Writer</span>
                  <span className="text-[11px] font-medium text-slate-400">Publish ebooks</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                radius="xl"
                className="w-full h-11 bg-[#7c5dfa] text-white font-bold hover:bg-[#694be2] shadow-md transition-all duration-200"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Create account
              </Button>

              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute px-3 bg-white text-[11px] text-gray-400 uppercase font-bold tracking-wider">or</span>
              </div>
            </div>
          </form>

          <Button
            onClick={handleGoogleSignIn}
            type="button"
            variant="bordered"
            radius="xl"
            className="w-full h-11 bg-white border border-gray-200 hover:border-gray-300 text-slate-700 font-semibold transition-all duration-200 gap-2"
          >
            <FcGoogle className="text-lg"/>
            Continue with Google
          </Button>

          <div className="text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link href={`/auth/sign-in?redirect=${redirectTo}`} className="font-bold text-[#4f46e5] text-sm hover:underline ml-0.5">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-sm text-slate-400 animate-pulse">Loading registration flow...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}