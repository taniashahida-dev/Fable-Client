import Link from "next/link";
import { BookOpen, BookmarkCheck } from "lucide-react";
import { getPurchasedBooks } from "@/lib/api/purchasedbooksData";
import BookCover from "./BookCover";

export default async function ReaderBookshelf() {
  const purchasedBooks = await getPurchasedBooks();

  return (
    <div className="p-6  min-h-screen mt-10">
      <div className="flex items-center gap-3 mb-8 border-b border-[#EAE6DF] pb-4">
        <BookmarkCheck className="w-8 h-8 text-[#1A4B58]" />
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            My Bookshelf
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Access and read all your purchased digital ebooks
          </p>
        </div>
      </div>

      {purchasedBooks.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EAE6DF] p-12 text-center max-w-xl mx-auto shadow-xs mt-10">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-gray-800 mb-1">
            Your bookshelf is empty
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You haven`t purchased any premium ebooks yet. Start browsing our
            collection to fill your shelf!
          </p>
          <Link
            href="/browse-books"
            className="inline-flex items-center justify-center bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-xs"
          >
            Explore Ebooks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {purchasedBooks.map((book) => (
            <div
              key={book._id}
              className="group bg-white rounded-xl border border-[#EAE6DF] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-3/4 w-full bg-gray-100 border-b border-[#EAE6DF] overflow-hidden shrink-0">
                <BookCover src={book.bookCover} alt={book.bookName} />
              </div>

              <div className="p-3.5 flex flex-col grow justify-between">
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#1A4B58] transition-colors">
                    {book.bookName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    by {book.writerName || "Unknown Writer"}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/browse-books/${book.bookId}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#f8fafc] hover:bg-[#1A4B58] hover:text-white border border-[#EAE6DF]  text-xs font-medium py-2 rounded-md transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
