import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import React from "react";

const DashboardLayOut = ({ children }) => {
  return (
  
    <div 
      style={{ '--sidebar-width': '16rem' }} 
      className="flex flex-col lg:flex-row min-h-screen w-full pt-20 bg-slate-50"
    >
      
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* যদি প্রয়োজন হয় এই স্পেসারটি রাখতে পারেন, অথবা ডাবল স্পেসিং মনে হলে এটি কেটে দিতে পারেন */}
        {/* <div className="h-10 w-full shrink-0" /> */}

        <main className="flex-1 w-full overflow-x-hidden p-4 lg:p-8 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;