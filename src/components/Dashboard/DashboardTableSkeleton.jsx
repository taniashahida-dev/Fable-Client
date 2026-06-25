"use client";

import { Table, Skeleton } from "@heroui/react";

export default function DashboardTableSkeleton({ columns = 5, rows = 5 }) {
  const animType = "shimmer";

  // রেন্ডারিংয়ের জন্য ফেক অ্যারে তৈরি
  const skeletonRows = Array.from({ length: rows });
  const skeletonCols = Array.from({ length: columns });

  return (
    <Table className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <Table.ScrollContainer>
        <Table.Content aria-label="Loading table data">
          
          {/* 📋 Table Header Skeleton */}
          <Table.Header className="bg-[#f8fafc] border-b border-slate-100">
            {skeletonCols.map((_, index) => (
              <Table.Column key={index} className="py-4 px-6 !bg-[#f8fafc]">
                <Skeleton animationType={animType} className="w-16 h-3 rounded bg-slate-200" />
              </Table.Column>
            ))}
          </Table.Header>
          
          {/* 📋 Table Body Skeleton */}
          <Table.Body>
            {skeletonRows.map((_, rowIndex) => (
              <Table.Row key={rowIndex} className="border-b border-slate-500/5">
                {skeletonCols.map((_, colIndex) => (
                  <Table.Cell key={colIndex} className="py-4 px-6 bg-white!">
                    {/* প্রথম কলামটিকে আমরা ইমেজ+টেক্সট (যেমন বুক কভার বা ইউজার এভাটার) এর মতো লুক দেব */}
                    {colIndex === 0 ? (
                      <div className="flex items-center gap-4">
                        <Skeleton animationType={animType} className="w-10 h-14 rounded-md bg-slate-200 shrink-0" />
                        <Skeleton animationType={animType} className="w-32 h-4 rounded bg-slate-200" />
                      </div>
                    ) : colIndex === columns - 1 ? (
                      // একদম শেষের কলামটিকে অ্যাকশন বাটনের (যেমন অ্যাকশন ড্রপডাউন বা ডিলিট বাটন) মতো লুক দেব
                      <div className="flex items-center gap-3 justify-center">
                        <Skeleton animationType={animType} className="w-20 h-8 rounded-lg bg-slate-200" />
                        <Skeleton animationType={animType} className="w-8 h-8 rounded-lg bg-slate-200" />
                      </div>
                    ) : (
                      // মাঝের কলামগুলোর জন্য নরমাল টেক্সট স্কেলেটন
                      <Skeleton animationType={animType} className="w-20 h-4 rounded bg-slate-200" />
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}