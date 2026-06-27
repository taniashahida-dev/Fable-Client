"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link } from "@heroui/react"; 
import { Eye, EyeOff } from "lucide-react";
import { GiBlackBook } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

function SigninFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/"; 
  const router = useRouter();

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
 
  <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-white to-violet-50 font-sans">
      
      {/* --- Left Side: Banner --- */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-linear-to-br
from-violet-700
via-indigo-700
to-slate-900 p-16 text-white relative overflow-hidden">

  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
</div>
        <div className="flex items-center gap-3 z-10">
          <span className="text-3xl font-bold"><GiBlackBook /></span>
          <span className="text-5xl font-agbalumo  font-bold tracking-tight">Fable</span>
        </div>

        <div className="max-w-md z-10 my-auto py-12">
          <h1 className="text-5xl
leading-tight font-bold tracking-tight  mb-5 text-white">
            Welcome back to your stories.
          </h1>
          <p className="text-lg
leading-8 text-purple-100/90 max-w-sm">
            Log in to pick up right where you left off, manage your shelf, or share your latest chapter.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] z-10 pointer-events-none">
          <Image
            src="/image/book.png"
            alt="Stacked books illustration"
            fill
            priority
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* --- Right Side: Signin Form --- */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-10 md:p-14">
       <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,.08)] p-8 md:p-10 flex flex-col gap-6">
         <div className="lg:hidden flex justify-center mb-2">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg">
      <GiBlackBook className="text-2xl" />
    </div>

    <span className="text-3xl font-agbalumo text-slate-900">
      Fable
    </span>
  </div>
</div>
          <div className="space-y-1">
           <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Sign in to Fable
            </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
              Enter your details to access your dashboard.
            </p>
          </div>

          <form className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500" onSubmit={handleSignin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-sm font-medium border border-red-200">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email address</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:outline-none h-12 px-4 rounded-2xl text-sm text-slate-800 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#4f46e5] hover:underline">
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
                  className="w-full border border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 focus:outline-none h-12 pl-4 pr-10 rounded-2xl text-sm text-slate-800 transition-all"
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

            <div className="flex items-center justify-between py-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md border-gray-300 text-[#7c5dfa] focus:ring-violet-100 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                radius="xl"
               className="
w-full
h-12
rounded-2xl
bg-linear-to-r
from-violet-600
to-indigo-600
font-bold
text-white
shadow-lg
shadow-violet-300/40
hover:scale-[1.02]
hover:shadow-xl
transition-all
duration-300
"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Sign in
              </Button>

           <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute px-3 bg-white text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                  or
                </span>
              </div>
            </div>
          </form>

          <Button
            onClick={handleGoogleSignIn}
            variant="bordered"
            radius="xl"
            className="w-full h-12 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-slate-50 text-slate-700 font-semibold transition-all duration-300 gap-2">
            <FcGoogle className="text-lg"/>
            Continue with Google
          </Button>

          <div className="text-center text-sm font-medium text-slate-500">
            Do not have an account yet?{" "}
            <Link href={`/auth/sign-up?redirect=${redirectTo}`} className="font-bold text-[#4f46e5] text-sm hover:underline ml-0.5">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SigninPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-sm text-slate-400 animate-pulse">Loading auth template...</div>}>
      <SigninFormContent />
    </Suspense>
  );
}