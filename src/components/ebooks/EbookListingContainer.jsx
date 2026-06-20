"use client";

import React, { useState, useMemo } from "react";
import EbookCard from "./EbookCard";
import EbookFilters from "./EbookFilters";

export default function EbookListingContainer({ initialEbooks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("all"); // all, in-stock, sold
  const [sortBy, setSortBy] = useState("newest");

  // Compute filtered rows instantly matching the user interaction
  const processedEbooks = useMemo(() => {
    let result = initialEbooks.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.writerName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "all" ||
        book.category?.toLowerCase() === selectedGenre.toLowerCase();

      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];

      // Checking availability status criteria
      const isBookSold = book.salesCount > 0; // custom conditional logic rule
      const matchesAvailability =
        availability === "all" ||
        (availability === "in-stock" && !isBookSold) ||
        (availability === "sold" && isBookSold);

      return matchesSearch && matchesGenre && matchesPrice && matchesAvailability;
    });

    // Handle instant client-side sorting configuration criteria
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default: Newest matching initial input order sequence
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [searchQuery, selectedGenre, priceRange, availability, sortBy, initialEbooks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar Filter Section */}
        <div className="lg:col-span-1 sticky top-24">
          <EbookFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availability={availability}
            setAvailability={setAvailability}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Right Books Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Showing {processedEbooks.length} ebook{processedEbooks.length !== 1 && "s"}
          </div>

          {processedEbooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {processedEbooks.map((bookItem) => (
                <EbookCard 
                  key={bookItem._id} 
                  book={bookItem} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-slate-200 bg-slate-50/50 rounded-3xl">
              <p className="text-slate-400 text-base font-medium">
                No matching ebooks found for your current filter criteria.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}