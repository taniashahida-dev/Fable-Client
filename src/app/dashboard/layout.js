import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import React from "react";

const DashboardLayOut = ({ children }) => {
  return (
    
    <div 
      style={{ '--sidebar-width': '16rem' }} 
      className="flex flex-col lg:flex-row min-h-screen  w-full"
    >
     
      <DashboardSidebar />

    
      <div className="flex-1 flex flex-col min-w-0 relative">
        
      
        <div className="h-20 w-full shrink-0" />

       
        <main className="flex-1 w-full overflow-x-hidden p-4 lg:p-8 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;