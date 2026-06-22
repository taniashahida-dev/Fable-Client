'use client'

import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Banner = () => {
   
  return (
    <div className="relative bg-[#FAF9F5] border-b border-[#EAE6DF] overflow-hidden pt-28 pb-16 md:py-36">
      {/* Decorative background elements for a modern abstract touch */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1A4B58]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            
            {/* Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A4B58]/10 text-[#1A4B58] text-xs font-semibold rounded-full w-fit mx-auto lg:mx-0 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              Welcome to Fable Ecosystem
            </div>

            {/* Premium Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-950 leading-[1.15] tracking-tight">
              Discover & Read <br className="hidden sm:inline" />
              <span className="text-[#1A4B58] relative inline-block">
                Original Ebooks
                <span className="absolute left-0 bottom-1 w-full h-[4px] bg-amber-400/60 rounded-full -z-10" />
              </span>
            </h1>

            {/* Engaging Modern Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Immerse yourself in a curated world of independent stories, digital manuscripts, and exclusive literature. Published directly by creators, formatted beautifully for your screen.
            </p>

            {/* Call to Actions (CTA Group) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
              href="/browse-books"
                className="w-full sm:w-auto bg-gray-950 hover:bg-black text-white px-8 py-4 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group border border-transparent"
              >
                Browse Ebooks
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
              href="/dashboard"
                className="w-full sm:w-auto bg-[#f59e0b] hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg font-medium text-sm transition-all border border-[#E0DCD3] hover:border-gray-400 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-gray-500" />
                Publish Your Work
              </Link>
            </div>

            {/* Micro Trust Stats Footer */}
            <div className="pt-8 border-t border-[#EAE6DF] grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <span className="block font-serif text-2xl font-bold text-gray-900">14+</span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Volumes</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-gray-900">100%</span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Verified Writers</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-gray-900">Instant</span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">PDF Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Creative Visual Feature (Book Stack Layering) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Decorative background dynamic frame */}
            <div className="absolute w-72 sm:w-80 aspect-[3/4] bg-[#1A4B58] rounded-2xl rotate-6 translate-x-4 opacity-10 blur-sm" />
            
            {/* Main Interactive Banner Artwork */}
            <div className="relative w-72 sm:w-80 aspect-[3/4] bg-[#1A4B58] rounded-xl shadow-xl overflow-hidden border border-[#143c47] flex flex-col justify-between p-8 transform -rotate-3 transition-transform hover:rotate-0 duration-500 group">
              {/* Artistic geometric patterns on book cover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 opacity-60 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Top Banner Branding */}
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 border-b border-amber-400/30 pb-1">
                  Fable Premium Edition
                </span>
                <BookOpen className="w-5 h-5 text-white/40" />
              </div>

              {/* Central Title Display */}
              <div className="space-y-2 relative z-10">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF9F5] leading-tight tracking-wide group-hover:text-amber-300 transition-colors">
                  The Art of Digital Narrative
                </p>
                <div className="w-12 h-[2px] bg-amber-400 my-4" />
                <p className="text-xs text-white/60 font-light tracking-wide">
                  By curated global creators
                </p>
              </div>

              {/* Bottom Metadata Label */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                <span className="text-[9px] uppercase tracking-wider text-white/40">Volume I • 2026</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              </div>
            </div>

            {/* Secondary Floating Card */}
            <div className="absolute bottom-[-20px] left-4 sm:left-10 bg-white border border-[#EAE6DF] rounded-lg p-3 shadow-md flex items-center gap-3 animate-bounce-slow max-w-[200px]">
              <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                ✨
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">New Release</p>
                <p className="text-[10px] text-gray-500 truncate">Crush Excuses by Shahida</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;