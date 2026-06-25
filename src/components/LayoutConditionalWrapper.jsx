"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer";

export default function LayoutConditionalWrapper({ children }) {
  const pathname = usePathname();

  // 🚫 আমরা শুধুমাত্র সাইন-ইন এবং সাইন-আপ পেজে ন্যাভবার ও ফুটার হাইড করতে চাই
  // ড্যাশবোর্ড এখানে নেই, তাই ড্যাশবোর্ডে ন্যাভবার এবং ফুটার স্বয়ংক্রিয়ভাবে দেখাবে।
  const isAuthPage = 
    pathname.startsWith("/auth/sign-in") || 
    pathname.startsWith("/auth/sign-up"); 

  return (
    <>
      {/* অথেন্টিকেশন পেজ না হলে Navbar দেখাবে */}
      {!isAuthPage && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {/* অথেন্টিকেশন পেজ না হলে Footer দেখাবে */}
      {!isAuthPage && <Footer />}
    </>
  );
}