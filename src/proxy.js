// src/proxy.js অথবা src/proxy.ts
import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // ১. ইন্টারনাল ফাইল এবং এক্সপ্রেস ব্যাকএন্ডের এপিআই রুটগুলোকে বাইপাস করা
  if (
    pathname.startsWith("/api/") || 
    pathname.startsWith("/_next/") || 
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    // 🚀 ২. বডি লিক বন্ধ করার জন্য সম্পূর্ণ ফ্রেশ একটি হেডার তৈরি করা
    const cleanHeaders = new Headers();
    cleanHeaders.set("Accept", "application/json");
    
    // মেইন রিকোয়েস্ট থেকে শুধুমাত্র কুকি টুকু তুলে নতুন ক্লিন হেডারে বসানো
    const cookie = request.headers.get("cookie");
    if (cookie) {
      cleanHeaders.set("cookie", cookie);
    }

    // ৩. ক্লিন হেডার নিয়ে Better-Auth কল করা
    const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      method: "GET", // মেথড নির্দিষ্ট থাকবে
      headers: cleanHeaders, // 👈 খবরদার! request.headers সরাসরি পাস না করে cleanHeaders পাস করুন
      // এটি করার ফলে ইবুকের POST body ডেটা আর এর ভেতরে ঢুকতে পারবে না
    });

    if (!sessionRes.ok) {
      return NextResponse.next();
    }

    const session = await sessionRes.json();
    const user = session?.user;

    // ৪. রাউট প্রোটেকশন লজিক
    if (pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // ৫. রোল ভেরিফিকেশন (এডমিন/রাইটার চেক)
    if (pathname.startsWith("/dashboard/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/writer") && user?.role !== "writer") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  } catch (error) {
    console.error("Proxy fetch error bypassed:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};