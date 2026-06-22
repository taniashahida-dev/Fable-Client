
import { getPurchasedBooks } from "@/lib/api/purchasedbooksData";
import Image from "next/image";

export default async function ReaderPurchaseHistory() {
  const purchasedBooks = await getPurchasedBooks();

  // স্ট্যাটস ক্যালকুলেশন
  const totalBooks = purchasedBooks.length;
  const totalSpent = purchasedBooks.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const thisMonthBooks = purchasedBooks.filter(item => {
    const pDate = new Date(item.purchasedAt);
    const cDate = new Date();
    return pDate.getMonth() === cDate.getMonth() && pDate.getFullYear() === cDate.getFullYear();
  }).length;

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Purchase History</h1>
      
      {/* 📊 উপরে থাকা ৩টি সুন্দর স্ট্যাটস কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">{totalBooks}</span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Books Purchased</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">${totalSpent}</span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Total Spent</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">{thisMonthBooks}</span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">This Month</span>
        </div>
      </div>

      {/* 📋 আপনার স্ক্রিনশটের মতো নিখুঁত টেবিল স্ট্রাকচার */}
      <div className="bg-white rounded-xl border border-[#EAE6DF] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EAE6DF] bg-gray-50/50 text-[11px] uppercase font-semibold text-gray-400 tracking-wider">
                <th className="py-4 px-6 pl-16">Ebook</th>
                <th className="py-4 px-6">Writer</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]/60">
              {purchasedBooks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-sm text-gray-500">No purchases found.</td>
                </tr>
              ) : (
                purchasedBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-[#FAF9F5]/40 transition-colors text-sm text-gray-700">
                    
                    {/* ইবুক ইমেজ এবং টাইটেল কলাম */}
                    <td className="py-4 px-6 font-medium text-gray-900">
                      <div className="flex items-center gap-4 relative">
                        <div className="w-10 h-14 relative bg-gray-100 rounded shadow-xs overflow-hidden flex-shrink-0">
                          {book.bookCover ? (
                            <Image 
                              src={book.bookCover} 
                              alt={book.bookName} 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#1A4B58]/10" />
                          )}
                        </div>
                        <span className="line-clamp-2 max-w-[200px]">{book.bookName}</span>
                      </div>
                    </td>
                    
                    {/* রাইটারের নাম */}
                    <td className="py-4 px-6 text-gray-500">{book.writerName || 'Unknown Writer'}</td>
                    
                    {/* প্রাইস */}
                    <td className="py-4 px-6 font-medium text-[#B89855]">${Number(book.price).toFixed(2)}</td>
                    
                    {/* পারচেজ ডেট */}
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      {new Date(book.purchasedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    
                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                        {book.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}