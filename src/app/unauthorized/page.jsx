'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ChevronsLeft,  ArrowRightToSquare } from '@gravity-ui/icons';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0e111d] flex items-center justify-center relative overflow-hidden px-4">
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো ইফেক্টস */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* মেইন কন্টেন্ট কন্টেইনার */}
      <div className="max-w-md w-full bg-[#161b2e]/40 backdrop-blur-xl border border-slate-900/80 p-8 rounded-3xl shadow-2xl text-center space-y-8 relative z-10">
        
        {/* ৪০১ ডিজিটাল লক আইকন বা জ্যামিতিক আর্ট */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl rotate-45 border border-indigo-500/20 scale-95" />
          <div className="absolute inset-0 bg-[#161b2e] border border-slate-800 rounded-2xl rotate-12 transition-transform duration-500 hover:rotate-0" />
          
          {/* কিহোল / লক আর্ট গ্রাফিক্স */}
          <svg
            className="w-10 h-10 text-indigo-500 relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* টেক্সট মেসেজ এরিয়া */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Error 401
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight pt-2">
            Access Denied
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            You don`t have permission to view this page. Please sign in with an authorized account or return to safety.
          </p>
        </div>

        {/* অ্যাকশন বাটন গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-900/60">
          
          {/* হোম পেজ বাটন (Bordered / Secondary) */}
          <Link href="/" passHref className="w-full">
            <Button
              as="span"
              variant="bordered"
              className="w-full border-slate-800 text-slate-300 hover:bg-[#161b2e] hover:text-white rounded-xl font-medium h-12 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <ChevronsLeft size={16} /> Back to Home
            </Button>
          </Link>

          {/* সাইন ইন পেজ বাটন (Solid Indigo / Primary) */}
          <Link href="/auth/sign-in" passHref className="w-full">
            <Button
              as="span"
              className="w-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 rounded-xl h-12 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
            >
              Sign In <ArrowRightToSquare size={16} />
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}