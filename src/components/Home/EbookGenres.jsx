import React from 'react';
import Link from 'next/link';
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

const EbookGenres = () => {
  // Balanced typography and interactive styling palette
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
        
        {/* Minimal Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1A4B58] bg-[#1A4B58]/5 px-2.5 py-1 rounded-md">
            <Layers className="w-3 h-3" />
            Genres
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-950 tracking-tight">
            Explore Literary Moods
          </h2>
        </div>

        {/* Compact Interactive Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => {
            const IconComponent = genre.icon;
            
            return (
              <Link 
                key={genre.id}
                href={`/browse-books?category=${genre.query}`}
                className="group relative p-4 bg-white border border-[#EAE6DF] rounded-xl hover:border-gray-950 hover:bg-white shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden h-28"
              >
                {/* Subtle Hover Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />

                {/* Main Card Content Stack */}
                <div className="flex flex-col items-center space-y-2.5 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {/* Icon Component */}
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-transparent group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-700 group-hover:text-current transition-colors" />
                  </div>

                  {/* Genre Title Text */}
                  <span className="font-sans font-semibold text-sm text-gray-800 group-hover:text-gray-950 transition-colors">
                    {genre.name}
                  </span>
                </div>

                {/* Animated Arrow Micro-indicator sliding up from the bottom */}
                <div className="absolute bottom-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-950" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EbookGenres;