"use client";

import React, { useState, useEffect } from "react"; // 👈 useState এবং useEffect অ্যাড করা হয়েছে
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  PieChart as PieIcon,
  Feather,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function OverviewClient({
  stats,
  revenueChartData,
  topBooksChartData,
  userName,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  const COLORS = [
    "#6366F1",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#EC4899",
    "#3B82F6",
  ];

  return (
    <div className="w-full bg-white min-h-screen p-4 md:p-6 text-[#0F172A]">
      <div className="mb-6">
        <p className="text-slate-500 font-medium">
          Here is what`s happening with your platform ecosystem today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#0F172A] p-6 rounded-2xl text-white shadow-md flex items-center justify-between border border-slate-800">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </p>
            <h3 className="text-3xl font-black mt-2 text-[#F59E0B]">
              ${Number(stats?.totalEarnings || 0).toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl text-[#F59E0B]">
            <DollarSign className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Readers
            </p>
            <h3 className="text-3xl font-black mt-2 text-[#6366F1]">
              {stats?.totalUsers || 0}
            </h3>
          </div>
          <div className="p-3 bg-[#6366F1]/10 rounded-xl text-[#6366F1]">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Writers
            </p>
            <h3 className="text-3xl font-black mt-2 text-[#8B5CF6]">
              {stats?.totalWriters || 0}
            </h3>
          </div>
          <div className="p-3 bg-[#8B5CF6]/10 rounded-xl text-[#8B5CF6]">
            <Feather className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Ebooks
            </p>
            <h3 className="text-3xl font-black mt-2 text-[#0F172A]">
              {stats?.liveEbooks || 0}
            </h3>
          </div>
          <div className="p-3 bg-slate-200 rounded-xl text-[#0F172A]">
            <BookOpen className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 shadow-sm min-w-0">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#6366F1]" />
            <div>
              <h4 className="text-base font-bold text-[#0F172A]">
                Platform Sales Analysis
              </h4>
              <p className="text-xs text-slate-400">
                Total revenue generated over the last 6 months
              </p>
            </div>
          </div>

          <div className="w-full h-80 pr-2 relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#F59E0B", fontWeight: "bold" }}
                    cursor={{ fill: "#E2E8F0", opacity: 0.4 }}
                  />
                  <Bar
                    dataKey="earnings"
                    fill="#6366F1"
                    radius={[6, 6, 0, 0]}
                    barSize={38}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-100/50 rounded-xl animate-pulse" /> // মাউন্ট হওয়ার আগের সেফ হোল্ডার
            )}
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon className="w-5 h-5 text-[#8B5CF6]" />
            <div>
              <h4 className="text-base font-bold text-[#0F172A]">
                Ebooks by Genre
              </h4>
              <p className="text-xs text-slate-400">
                Library inventory distribution map
              </p>
            </div>
          </div>

          <div className="w-full h-55 flex items-center justify-center relative">
            {!isMounted ? (
              <div className="w-full h-full bg-slate-100/50 rounded-xl animate-pulse" />
            ) : topBooksChartData?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topBooksChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="sales"
                    >
                      {topBooksChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0F172A",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute text-center pointer-events-none">
                  <span className="text-2xl font-black text-[#0F172A]">
                    {stats?.liveEbooks || 0}
                  </span>
                  <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                    Live Books
                  </p>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400">No genre data available</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 max-h-25 overflow-y-auto pt-2 border-t border-slate-200">
            {topBooksChartData?.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate capitalize">
                  {entry.name}: {entry.sales}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
