import React from "react";
import { getUserSession } from "@/lib/core/session"; // 👈 আপনার প্রজেক্টের সেশন ইম্পোর্ট পাথটি নিশ্চিত করে নিবেন
import { Mail, User, Shield, Calendar, ShoppingBag, Bookmark } from "lucide-react";

export default async function ProfilePage() {
 
  const session = await getUserSession();
  
  const user = session?.user || session;

  if (!user || !user.email) {
    return (
      <div className="w-full text-center py-20 text-slate-500 font-medium">
        Please log in to view your profile.
      </div>
    );
  }

 
  const dateObj = new Date(user.createdAt);
  const formattedJoinedDate = !isNaN(dateObj) 
    ? dateObj.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).replace(" ", " '")
    : "N/A";

 
  const userInitials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="w-full pt-4 pb-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Page Main Heading */}
        <div className="border-b border-slate-200/60 pb-3">
          <h1 className="text-2xl font-serif font-bold text-[#0F172A] tracking-tight">
            Profile
          </h1>
        </div>

        {/* ================= TOP CARD: AVATAR & QUICK METRICS ================= */}
        <div className="bg-white border-2 border-[#64748B]/15 rounded-2xl p-8 flex flex-col items-center text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#F59E0B]" />

          {/* Initials Avatar Badge */}
          <div className="w-20 h-20 rounded-full border-2 border-[#F59E0B] bg-[#F8FAFC] flex items-center justify-center mb-4 shadow-3xs">
            <span className="font-serif font-bold text-2xl text-[#0F172A] tracking-wide">
              {userInitials}
            </span>
          </div>

          {/* User Display Name & Dynamic Role */}
          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-2xl text-[#0F172A] tracking-tight uppercase first-letter:capitalize">
              {user.name || "User"}
            </h2>
            <div className="inline-block bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-[#F59E0B]/20">
              {user.role || "reader"}
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-6" />

          {/* 3-Column Metrics Grid */}
          <div className="grid grid-cols-3 w-full max-w-sm mx-auto">
            <div className="text-center space-y-0.5 border-r border-slate-200/80">
              <p className="font-mono font-bold text-lg text-[#0F172A] flex items-center justify-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                0
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Purchased</p>
            </div>

            <div className="text-center space-y-0.5 border-r border-slate-200/80">
              <p className="font-mono font-bold text-lg text-[#F59E0B] flex items-center justify-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]/5 stroke-[2.5]" />
                0
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Bookmarked</p>
            </div>

            <div className="text-center space-y-0.5">
              <p className="font-serif font-bold text-sm pt-0.5 text-[#0F172A] flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                {formattedJoinedDate}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Joined</p>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CARD: FORM INFO STRUCTURAL LIST ================= */}
        <div className="bg-white border-2 border-[#64748B]/15 rounded-2xl overflow-hidden shadow-md">
          
          {/* Row 1: Email Row */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200/80 sm:px-6">
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400">
              <Mail className="w-4 h-4 text-slate-500" />
              Email address
            </div>
            <div className="text-sm font-medium text-[#0F172A] font-sans">
              {user.email}
            </div>
          </div>

          {/* Row 2: Name Row */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200/80 sm:px-6">
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400">
              <User className="w-4 h-4 text-slate-500" />
              Full name
            </div>
            <div className="text-sm font-serif font-bold text-[#0F172A] uppercase first-letter:capitalize">
              {user.name || "N/A"}
            </div>
          </div>

          {/* Row 3: Role Row */}
          <div className="flex items-center justify-between p-4 sm:px-6">
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400">
              <Shield className="w-4 h-4 text-slate-500" />
              Account role
            </div>
            <div>
              <span className="bg-[#0F172A]/5 text-[#0F172A] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md border border-[#0F172A]/10 uppercase">
                {user.role || "reader"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}