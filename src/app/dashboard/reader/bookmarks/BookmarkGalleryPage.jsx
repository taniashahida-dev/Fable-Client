"use client";

import React, { useState } from "react";
import { X, BookmarkPlus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { deleteBookmark } from "@/lib/api/bookmark";
import toast from "react-hot-toast";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function BookmarkGalleryPage({ initialData }) {
  const [bookmarks, setBookmarks] = useState(initialData || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null);

  const handleRemoveBookmark = async (id) => {
    setSelectedBookmarkId(id);
    setIsModalOpen(true);
  };

  const executeDelete = async () => {
    const id = selectedBookmarkId;
    setIsModalOpen(false);

    try {
      const data = await deleteBookmark(id);

      if (data.success) {
        setBookmarks((prev) => prev.filter((item) => item._id !== id));
        toast.success("Bookmark removed successfully");
      } else {
        toast.error("Failed to remove bookmark from server");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 items-stretch">
      {bookmarks.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-[#EAE6DF] rounded-2xl p-0 flex flex-col justify-between overflow-hidden shadow-3xs hover:shadow-md transition-all duration-300 relative group"
        >
          {/* Top Aspect Ratio Box for Cover Artwork */}
          <div className="w-full aspect-3/4.5 bg-[#1A4B58] relative flex items-center justify-center overflow-hidden">
            {item.coverImage ? (
              <img
                src={item.coverImage}
                alt={item.bookName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="font-serif text-sm font-bold text-white/90 leading-tight">
                  {item.bookName}
                </p>
              </div>
            )}

            <button
              onClick={() => handleRemoveBookmark(item._id)}
              className="absolute top-3 right-3 w-6 h-6 bg-red-900/80 hover:bg-red-700 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer shadow-sm z-20"
              title="Remove Bookmark"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Bottom Card Meta Details Metadata Area */}
          <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-sm text-gray-900 line-clamp-1">
                {item.bookName}
              </h3>
              <p className="text-xs text-slate-400 font-light truncate">
                {item.writerName}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-mono font-bold text-amber-800">
                ${Number(item.price).toFixed(2)}
              </span>
              <Link
                href={`/browse-books/${item.bookId}`}
                className="text-[11px] font-sans font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all flex items-center gap-1"
              >
                Buy <ShoppingBag className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/browse-books"
        className="border-2 border-dashed border-[#EAE6DF] rounded-2xl bg-white/40 hover:bg-white hover:border-gray-950 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 min-h-[350px] group cursor-pointer"
      >
        <div className="space-y-3 flex flex-col items-center justify-center">
          <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#1A4B58]/5 transition-colors">
            <BookmarkPlus className="w-6 h-6 text-slate-400 group-hover:text-[#1A4B58] transition-colors stroke-[1.5]" />
          </div>
          <div>
            <p className="font-sans font-medium text-xs text-slate-500 group-hover:text-gray-950 transition-colors">
              Browse ebooks
            </p>
            <p className="font-sans text-[11px] text-slate-400 font-light">
              to add more
            </p>
          </div>
        </div>
      </Link>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={executeDelete}
      />
    </div>
  );
}
