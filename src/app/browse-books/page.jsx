"use client";

import React, { useState, useEffect, Suspense } from "react";
import { getEbooks } from "@/lib/api/ebooks";
import EbookCard from "@/components/ebooks/EbookCard";
import EbookFilters from "@/components/ebooks/EbookFilters";
import { useSearchParams } from "next/navigation";
import EbookSkeletonCard from "@/components/ebooks/EbookSkeletonCard";
import { Pagination } from "@heroui/react"; 

function BrowseBooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, availability, sortBy, priceRange]);


  const displayedEbooks = ebooks.filter(
    (book) => book.price >= priceRange[0] && book.price <= priceRange[1],
  );

  const totalItems = displayedEbooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentPagedEbooks = displayedEbooks.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
 useEffect(() => {
  setSelectedGenre(initialCategory);
}, [initialCategory]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const data = await getEbooks({
        search: searchQuery,
        category: selectedGenre,
        availability: availability,
        sortBy: sortBy,
      });
      setEbooks(data || []);
      setLoading(false);
    };

    fetchFilteredData();
  }, [searchQuery, selectedGenre, availability, sortBy]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 block pt-20 md:pt-24 pb-10 md:pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Browse Ebooks
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
          {displayedEbooks.length || 0} ebooks found matching filter criteria.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-24 relative z-20">
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

          <div className="lg:col-span-3 space-y-8">
           
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, index) => (
                  <EbookSkeletonCard key={index} />
                ))}
              </div>
            ) : currentPagedEbooks.length > 0 ? ( 
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {currentPagedEbooks.map((bookItem) => (
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
            {/* =================  HeroUI Pagination UI Component ================= */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-4">
                <Pagination.Summary className="text-xs text-slate-500 font-medium">
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
                  results
                </Pagination.Summary>
                <Pagination.Content className="flex flex-wrap justify-center gap-2">
                  <Pagination.Item>
                    <div
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-950 hover:text-white transition-all select-none ${
                        currentPage === 1
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <Pagination.PreviousIcon className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </div>
                  </Pagination.Item>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;

                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <Pagination.Item key={pageNum}>
                          <div
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-9 h-9 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center cursor-pointer select-none ${
                              currentPage === pageNum
                                ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <Pagination.Link isActive={currentPage === pageNum}>
                              {pageNum}
                            </Pagination.Link>
                          </div>
                        </Pagination.Item>
                      );
                    }

                    if (
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === totalPages - 1 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNum}
                          className="px-1 text-slate-400"
                        >
                          <Pagination.Ellipsis />
                        </Pagination.Item>
                      );
                    }

                    return null;
                  })}

                  <Pagination.Item>
                    <div
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-950 hover:text-white transition-all select-none ${
                        currentPage === totalPages
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon className="w-3.5 h-3.5" />
                    </div>
                  </Pagination.Item>
                </Pagination.Content>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowseBooksPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-white flex items-center justify-center">
          <p className="text-slate-400 text-sm font-medium animate-pulse">
            Loading storage catalog...
          </p>
        </div>
      }
    >
      <BrowseBooksContent />
    </Suspense>
  );
}
