import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, CircleInfo } from "@gravity-ui/icons";

export default function EditEbookFallbackPage() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white border-2 border-slate-200 p-8 rounded-2xl shadow-md text-center space-y-6">
        
        {/* Animated Top Icon Container */}
        <div className="mx-auto w-16 h-16 bg-[#6366F1]/10 text-[#6366F1] rounded-2xl flex items-center justify-center animate-bounce">
          <BookOpen size={28} className="stroke-[2.5]" />
        </div>

        {/* Guidance Header & Information */}
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-black text-[#0F172A] tracking-tight">
            No Ebook Selected
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Please select the ebook you wish to edit from your dashboard inventory manager first.
          </p>
        </div>

        {/* Alert Information Box */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-800 text-left">
          <CircleInfo size={18} className="shrink-0 text-amber-600" />
          <p className="text-xs font-semibold">
            To modify your work, navigate to `My Ebooks` and click the specific edit button on your target asset.
          </p>
        </div>

        {/* Action Redirection Button */}
        <div className="pt-2">
          <Link 
            href="/dashboard/writer/my-ebooks"
            className="w-full bg-[#0F172A] text-white font-bold hover:bg-black rounded-xl py-3 px-6 transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>Go to My Ebooks</span>
            <ArrowRight size={16} className="stroke-[2.5]" />
          </Link>
        </div>

      </div>
    </div>
  );
}