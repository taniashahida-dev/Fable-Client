"use client";

import { Skeleton } from "@heroui/react";

export default function Loading() {
  const animType = "shimmer";

  return (
    <div className="py-12 mt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Side Skeleton */}
        <div className="flex flex-col space-y-5">
          <Skeleton animationType={animType} className="w-full aspect-3/4 rounded-lg bg-slate-200" />
          <Skeleton animationType={animType} className="w-full h-11 rounded-md bg-slate-200" />
          
          <div className="bg-slate-50/60 rounded-lg p-5 border border-slate-100 space-y-3">
            <Skeleton animationType={animType} className="w-1/3 h-3 rounded bg-slate-200" />
            <div className="flex items-center gap-3">
              <Skeleton animationType={animType} className="w-10 h-10 rounded-full bg-slate-200" />
              <div className="space-y-1.5 flex-1">
                <Skeleton animationType={animType} className="w-2/3 h-4 rounded bg-slate-200" />
                <Skeleton animationType={animType} className="w-1/2 h-3 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton animationType={animType} className="w-16 h-5 rounded bg-slate-200" />
              <Skeleton animationType={animType} className="w-16 h-5 rounded bg-slate-200" />
            </div>
            <Skeleton animationType={animType} className="w-3/4 h-10 rounded bg-slate-200" />
            <Skeleton animationType={animType} className="w-1/4 h-4 rounded bg-slate-200" />
            
            {/* Price Box Skeleton */}
            <div className="border border-slate-100 rounded-lg p-5 space-y-4 bg-slate-50/40">
              <Skeleton animationType={animType} className="w-24 h-8 rounded bg-slate-200" />
              <Skeleton animationType={animType} className="w-full h-11 rounded-md bg-slate-200" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 pt-2">
              <Skeleton animationType={animType} className="w-full h-4 rounded bg-slate-200" />
              <Skeleton animationType={animType} className="w-full h-4 rounded bg-slate-200" />
              <Skeleton animationType={animType} className="w-4/5 h-4 rounded bg-slate-200" />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-4">
            <Skeleton animationType={animType} className="w-full h-10 rounded bg-slate-200" />
            <Skeleton animationType={animType} className="w-full h-10 rounded bg-slate-200" />
          </div>
        </div>

      </div>
    </div>
  );
}