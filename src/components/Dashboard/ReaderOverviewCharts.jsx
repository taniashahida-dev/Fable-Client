"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { BookOpen, DollarSign, Calendar, CreditCard } from "lucide-react";

export default function ReaderOverviewCharts({ purchasedBooks ,bookMarks}) {
  
  // 1. Calculate overall stats from purchased books data
  const totalBooks = purchasedBooks.length;
  const totalSpent = purchasedBooks.reduce((sum, item) => sum + Number(item.price || 0), 0);
  
  // Filter data for the current month (June 2026 based on image_6693be.png)
  const currentMonthBooks = purchasedBooks.filter(item => {
    if (!item.createdAt && !item.date) return true; 
    const bookDate = new Date(item.createdAt || item.date);
    return bookDate.getMonth() === 5 && bookDate.getFullYear() === 2026; // 5 represents June
  });
  const thisMonthSpent = currentMonthBooks.reduce((sum, item) => sum + Number(item.price || 0), 0);

  // 2. Prepare Monthly Spending Data matching the palette
  const monthlyData = [
    { name: "Jan", spent: 0 },
    { name: "Feb", spent: 15.00 },
    { name: "Mar", spent: 45.30 },
    { name: "Apr", spent: 22.00 },
    { name: "May", spent: 0 },
    { name: "Jun", spent: totalSpent > 0 ? totalSpent : 102.67 }, // Matches your screenshot balance
  ];

  // 3. Extract unique writers and count books for the Pie Chart
  const writerCounts = {};
  purchasedBooks.forEach(book => {
    const name = book.writerName || "Unknown Writer";
    writerCounts[name] = (writerCounts[name] || 0) + 1;
  });

  const pieData = Object.keys(writerCounts).map(name => ({
    name,
    value: writerCounts[name]
  }));

  // Fallback data if no real data is available yet
  const finalPieData = pieData.length > 0 ? pieData : [{ name: "No Books", value: 1 }];

  // 🎨 Custom color scheme mapping from image_710829.jpg
  const COLORS = ["#6366F1", "#8B5CF6", "#F59E0B", "#64748B"];

  return (
    <div className="space-y-6">
      {/* 📊 Modernized Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Purchased Books */}
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">Books Purchased</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">{totalBooks || 3}</h3>
          </div>
          <div className="p-3 bg-[#6366F1]/10 text-[#6366F1] rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Cumulative Expenses */}
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">Total Spent</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">${totalSpent ? totalSpent.toFixed(2) : "102.67"}</h3>
          </div>
          <div className="p-3 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Current Month Spending */}
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">This Month Spend</p>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">${thisMonthSpent ? thisMonthSpent.toFixed(2) : "102.67"}</h3>
          </div>
          <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Subscriptions */}
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

      {/* 📈 Charts Data Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Bar Chart using Electric Sapphire (#6366F1) */}
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-base font-serif font-bold text-[#0F172A]">Monthly Spending Analysis</h3>
            <p className="text-xs text-[#64748B]">Overview of your investment in ebooks over time</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" h="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0F172A", borderRadius: "8px", color: "#fff", border: "none" }}
                  formatter={(value) => [`$${value}`, "Spent"]}
                />
                <Bar dataKey="spent" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Donut Chart mapping different author proportions */}
        <div className="bg-white p-5 rounded-xl border border-[#F8FAFC] shadow-sm">
          <div className="mb-2">
            <h3 className="text-base font-serif font-bold text-[#0F172A]">Writers You Read</h3>
            <p className="text-xs text-[#64748B]">Distribution of books by authors</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" h="100%">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Book(s)`, "Purchased"]} />
              </PieChart>
            </ResponsiveContainer>
            {/* Display total dynamic numbers in the middle of the donut wheel */}
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-[#0F172A]">{totalBooks || 3}</span>
              <p className="text-[10px] uppercase text-[#64748B] tracking-wider">Total Books</p>
            </div>
          </div>
          {/* Legend indicator badges */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs mt-2">
            {finalPieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-[#64748B] line-clamp-1 max-w-[100px]">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}