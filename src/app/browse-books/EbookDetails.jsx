"use client";

import React, { useState } from "react";
import { Bookmark, Lock, BookOpen, AlertCircle, Hash } from "lucide-react";
import { Button, Spinner } from "@heroui/react"; // 👈 HeroUI Spinner ইম্পোর্ট
import { addBookmark } from "@/lib/actions/bookmark";
import Link from "next/link";
import toast from "react-hot-toast";

const EbookDetails = ({ bookData, currentUser, writer }) => {
  const [isBookmarked, setIsBookmarked] = useState(bookData?.isBookmarked || false);
  const [checkoutLoading, setCheckoutLoading] = useState(false); 

  if (!bookData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Ebook Not Found</h2>
        <p className="text-gray-600 max-w-md">
          The ebook you are looking for might have been removed or is temporarily unavailable.
        </p>
      </div>
    );
  }

  const {
    _id: id,
    title = "Untitled",
    writerName = writer?.name || "Unknown Author",
    coverImage: bookCover, 
    description = "",
    price = 0,
    category = "Uncategorized",
    createdAt = "N/A",
    pages = "—",
    format = "Digital PDF",
    salesCount = 0,
    availabilityStatus = "available",
  } = bookData;

const isWriter =
  currentUser &&
  (currentUser.id === bookData.writerId ||
    currentUser._id === bookData.writerId);
  const hasPurchased = bookData.hasPurchased === true;
  const isSoldOut = salesCount >= 1 || availabilityStatus?.toLowerCase() === "sold" ;

  const showFullDescription = isWriter || hasPurchased;
  const truncatedDescription = description.length > 170 
    ? description.substring(0, 170) + "..." 
    : description;


   
 const handleBookmarkClick = async () => {
  if (!currentUser) {
    return toast.error("Please log in to bookmark this book.");
  }

  if (isWriter) {
    return toast.error("You cannot bookmark your own ebook.");
  }

  if (isBookmarked) {
    return toast.error("Already bookmarked this book.");
  }

  const response = await addBookmark({
    bookId: id,
    bookName: title,
    coverImage: bookCover || "",
    writerId: bookData.writerId,
    writerName,
    price,
    userEmail: currentUser.email,
    userName: currentUser.name || "Anonymous Reader",
  });

  if (response.success) {
    setIsBookmarked(true);
    toast.success("Bookmarked successfully!");
  } else {
    toast.error(response.message || "Something went wrong!");

    if (response.message?.includes("Already")) {
      setIsBookmarked(true);
    }
  }
};
 console.log({
  hasPurchased: bookData.hasPurchased,
  isWriter,
  showFullDescription,
});
  return (
    <div className="py-12 mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-[#EAE6DF] overflow-hidden p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Side (Cover & Bookmark) */}
        <div className="flex flex-col space-y-5">
          <div className="relative group w-full aspect-3/4 bg-[#1A4B58] rounded-lg shadow-md overflow-hidden flex items-center justify-center border border-[#E0DCD3]">
            {bookCover ? (
              <img src={bookCover} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6 text-white/80">
                <p className="font-serif text-xl font-bold">{title}</p>
                <Link href={`/writers/${bookData?.writerId}`} className="text-sm text-[#1A4B58] font-semibold mb-6 cursor-pointer hover:underline transition-all">
                  by {writerName}
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md border text-sm font-medium transition-all ${
              isBookmarked
                ? "bg-[#EAE6DF] border-[#D1CBC4] text-gray-900 cursor-not-allowed"
                : "bg-white border-[#E0DCD3] text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-gray-800" : ""}`} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          {/* Writer Profile Card */}
          <div className="bg-[#FAF9F5] rounded-lg p-5 border border-[#EAE6DF]">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 block mb-2">About The Writer</span>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#EAE6DF] flex items-center justify-center font-bold text-gray-700 text-sm">
                {writerName ? writerName.split(" ").map((n) => n[0]).join("") : "W"}
              </div>
              <div>
                <Link href={`/writers/${bookData?.writerId}`} className="font-serif font-bold cursor-pointer text-gray-900 block hover:text-[#1A4B58] hover:underline transition-all">
                  {writerName}
                </Link>
                <p className="text-xs text-gray-500">{writer?.email || "Verified Creator"}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Official writer profile registered on Fable platform.</p>
          </div>
        </div>

        {/* Right Side (Details & Actions) */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 bg-[#EAE6DF] text-gray-700 text-xs font-semibold rounded uppercase tracking-wider">{category}</span>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded uppercase tracking-wider ${isSoldOut ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {isSoldOut ? "Sold Out" : "Available"}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                Uploaded: {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-1 leading-tight">{title}</h1>
            <p className="text-sm text-gray-500 mb-6">by <span className="text-[#1A4B58] font-medium">{writerName}</span></p>

            {/* Pricing & Stripe Form Section */}
            <div className="bg-white border border-[#EAE6DF] rounded-lg p-5 mb-6 shadow-sm">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-bold text-gray-900">${Number(price).toFixed(2)}</span>
                <span className="text-xs text-gray-400 font-medium">one-time purchase</span>
              </div>

              <div className="mt-4">
               {hasPurchased ? (
  <button
    disabled
    className="w-full bg-[#1A4B58] text-white py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center gap-2 cursor-default"
  >
    <BookOpen className="w-4 h-4" />
    Already Purchased
  </button>
) : isWriter ? (
  <button
    type="button"
    onClick={() => toast.error("You cannot purchase your own ebook.")}
    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-md font-medium text-sm transition-all"
  >
    Buy Now
  </button>
) : isSoldOut ? (
                  <button disabled className="w-full bg-gray-200 text-gray-400 py-3 px-4 rounded-md font-medium text-sm cursor-not-allowed text-center">
                    This unique copy has been sold and is no longer available
                  </button>
                ) : (
                  <form action="/api/checkout_sessions" method="POST" className="w-full" onSubmit={() => setCheckoutLoading(true)}>
                    <input type="hidden" name="bookId" value={id} />
                    <input type="hidden" name="bookName" value={title} />
                    <input type="hidden" name="price" value={price} />
                    <input type="hidden" name="writerId" value={bookData?.writerId} />
                    <input type="hidden" name="bookCover" value={bookCover || ""} />
                    <input type="hidden" name="writerName" value={writerName || ""} />

                    {currentUser ? (
                      <Button
                        type="submit"
                        disabled={checkoutLoading}
                        className="w-full bg-gray-900 hover:bg-black text-white font-medium text-sm py-6 rounded-md shadow-sm flex items-center justify-center gap-2"
                      >
                        {checkoutLoading ? <Spinner size="sm" color="white" /> : "Checkout"}
                      </Button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toast.error("Please log in to purchase this book.")}
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 px-4 rounded-md font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        Login to Buy
                      </button>
                    )}
                  </form>
                )}
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-2">Secure checkout · Instant access after payment</p>
            </div>

            {/* Synopsis Overview Section */}
            <div className="mb-8">
              <h3 className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 mb-2">About This Ebook</h3>
              <p className="text-sm text-gray-700 leading-relaxed font-light first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-gray-900">
                {showFullDescription ? description : truncatedDescription}
              </p>

              {!showFullDescription && (
                <div className="mt-4 bg-linear-to-b from-transparent to-[#FAF9F5] p-6 rounded-lg text-center border border-dashed border-[#E0DCD3]">
                  <Lock className="w-5 h-5 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Full book contents are hidden until purchase.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="border-t border-[#EAE6DF] pt-6 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 block mb-1">Pages</span>
              <span className="text-sm font-medium text-gray-800 flex items-center justify-center gap-1">
                <Hash className="w-3.5 h-3.5 text-gray-400" /> {pages}
              </span>
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 block mb-1">Format</span>
              <span className="text-sm font-medium text-gray-800 flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-gray-400" /> {format}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EbookDetails;