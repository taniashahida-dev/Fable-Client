import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import React from "react";

const DashboardLayOut = ({ children }) => {
  return (
    // এই লেআউটটি শুধু ড্যাশবোর্ডের ভেতরে ঢুকলে ন্যাভবারকে ১৬রেম ছোট করবে
    <div 
      style={{ '--sidebar-width': '16rem' }} 
      className="flex flex-col lg:flex-row min-h-screen bg-slate-50 w-full"
    >
      {/* ১. সাইডবার: এটি ডেক্সটপে একদম উপর থেকে শুরু হবে */}
      <DashboardSidebar />

      {/* ২. ডান পাশের মেইন এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* ন্যাভবারের সমান উচ্চতার (h-20) একটি ফাঁকা স্পেসার, যা কন্টেন্টকে ন্যাভবারের নিচে নামিয়ে রাখবে */}
        <div className="h-20 w-full shrink-0" />

        {/* ড্যাশবোর্ডের ভেতরের মেইন পেজ কন্টেন্ট */}
        <main className="flex-1 w-full overflow-x-hidden p-4 lg:p-8 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;