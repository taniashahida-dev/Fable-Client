"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link } from "@heroui/react"; 
import { Eye, EyeOff } from "lucide-react";
import { GiBlackBook } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function SigninPage() {
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/"; 
  const router = useRouter();

  // UI States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
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
    <div className="flex min-h-screen bg-white font-sans">
      {/* --- Left Side: Banner (Identical to Signup) --- */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-[#7c5dfa] p-16 text-white relative overflow-hidden">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 z-10">
         <span className=" text-3xl font-bold"> <GiBlackBook /></span>
          <span className="text-4xl font-agbalumo font-bold tracking-tight">Fable</span>
        </div>

        {/* Catchphrase */}
        <div className="max-w-md z-10 mb-24">
          <h1 className="text-[44px] font-bold tracking-tight leading-tight mb-5 text-white">
            Welcome back to your stories.
          </h1>
          <p className="text-base text-purple-100/90 leading-relaxed max-w-95">
            Log in to pick up right where you left off, manage your shelf, or share your latest chapter.
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

      {/* --- Right Side: Signin Form --- */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 md:p-16 xl:p-20 bg-white">
        <div className="w-full max-w-115 flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
              Sign in to Fable
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Enter your details to access your dashboard.
            </p>
          </div>

          <form className="flex flex-col gap-5"
          onSubmit={handleSignin}>
            {/* Display Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
                {error}
              </div>
            )}

            {/* Email Address */}
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
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#4f46e5] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* Remember Me Option */}
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md border-gray-300 text-[#7c5dfa] focus:ring-[#7c5dfa] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Form Submission Actions Container */}
            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                radius="xl"
                className="w-full h-11 bg-[#7c5dfa] text-white font-bold text-sm hover:bg-[#694be2] shadow-sm shadow-purple-100 transition-colors duration-200"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Sign in
              </Button>

              {/* In-Line Divider Line */}
              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-gray-100" />
                <span className="absolute px-3 bg-white text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                  or
                </span>
              </div>

              {/* Custom Google Authentication Row */}
              <Button
              onClick={handleGoogleSignIn}
                             type="submit"
                             variant="bordered"
                             radius="xl"
                            className="w-full h-11 bg-white border items-center border-[#f59e0b] text-slate-800 font-bold hover:bg-[#f59e0b] transition-colors duration-200"
          >
                             <span >
                                 <FcGoogle/>
                               </span>
                             Continue with Google
                           </Button>
            </div>
          </form>

          {/* Navigation Option Footer */}
          <div className="text-center text-sm font-medium text-slate-500">
            Do not have an account yet?{" "}
            <Link
              href={`/auth/sign-up?redirect=${redirectTo}`}
              className="font-bold text-[#4f46e5] text-sm hover:underline transition-all ml-0.5"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}