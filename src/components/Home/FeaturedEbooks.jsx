"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

const FeaturedEbooks = ({ allBooks = [] }) => {
 
  const featuredBooks = [...allBooks].reverse().slice(0, 8);

  return (
  
    <section className="py-14 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-3 md:space-y-0">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1A4B58] mb-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              Curated Literature
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-950 tracking-tight">
              Featured Ebooks
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 font-light max-w-sm">
              Explore the latest original volumes directly from independent writers.
            </p>
          </div>
          
          <Link 
            href="/browse-books" 
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A4B58] hover:text-black transition-colors group"
          >
            See all publications
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

  
        {featuredBooks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#E0DCD3] rounded-2xl">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">No featured ebooks available at the moment.</p>
          </div>
        ) : (
        
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-x-5 gap-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {featuredBooks.map((book) => (
              <Link key={book._id} href={`/browse-books/${book._id}`}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white flex flex-col justify-between p-2 cursor-pointer group h-full  border-slate-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl"
                >
                  <div>
                  
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-gray-100/70 bg-[#FAF9F5] shadow-2xs">
                      {book.coverImage ? (
                        <Image
    src={book?.coverImage } 
    alt={book?.title || 'Ebook Cover'}
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    priority={false} 
    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
  />
                      ) : (
                        <div className="w-full h-full bg-[#1A4B58] flex flex-col justify-between p-4 text-white">
                          <span className="text-[7px] uppercase tracking-wider opacity-60">Fable</span>
                          <p className="font-serif text-[11px] font-bold line-clamp-3">{book.title}</p>
                          <span className="text-[9px] opacity-70">by {book.writerName}</span>
                        </div>
                      )}
                    </div>

                 
                    <div className="mt-3 space-y-0.5">
                      <h3 className="font-serif font-bold text-sm text-gray-950 group-hover:text-[#1A4B58] transition-colors line-clamp-1 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light">
                        by <span className="text-gray-500">{book.writerName || "Author"}</span>
                      </p>
                    </div>
                  </div>

                
                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-gray-950 text-[13px]">
                      ${Number(book.price).toFixed(2)}
                    </span>
                    
                
                    <span className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#EAE6DF]/60 text-gray-400 text-[8px] font-semibold rounded uppercase tracking-wider scale-95 origin-right">
                      {book.category || "Fiction"}
                    </span>
                  </div>

                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default FeaturedEbooks;