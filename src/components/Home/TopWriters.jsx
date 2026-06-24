"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, BookOpen, Users } from 'lucide-react';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};


const cardVariants = {
  hidden: {
    opacity: 0,
    x: 70, 
  },
  visible: {
    opacity: 1,
    x: 0, 
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 15
    }
  }
};

const TopWriters = ({ fetchedData = [] }) => {

  const topWriters = Array.isArray(fetchedData) ? fetchedData.slice(0, 3) : [];

 
  const avatarBgs = [
    'bg-[#1A4B58]/10 text-[#1A4B58]', 
    'bg-amber-500/10 text-amber-700', 
    'bg-emerald-600/10 text-emerald-800'
  ];

  return (
    <section className="py-16 bg-[#FAF9F5] border-b border-[#EAE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 text-[11px] font-semibold rounded-full tracking-wide uppercase">
            <Award className="w-3 h-3 fill-amber-500/20" />
            Elite Creators
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-950">
            Meet Our Top Writers
          </h2>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Discover the creative minds behind Fable`s most celebrated digital manuscripts.
          </p>
        </div>

     
        {topWriters.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-[#E0DCD3] rounded-xl bg-white max-w-sm mx-auto">
            <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">No verified writers registered yet.</p>
          </div>
        ) : (
        
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }} 
          >
            {topWriters.map((writer, index) => {
             
              const writerInitial = writer.name ? writer.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'W';
              
              return (
                <motion.div 
                  key={writer._id}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                
                  className="bg-white border border-[#EAE6DF] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden group text-center flex flex-col items-center justify-between"
                >
                 
                  <span className="absolute top-3 right-3 text-[9px] font-bold tracking-widest text-gray-300 uppercase group-hover:text-[#1A4B58]/30 transition-colors">
                    RANK 0{index + 1}
                  </span>

                  <div className="flex flex-col items-center space-y-3.5 w-full">
                   
                    <div className={`w-16 h-16 rounded-full ${avatarBgs[index] || avatarBgs[0]} flex items-center justify-center font-serif text-xl font-bold border border-current/10 shadow-inner transform group-hover:scale-105 transition-transform duration-300`}>
                      {writerInitial}
                    </div>

                   
                    <div>
                      <h3 className="font-serif font-bold text-base text-gray-950 group-hover:text-[#1A4B58] transition-colors line-clamp-1">
                        {writer.name || "Anonymous Creator"}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-light truncate max-w-[180px]">
                        {writer.email || "Verified Publisher"}
                      </p>
                    </div>

                  
                    <div className="w-full bg-[#FAF9F5] border border-[#EAE6DF]/60 rounded-xl py-2 px-3 grid grid-cols-2 gap-1.5 mt-1">
                      <div className="text-left border-r border-[#EAE6DF] pr-1.5">
                        <span className="text-[8px] uppercase tracking-wider text-gray-400 block font-medium">Publications</span>
                        <span className="text-xs font-serif font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                          <BookOpen className="w-2.5 h-2.5 text-[#1A4B58]" /> 2 Total
                        </span>
                      </div>
                      <div className="text-left pl-1.5">
                        <span className="text-[8px] uppercase tracking-wider text-gray-400 block font-medium">Status</span>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded inline-block mt-0.5">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                
                  <div className="w-full pt-4 mt-4 border-t border-[#EAE6DF]/60">
                    <button className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#1A4B58] hover:text-black transition-colors">
                      View Portfolio
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default TopWriters;