import { Geist, Geist_Mono, Agbalumo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutConditionalWrapper from "@/components/LayoutConditionalWrapper"; // নতুন হেল্পার কম্পোনেন্ট

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const agbalumo = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Fable - Online Bookstore",
  description: "Every story finds its reader here.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${agbalumo.variable} h-full antialiased`} 
    >
      <body className="flex flex-col min-h-screen">
        {/* কন্ডিশনাল র‍্যাপারের মাধ্যমে Navbar এবং Footer হ্যান্ডেল করা হচ্ছে */}
        <LayoutConditionalWrapper>
          {children}
        </LayoutConditionalWrapper>
        
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}