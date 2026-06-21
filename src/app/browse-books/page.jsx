"use client";

import React, { useState, useEffect } from "react";
import { getEbooks } from "@/lib/api/ebooks";
import EbookCard from "@/components/ebooks/EbookCard";
import EbookFilters from "@/components/ebooks/EbookFilters";
import { useSearchParams } from "next/navigation";

export default function BrowseBooksPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 100]); 
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (initialCategory) {
      setSelectedGenre(initialCategory);
    }
  }, [initialCategory]);

 
  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const data = await getEbooks({
        search: searchQuery,
        category: selectedGenre,
        availability: availability,
        sortBy: sortBy
      });
      setEbooks(data || []);
      setLoading(false);
    };

    fetchFilteredData();
  }, [searchQuery, selectedGenre, availability, sortBy]);

 
  const displayedEbooks = ebooks.filter(book => book.price >= priceRange[0] && book.price <= priceRange[1]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 block pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Browse Ebooks
        </h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          {displayedEbooks.length || 0} ebooks found matching filter criteria.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
        
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

         
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="text-center py-24 text-slate-400 font-medium">Loading catalog data...</div>
            ) : displayedEbooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {displayedEbooks.map((bookItem) => (
                  <EbookCard key={bookItem._id} book={bookItem} />
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
    </div>
  );
}