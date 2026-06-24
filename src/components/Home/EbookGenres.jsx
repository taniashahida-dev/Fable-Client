"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Heart, 
  Flame, 
  Ghost, 
  Layers,
  ArrowRight 
} from 'lucide-react';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
     
      staggerChildren: 0.15 
    }
  }
};


const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 65, 
      damping: 18     
    } 
  }
};

const EbookGenres = () => {
  const genres = [
    {
      id: 1,
      name: "Fiction",
      query: "fiction",
      icon: BookOpen,
      color: "from-blue-500/10 to-indigo-500/5 text-blue-600 border-blue-100"
    },
    {
      id: 2,
      name: "Mystery",
      query: "mystery",
      icon: Compass,
      color: "from-amber-500/10 to-orange-500/5 text-amber-700 border-amber-100"
    },
    {
      id: 3,
      name: "Romance",
      query: "romance",
      icon: Heart,
      color: "from-rose-500/10 to-pink-500/5 text-rose-600 border-rose-100"
    },
    {
      id: 4,
      name: "Sci-Fi",
      query: "sci-fi",
      icon: Flame,
      color: "from-purple-500/10 to-violet-500/5 text-purple-600 border-purple-100"
    },
    {
      id: 5,
      name: "Fantasy",
      query: "fantasy",
      icon: Sparkles,
      color: "from-emerald-500/10 to-teal-500/5 text-emerald-700 border-emerald-100"
    },
    {
      id: 6,
      name: "Horror",
      query: "horror",
      icon: Ghost,
      color: "from-red-500/10 to-rose-500/5 text-red-600 border-red-100"
    }
  ];

  return (
  
    <section className="py-16 bg-[#f59e0b] border-b border-[#EAE6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
      
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1A4B58] bg-[#1A4B58]/5 px-2.5 py-1 rounded-md">
            <Layers className="w-3 h-3" />
            Genres
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-950 tracking-tight">
            Explore Literary Moods
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }} 
        >
          {genres.map((genre) => {
            const IconComponent = genre.icon;
            
            return (
              <motion.div
                key={genre.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link 
                  href={`/browse-books?category=${genre.query}`}
                  className="group relative p-4 bg-white border border-[#EAE6DF] rounded-xl hover:border-gray-950 shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden h-28 cursor-pointer"
                >
               
                  <div className={`absolute inset-0 bg-linear-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
  <div className="flex flex-col items-center space-y-2.5 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                  
                    <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-transparent group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-gray-700 group-hover:text-current transition-colors" />
                    </div>

                 
                    <span className="font-sans font-semibold text-sm text-gray-800 group-hover:text-gray-950 transition-colors">
                      {genre.name}
                    </span>
                  </div>

               
                  <div className="absolute bottom-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-gray-950" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default EbookGenres;