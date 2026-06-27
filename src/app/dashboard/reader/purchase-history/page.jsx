import { getPurchasedBooks } from "@/lib/api/purchasedbooksData";
import Image from "next/image";

export default async function ReaderPurchaseHistory() {
  const purchasedBooksData = await getPurchasedBooks();
  const purchasedBooks = Array.isArray(purchasedBooksData)
    ? purchasedBooksData
    : [];
  const totalBooks = purchasedBooks.length;

  const totalSpent =
    purchasedBooks.length > 0
      ? purchasedBooks
          .reduce((sum, item) => {
            const itemPrice = item && item.price ? Number(item.price) : 0;
            return sum + itemPrice;
          }, 0)
          .toFixed(2)
      : "0.00";

  const thisMonthBooks = purchasedBooks.filter((item) => {
    const pDate = new Date(item.purchasedAt);
    const cDate = new Date();
    return (
      pDate.getMonth() === cDate.getMonth() &&
      pDate.getFullYear() === cDate.getFullYear()
    );
  }).length;

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6">
        Purchase History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">
            {totalBooks}
          </span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
            Books Purchased
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">
            ${totalSpent}
          </span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
            Total Spent
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs">
          <span className="text-3xl font-serif font-bold text-[#1A4B58] block">
            {thisMonthBooks}
          </span>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
            This Month
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EAE6DF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-190 w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EAE6DF] bg-gray-50/50 text-[11px] uppercase font-semibold text-gray-400 tracking-wider">
                <th className="py-3 md:py-4 px-3 md:px-6 pl-16">Ebook</th>
                <th className="py-3 md:py-4 px-3 md:px-6">Writer</th>
                <th className="py-3 md:py-4 px-3 md:px-6">Price</th>
                <th className="py-3 md:py-4 px-3 md:px-6">Date</th>
                <th className="py-3 md:py-4 px-3 md:px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]/60">
              {purchasedBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    No purchases found.
                  </td>
                </tr>
              ) : (
                purchasedBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-[#FAF9F5]/40 transition-colors text-sm text-gray-700"
                  >
                    <td className="py-3 md:py-4 px-3 md:px-6 font-medium text-gray-900">
                      <div className="flex items-center gap-4 relative">
                        <div className="w-9 h-12 md:w-10 md:h-14 relative bg-gray-100 rounded shadow-xs overflow-hidden shrink-0">
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
                        <span className="line-clamp-2 max-w-30 md:max-w-50">
                          {book.bookName}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 md:py-4 px-3 md:px-6 text-gray-500 whitespace-nowrap">
                      {book.writerName || "Unknown Writer"}
                    </td>

                    <td className="py-3 md:py-4 px-3 md:px-6 font-medium text-[#B89855] whitespace-nowrap">
                      ${Number(book.price).toFixed(2)}
                    </td>

                    <td className="py-3 md:py-4 px-3 md:px-6 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(book.purchasedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3 md:py-4 px-3 md:px-6 text-center whitespace-nowrap">
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
