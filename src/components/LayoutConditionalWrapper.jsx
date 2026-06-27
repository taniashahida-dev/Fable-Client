"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer";

export default function LayoutConditionalWrapper({ children }) {
  const pathname = usePathname();

 
  const isAuthPage = 
    pathname.startsWith("/auth/sign-in") || 
    pathname.startsWith("/auth/sign-up"); 
    const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      
     {!isAuthPage  && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>
      
   
     {!isAuthPage && !isDashboard && <Footer />}
    </>
  );
}