"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DollarSign, BookOpen, History, Bookmark  } from "lucide-react";

export default function OverviewClient({ stats, revenueChartData, topBooksChartData, recentSales, userName }) {
 
  const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
 
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen p-4 md:p-8 font-sans max-w-7xl mx-auto mt-6">
      <div className="space-y-8">
        
        <div className="flex justify-between items-center border-b-2 border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#0F172A] font-serif font-black tracking-tight">
              Welcome Back, {userName}!
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wider">
              Here is a live report of your creative performance.
            </p>
          </div>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider shadow-xs">
            Live Analytics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                Total Revenue
              </p>
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
                <DollarSign className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] mt-3">${stats.totalEarnings.toFixed(2)}</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-2 flex items-center gap-1">
              <span className="text-emerald-600 font-bold flex items-center">↑ Live</span> gross wallet updates
            </p>
          </div>

          <div className="bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 transition-colors">
                Copies Sold
              </p>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                <History className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] mt-3">{stats.copiesSold} Units</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-2">
              Total complete checkout checkouts
            </p>
          </div>

          <div className="bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-amber-600 transition-colors">
                Live Ebooks
              </p>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] mt-3">{stats.liveEbooks} Published</h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-2">
              Active in storefront visibility
            </p>
          </div>

          <div className="bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-rose-600 transition-colors">
                Total Saved
              </p>
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500 border border-rose-100">
                <Bookmark className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#0F172A] mt-3">{stats.totalBookmarks} Times</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-2">
              Saved to readers inspiration vaults
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
       
          <div className="lg:col-span-2 bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm min-w-0 relative">
            <div className="mb-6">
              <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider">
                Earnings Performance Trend ($)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Dynamic 6-month earnings visualization</p>
            </div>
            <div className="h-72 w-full">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="earnings" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEarnings)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" />
              )}
            </div>
          </div>

        
          <div className="bg-white p-6 border-2 border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-6 min-w-0">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider">
                  Units Performance
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Sales density across top titles</p>
              </div>
              
              {topBooksChartData.length === 0 ? (
                <div className="h-32 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                  No book analytics found
                </div>
              ) : (
                <div className="h-32 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topBooksChartData} margin={{ top: 5, right: 5, left: -35, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                        <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" />
                  )}
                </div>
              )}
            </div>

            <div className="border-t-2 border-slate-100 pt-4 space-y-3 flex-1 flex flex-col justify-end">
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Recent Activity Feed</h4>
              
              {recentSales.length === 0 ? (
                <p className="text-xs text-slate-400 font-medium italic">Waiting for your first sale order...</p>
              ) : (
                recentSales.map((sale) => (
                  <div key={sale._id} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <div className="truncate pr-2">
                      <p className="font-bold text-[#0F172A] truncate">{sale.bookName || "Untitled Masterpiece"}</p>
                      <p className="text-slate-400 text-[10px] font-medium truncate">
                        Bought by {sale.buyerName || "Reader"}
                      </p>
                    </div>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0 border border-emerald-100">
                      +${Number(sale.price || 0).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}