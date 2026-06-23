
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { serverFetch } from "@/lib/core/server";
import { getWriters } from "@/lib/api/writers";

async function getBooksByWriter(writerId) {
  try {
    return await serverFetch(`/api/ebooks?writerId=${writerId}`);
  } catch (error) {
    console.error("Error fetching writer books:", error);
    return [];
  }
}

export default async function WriterBooksPage({ params }) {

  const { id } = await params;

  const writerData = await getWriters(id);
  const writer = Array.isArray(writerData) && writerData.length > 0 ? writerData[0] : null;
  const books = await getBooksByWriter(id);

  const writerName = writer?.name || "Unknown Writer";

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 mt-20 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-5xl mx-auto">
        
   
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Browse
        </Link>

     
        <div className="bg-white rounded-xl p-6 md:p-8 border border-[#EAE6DF] shadow-xs mb-10 flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-16 h-16 rounded-full bg-[#EAE6DF] flex items-center justify-center font-bold text-gray-700 text-xl shadow-inner">
              {writerName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-gray-400 block mb-0.5">Author Profile</span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{writerName}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{writer?.email || "Verified Creator"}</p>
            </div>
          </div>
          <div className="bg-[#FAF9F5] px-4 py-2 rounded-lg border border-[#EAE6DF] text-center">
            <span className="text-lg font-bold text-[#1A4B58]">{books.length}</span>
            <span className="text-[10px] tracking-wider uppercase font-medium text-gray-400 block">Total Books</span>
          </div>
        </div>

      
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 border-b border-[#EAE6DF] pb-3">Books Published by this Author</h2>
        
        {books.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#E0DCD3]">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">This writer hasn`t published any other ebooks yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book._id} className="bg-white border border-[#EAE6DF] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="aspect-3/4 w-full bg-[#1A4B58] relative flex items-center justify-center overflow-hidden border-b border-[#EAE6DF]">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white/80 font-serif text-sm p-4 text-center font-bold">{book.title}</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-[#EAE6DF] text-gray-700 text-[10px] font-semibold rounded uppercase tracking-wider mb-2 inline-block">
                      {book.category || "General"}
                    </span>
                    <h3 className="font-serif font-bold text-gray-900 text-base line-clamp-1 mb-1">{book.title}</h3>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#FAF9F5]">
                    <span className="text-sm font-bold text-gray-900">
                      {Number(book.price) === 0 ? "Free" : `$${Number(book.price).toFixed(2)}`}
                    </span>
                    <Link href={`/browse-ebooks/${book._id}`} className="text-xs font-medium text-white bg-gray-900 hover:bg-black px-3 py-1.5 rounded transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}