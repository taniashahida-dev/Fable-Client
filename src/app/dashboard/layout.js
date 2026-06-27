import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import React from "react";

const DashboardLayOut = ({ children }) => {
  return (
  
   <div
  style={{ "--sidebar-width": "16rem" }}
  className="flex min-h-screen w-full"
>
      
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 relative lg:ml-64">
        
    
    
      <main className="flex-1 w-full overflow-x-hidden p-4 md:p-6 lg:p-8 mt-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayOut;