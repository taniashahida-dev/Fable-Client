
import { getPurchasedBooksOfWriter } from "@/lib/api/purchasedbooksData";
import { DollarSign, History, User, Calendar, BookOpen } from "lucide-react";

export default async function WriterSalesHistory() {
  // 1. Fetch real-time sales transactions cleanly using serverFetch action
  const salesData = await getPurchasedBooksOfWriter();

  // 2. Calculate dynamic gross revenue
  const totalRevenue = salesData.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="p-3 mt-5 max-w-7xl mx-auto">
      
      {/* Upper Section Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b-2 border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          {/* Dynamic Rich Brand Icon Frame */}
          <div className="p-2.5 bg-[#6366F1] text-white rounded-xl shadow-xs">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#0F172A] tracking-tight">Sales History</h1>
            <p className="text-sm text-[#64748B] font-medium mt-0.5">Track your ebook revenue data and consumer transaction updates</p>
          </div>
        </div>

        {/* 💳 BOLD PREMIUM TOTAL REVENUE CARD: High Contrast White Background with clear Slate borders */}
        <div className="bg-white px-6 py-4 rounded-xl border-2 border-slate-200 shadow-sm flex items-center gap-4 self-start sm:self-auto">
          {/* Golden Orange Background Box with Pure White Icon */}
          <div className="p-2.5 bg-[#F59E0B] text-white rounded-lg shadow-xs">
            <DollarSign className="w-5 h-5 font-black" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Total Revenue</p>
            <h4 className="text-2xl font-serif font-black text-[#0F172A] mt-0.5">${totalRevenue.toFixed(2)}</h4>
          </div>
        </div>
      </div>

      {/* Conditional Rendering Layer */}
      {salesData.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-16 text-center max-w-xl mx-auto shadow-sm mt-10">
          <DollarSign className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-1">No sales recorded yet</h3>
          <p className="text-sm text-[#64748B] font-medium">When readers purchase your stories via Stripe Checkout, their records will list right here.</p>
        </div>
      ) : (
        /* 📊 HIGH-CONTRAST BOLD TABLE: Strong borders and deep ink typography so everything is instantly visible */
        <div className="bg-white rounded-xl border-2 border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Table Header Row: Using Prussian Blue text over a distinctly darker slate tint */}
              <thead>
                <tr className="bg-slate-100/90 border-b-2 border-slate-300 text-[#0F172A] uppercase text-xs font-black tracking-wide">
                  <th className="py-4 px-6">Ebook Title</th>
                  <th className="py-4 px-6">Buyer Name</th>
                  <th className="py-4 px-6">Purchase Date</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                </tr>
              </thead>
              
              {/* Table Body Rows: Dark crisp fonts with solid line breaks */}
              <tbody className="divide-y-2 divide-slate-200 text-sm font-medium text-[#0F172A]">
                {salesData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-slate-50/80 transition-colors group">
                    
                    {/* Column 1: Ebook Title (Deep Prussian Blue Ink style) */}
                    <td className="py-4 px-6 font-bold text-[#0F172A]">
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-[#6366F1] stroke-[2.5] flex-shrink-0" />
                        <span className="line-clamp-1 group-hover:text-[#6366F1] transition-colors">
                          {sale.bookName || "Untitled Ebook"}
                        </span>
                      </div>
                    </td>
                    
                    {/* Column 2: Buyer Identity (Sharper Dark Text) */}
                    <td className="py-4 px-6 text-slate-800 font-semibold">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#64748B] stroke-[2] flex-shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {sale.buyerName || sale.buyerEmail || "Anonymous Reader"}
                        </span>
                      </div>
                    </td>
                    
                    {/* Column 3: Format Purchase Date */}
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#64748B] stroke-[2] flex-shrink-0" />
                        <span>
                          {new Date(sale.purchasedAt || sale.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    
                    {/* Column 4: Electric Sapphire Pricing Display — Super bold & stands out */}
                    <td className="py-4 px-6 text-right font-black text-[#6366F1] text-base tracking-tight bg-slate-50/40">
                      ${Number(sale.price || 0).toFixed(2)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
}