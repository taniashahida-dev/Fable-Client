"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { BookOpen, DollarSign, Calendar, CreditCard } from "lucide-react";

export default function ReaderOverviewCharts({ purchasedBooks = [], bookMarks = [] }) {
  // 👑 ক্লায়েন্ট সাইড মাউন্টিং ট্র্যাকিং (হাইড্রেশন ও উইডথ এরর ফিক্স)
  const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  
  const totalBooks = purchasedBooks.length;
  const totalSpent = purchasedBooks.reduce((sum, item) => sum + Number(item.price || 0), 0);
  
  const currentMonthBooks = purchasedBooks.filter(item => {
    const dateStr = item.purchasedAt || item.createdAt || item.date;
    if (!dateStr) return false;
    const bookDate = new Date(dateStr);
    return bookDate.getMonth() === 5 && bookDate.getFullYear() === 2026; 
  });
  const thisMonthSpent = currentMonthBooks.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const monthlyData = [
    { name: "Jan", spent: 0 },
    { name: "Feb", spent: 15.00 },
    { name: "Mar", spent: 45.30 },
    { name: "Apr", spent: 22.00 },
    { name: "May", spent: 0 },
    { name: "Jun", spent: totalSpent }, 
  ];

  const writerCounts = {};
  purchasedBooks.forEach(book => {
    const name = book.writerName || "Unknown Writer";
    writerCounts[name] = (writerCounts[name] || 0) + 1;
  });

  const pieData = Object.keys(writerCounts).map(name => ({
    name,
    value: writerCounts[name]
  }));

  const finalPieData = pieData.length > 0 ? pieData : [{ name: "No Books Bought Yet", value: 1 }];

  const COLORS = ["#6366F1", "#8B5CF6", "#F59E0B", "#E2E8F0"];

  return (
    <div className="space-y-6">
      {/* 📊 কার্ড সেকশন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">Books Purchased</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">{totalBooks}</h3>
          </div>
          <div className="p-3 bg-[#6366F1]/10 text-[#6366F1] rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">Total Spent</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">${totalSpent.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">This Month Spend</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">${thisMonthSpent.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">Total BookMarks</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">{bookMarks.length}</h3>
          </div>
          <div className="p-3 bg-[#64748B]/10 text-[#64748B] rounded-lg">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 📊 গ্রাফ ও চার্ট সেকশন */}
      {/* 🛠️ ফিক্স: min-w-0 গ্রিড চাইল্ড কন্টেইনারে যুক্ত করা হয়েছে যেন ফ্লেক্স বক্সের উইডথ ক্র্যাশ না করে */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm lg:col-span-2 min-w-0">
          <div className="mb-4">
            <h3 className="text-base font-serif font-bold text-[#0F172A]">Monthly Spending Analysis</h3>
            <p className="text-xs text-[#64748B]">Overview of your investment in ebooks over time</p>
          </div>
          
          {/* 🛠️ ফিক্স: relative পজিশন দিয়ে উইডথ ট্র্যাক করা হয়েছে */}
          <div className="h-72 w-full relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", color: "#fff", border: "none" }}
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "Spent"]}
                  />
                  <Bar dataKey="spent" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" /> // মাউন্ট হওয়ার আগে সেফ হোল্ডার
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm min-w-0">
          <div className="mb-2">
            <h3 className="text-base font-serif font-bold text-[#0F172A]">Writers You Read</h3>
            <p className="text-xs text-[#64748B]">Distribution of books by authors</p>
          </div>
          
          <div className="h-64 w-full flex items-center justify-center relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={finalPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {finalPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieData.length > 0 ? COLORS[index % COLORS.length] : "#E2E8F0"} />
                    ))}
                  </Pie>
                  {pieData.length > 0 && <Tooltip formatter={(value) => [`${value} Book(s)`, "Purchased"]} />}
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" />
            )}
            
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-bold text-[#0F172A]">{totalBooks}</span>
              <p className="text-[10px] uppercase text-[#64748B] tracking-wider">Total Books</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs mt-2">
            {pieData.length > 0 ? (
              finalPieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-[#64748B] line-clamp-1 max-w-25">{entry.name}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-400 italic">No authors available</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}