import React from "react";

import { BookOpen, Users, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 block pt-24 pb-16 font-sans">
      
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1.5 rounded-full">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 max-w-3xl mx-auto leading-tight">
          Welcome to <span className="text-indigo-600">Fable</span> — Where Every Page Tells a Story
        </h1>
        <p className="text-slate-500 mt-6 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          We believe that books are not just papers and ink; they are gateways to different universes, keepers of history, and bridges between souls.
        </p>
      </div>

      {/* 2. Brand Philosophy / Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Our Mission & Vision
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Founded with a passion for literature, <strong>Fable</strong> aims to make reading accessible, enjoyable, and interactive for everyone around the globe. Whether you are seeking knowledge, a thrilling escape, or a comforting tale, we curate our collection to spark your imagination.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We bridge the gap between traditional reading and modern convenience, offering a seamless platform for book lovers to discover their next favorite read.
            </p>
            <div className="pt-4">
              <Link href="/browse-books" className="inline-flex items-center gap-2 bg-slate-950 text-white px-5 py-3 text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-all shadow-sm">
                Explore Our Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Decorative Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4">
              <BookOpen className="w-8 h-8 text-indigo-600 bg-indigo-50 p-1.5 rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">10k+ Books</h4>
                <p className="text-xs text-slate-400 mt-1">A vast world of genres</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 translate-y-6">
              <Users className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1.5 rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">5k+ Readers</h4>
                <p className="text-xs text-slate-400 mt-1">A growing active community</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4">
              <ShieldCheck className="w-8 h-8 text-purple-600 bg-purple-50 p-1.5 rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">Verified Safe</h4>
                <p className="text-xs text-slate-400 mt-1">Secure instant delivery</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 translate-y-6">
              <Heart className="w-8 h-8 text-rose-600 bg-rose-50 p-1.5 rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">Pure Passion</h4>
                <p className="text-xs text-slate-400 mt-1">Crafted with love for books</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Why Choose Fable?
          </h2>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            The values that drive our online library ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 border border-slate-100 bg-white rounded-2xl hover:border-slate-200 hover:shadow-md transition-all space-y-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">01</div>
            <h3 className="text-lg font-bold text-slate-900">Curated Excellence</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We don`t just dump thousands of files. Our team handpicks high-quality formatting, verified metadata, and best-selling titles.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-8 border border-slate-100 bg-white rounded-2xl hover:border-slate-200 hover:shadow-md transition-all space-y-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">02</div>
            <h3 className="text-lg font-bold text-slate-900">Lightning Fast</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Say goodbye to waiting. Get instant access to your digital library right after completion, optimized for any screen or reader.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-8 border border-slate-100 bg-white rounded-2xl hover:border-slate-200 hover:shadow-md transition-all space-y-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">03</div>
            <h3 className="text-lg font-bold text-slate-900">Eco-Friendly Reading</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              By promoting e-reading, we collectively minimize carbon footprints, reducing paper production and contributing to a greener Earth.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CTA / Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Ready to Start Your Next Chapter?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            Join thousands of passionate bibliophiles already diving into amazing stories every day.
          </p>
          <div className="pt-2">
            <Link href="/browse-books" className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3.5 text-sm font-bold rounded-xl hover:bg-slate-100 transition-all shadow-sm cursor-pointer">
              Browse Books
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}