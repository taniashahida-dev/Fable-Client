import { getUserBookmarks } from "@/lib/api/bookmark";
import { getUserSession } from "@/lib/core/session";
import { Bookmark, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import BookmarkGalleryPage from "./BookmarkGalleryPage";

const Bookmarks = async () => {
  const user = await getUserSession();
  const email = user?.email;

  let initialBookmarks = [];
  if (email) {
    initialBookmarks = await getUserBookmarks(email);
  }

  return (
    <div className="w-full min-h-screen  text-slate-900 pt-12 pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#EAE6DF] pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1A4B58] mb-1">
            <Bookmark className="w-3.5 h-3.5 fill-[#1A4B58]" />
            Saved Literature
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-950 tracking-tight">
            My Bookmarked Gallery
          </h1>
        </div>

        {/* CONDITION-BASED RENDERING */}
        {initialBookmarks.length > 0 ? (
          // If bookmarks exist, show the gallery grid
          <BookmarkGalleryPage initialData={initialBookmarks} />
        ) : (
          // FRIENDLY & INTERACTIVE EMPTY STATE
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-[#EAE6DF] rounded-2xl shadow-3xs space-y-6 mt-10">
            {/* Soft Ambient Icon Container */}
            <div className="w-16 h-16 bg-[#1A4B58]/5 rounded-full flex items-center justify-center mx-auto relative">
              <Bookmark className="w-6 h-6 text-[#1A4B58]/40 stroke-[1.5]" />
              <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
            </div>

            {/* Micro-Copy Text Container */}
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-gray-950">
                Your Digital Shelf is Empty
              </h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                You haven`t bookmarked any independent volumes yet. Explore our
                global ecosystem to save your next literary journey!
              </p>
            </div>

            {/* Smart Friendly Call-To-Action (CTA) */}
            <div className="pt-2">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-gray-950 hover:bg-black px-5 py-3 rounded-xl transition-all shadow-sm group"
              >
                <Compass className="w-4 h-4 text-slate-300 group-hover:rotate-12 transition-transform" />
                Discover Ebooks
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
