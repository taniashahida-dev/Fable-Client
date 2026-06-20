import React from 'react';
import Link from 'next/link';
import { BookOpen, Star, ArrowRight } from 'lucide-react';
import { getEbooks } from '@/lib/api/ebooks';

const FeaturedEbooks = async () => {
  // Fetching all available ebooks from the MongoDB database
  const allBooks = await getEbooks() || [];
  
  // Slicing the array to fetch only the latest 6 ebooks dynamically
 const featuredBooks = allBooks.reverse().slice(0, 6);

  return (
    <section className="py-20 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1A4B58] mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              Curated Literature
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950">
              Featured Ebooks
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-light max-w-md">
              Explore the most anticipated and newly published original volumes directly from independent writers.
            </p>
          </div>
          
          <Link 
            href="/browse" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1A4B58] hover:text-black transition-colors group"
          >
            See all publications
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Fallback state if database has no records */}
        {featuredBooks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#E0DCD3] rounded-xl bg-[#FAF9F5]">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No featured ebooks available at the moment.</p>
          </div>
        ) : (
          /* Ebook Dynamic Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div 
                key={book._id}
                className="group bg-white border border-[#EAE6DF] rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Book Cover Container */}
                <div className="p-5 bg-[#FAF9F5] border-b border-[#EAE6DF] flex items-center justify-center relative overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-32 sm:w-36 aspect-[3/4] object-cover shadow-md group-hover:scale-105 transition-transform duration-500 rounded-sm"
                    />
                  ) : (
                    <div className="w-32 sm:w-36 aspect-[3/4] bg-[#1A4B58] rounded shadow-md flex flex-col justify-between p-4 text-white">
                      <span className="text-[8px] uppercase tracking-wider opacity-60">Fable Digital</span>
                      <p className="font-serif text-xs font-bold line-clamp-3">{book.title}</p>
                      <span className="text-[9px] opacity-70">by {book.writerName || "Author"}</span>
                    </div>
                  )}

                  {/* Badge Label inside book artwork frame */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] uppercase font-semibold text-gray-600 rounded shadow-xs tracking-wider border border-[#EAE6DF]">
                    {book.category || "General"}
                  </span>
                </div>

                {/* Book Metadata & Context details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-gray-950 group-hover:text-[#1A4B58] transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      by <span className="font-medium text-gray-600">{book.writerName || "Independent Writer"}</span>
                    </p>
                    <p className="text-xs text-gray-500 font-light mt-3 line-clamp-2 leading-relaxed">
                      {book.description || "No preview description provided for this digital manuscript volume."}
                    </p>
                  </div>

                  {/* Pricing and Action CTA buttons layout */}
                  <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Price</span>
                      <span className="text-base font-serif font-bold text-gray-900">
                        ${Number(book.price).toFixed(2)}
                      </span>
                    </div>

                    <Link 
                      href={`/browse/${book._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-medium rounded transition-all shadow-xs"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedEbooks;