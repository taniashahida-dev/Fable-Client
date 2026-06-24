"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { GiBlackBook } from "react-icons/gi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-8">
        
      
        <div className="flex items-center gap-3 select-none">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
             <span className=" text-3xl font-bold"> <GiBlackBook /></span>
          </div>
          <span className="text-3xl font-agbalumo font-bold tracking-tight text-slate-900">Fable</span>
        </div>

      
        <div className="relative w-48 h-48 my-2 drop-shadow-[0_10px_25px_rgba(124,93,250,0.12)]">
        
          <div className="absolute inset-0 bg-[#f5a623] rounded-2xl -rotate-12 scale-90 translate-y-2 opacity-90" />
          <div className="absolute inset-0 bg-[#7c5dfa] rounded-2xl -rotate-6 scale-95 translate-x-1" />
          
        
          <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center p-4 rotate-[4deg]">
            <span className="text-6xl font-black text-[#f5a623] tracking-tighter select-none">
              404
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-sm font-medium max-w-85 mx-auto leading-relaxed">
            This story took an unscheduled trip off the shelf. Let`s;s get you back to the library.
          </p>
        </div>

       
        <div className="w-full space-y-3 pt-2">
        
          <Button
            type="button"
            radius="xl"
            onClick={() => router.push("/")}
            className="w-full h-11 bg-[#7c5dfa] text-white font-bold text-sm hover:bg-[#694be2] shadow-sm shadow-purple-100 transition-colors duration-200"
          >
            ← Back to Home
          </Button>

       
          <Button
            type="button"
            variant="bordered"
            radius="xl"
            onClick={() => router.push("/browse")}
            className="w-full h-11 bg-white border border-gray-200 text-slate-800 font-bold text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Browse Ebooks
          </Button>
        </div>

        <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase pt-4 select-none">
          Lost in the margins
        </div>

      </div>
    </div>
  );
}