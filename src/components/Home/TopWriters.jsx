import React from 'react';
import { Award, ArrowRight, BookOpen, Users } from 'lucide-react';
import { getAllWriters } from '@/lib/api/writers';

const TopWriters = async () => {
  // Fetching data from API safely
  const fetchedData = await getAllWriters();
  
  // Safe validation check: ensure data is a valid array before running slice()
  const topWriters = Array.isArray(fetchedData) ? fetchedData.slice(0, 3) : [];

  // Helper array of background colors for dynamic premium avatars
  const avatarBgs = ['bg-[#1A4B58]/10 text-[#1A4B58]', 'bg-amber-500/10 text-amber-700', 'bg-emerald-600/10 text-emerald-800'];

  return (
    <section className="py-20 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Layout */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 text-xs font-semibold rounded-full tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 fill-amber-500/20" />
            Elite Creators
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950">
            Meet Our Top Writers
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Discover the creative minds behind Fable`s most celebrated digital manuscripts and bestselling literature.
          </p>
        </div>

        {/* Fallback View if no writers are found in the database */}
        {topWriters.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#E0DCD3] rounded-xl bg-white max-w-md mx-auto">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No verified writers registered yet.</p>
          </div>
        ) : (
          /* Responsive 3-Column Grid for Top Creators */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {topWriters.map((writer, index) => {
              // Creating a safe uppercase initial for the profile avatar image mockup
              const writerInitial = writer.name ? writer.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'W';
              
              return (
                <div 
                  key={writer._id}
                  className="bg-white border border-[#EAE6DF] rounded-xl p-8 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group text-center flex flex-col items-center justify-between"
                >
                  {/* Decorative Subtle Ranking Badge on Card */}
                  <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-gray-300 uppercase group-hover:text-[#1A4B58]/30 transition-colors">
                    RANK 0{index + 1}
                  </span>

                  <div className="flex flex-col items-center space-y-4 w-full">
                    {/* Dynamic Graphic Avatar Component */}
                    <div className={`w-20 h-20 rounded-full ${avatarBgs[index] || avatarBgs[0]} flex items-center justify-center font-serif text-2xl font-bold border border-current/10 shadow-inner transform group-hover:scale-105 transition-transform duration-300`}>
                      {writerInitial}
                    </div>

                    {/* Writer Personal Information Mapping Database Credentials */}
                    <div>
                      <h3 className="font-serif font-bold text-xl text-gray-950 group-hover:text-[#1A4B58] transition-colors">
                        {writer.name || "Anonymous Creator"}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light truncate max-w-[220px]">
                        {writer.email || "Verified Publisher"}
                      </p>
                    </div>

                    {/* Custom Styled Fake Analytics Stats Indicator */}
                    <div className="w-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-lg py-3 px-4 grid grid-cols-2 gap-2 mt-2">
                      <div className="text-left border-r border-[#EAE6DF] pr-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-medium">Publications</span>
                        <span className="text-sm font-serif font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                          <BookOpen className="w-3 h-3 text-[#1A4B58]" /> 2 Total
                        </span>
                      </div>
                      <div className="text-left pl-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-medium">Status</span>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile redirection footer container */}
                  <div className="w-full pt-6 mt-6 border-t border-[#EAE6DF]">
                    <button className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#1A4B58] group-hover:text-black transition-colors">
                      View Literary Portfolio
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default TopWriters;