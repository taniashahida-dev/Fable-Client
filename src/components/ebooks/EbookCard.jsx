"use client";

import React from "react";
import Link from "next/link";

export default function EbookCard({ book }) {
  if (!book) return null;

  const isSold = book.salesCount > 0;

  // ছবিতে দেওয়া আর্টের মতো প্রিমিয়াম ব্যাকগ্রাউন্ড গ্রাডিয়েন্ট জেনারেটর (যদি রিয়েল ছবি না থাকে)
  const getRandomGradient = (title = "") => {
    const code = title.charCodeAt(0) || 0;
    if (code % 3 === 0) return "from-purple-600 via-indigo-700 to-indigo-950";
    if (code % 3 === 1) return "from-teal-500 via-emerald-600 to-emerald-950";
    return "from-pink-500 via-rose-600 to-rose-950";
  };

  return (
    <Link 
      href={`/browse-books/${book._id}`}
      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
    >
      <div className="w-full aspect-3/4 relative overflow-hidden bg-slate-100">
        
     
        {isSold && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md z-20 shadow-md">
            Sold
          </div>
        )}

       
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-linear-to-br ${getRandomGradient(book.title)} p-6 flex flex-col justify-end text-white relative`}>
            <div className="absolute top-4 left-4 text-white/20 font-bold tracking-widest text-xs uppercase">Fable Original</div>
            <h3 className="text-xl font-bold tracking-tight leading-tight line-clamp-3 mb-2">{book.title}</h3>
          </div>
        )}
      </div>

   
      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
        <div className="space-y-0.5">
          <h2 className="font-bold text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors truncate">
            {book.title}
          </h2>
          <p className="text-xs font-medium text-slate-400 truncate">
            by {book.writerName || "Fable Contributor"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold text-slate-900 font-mono">
            {book.price === 0 ? "Free" : `$${book.price.toFixed(2)}`}
          </span>
          
       
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
            {book.category || "General"}
          </span>
        </div>
      </div>
    </Link>
  );
}