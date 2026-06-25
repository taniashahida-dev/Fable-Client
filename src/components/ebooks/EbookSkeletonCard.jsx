"use client";

import { Card, Skeleton } from "@heroui/react";

export default function EbookSkeletonCard() {
 
  const animType = "shimmer"; 

  return (
    <Card className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden p-0 shadow-sm space-y-5" radius="lg">
      
      {/* Cover Image Skeleton */}
      <Skeleton animationType={animType} className="rounded-t-2xl">
        <div className="w-full aspect-3/4 bg-slate-200" />
      </Skeleton>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          <Skeleton animationType={animType} className="w-4/5 rounded-lg">
            <div className="h-4 bg-slate-200" />
          </Skeleton>
          <Skeleton animationType={animType} className="w-2/5 rounded-lg">
            <div className="h-3 bg-slate-200" />
          </Skeleton>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Skeleton animationType={animType} className="w-1/4 rounded-lg">
            <div className="h-5 bg-slate-200" />
          </Skeleton>
          <Skeleton animationType={animType} className="w-1/4 rounded-lg">
            <div className="h-4 bg-slate-200" />
          </Skeleton>
        </div>
      </div>
    </Card>
  );
}