import { getPurchasedBooks } from "@/lib/api/purchasedbooksData";


export default async function ReaderPurchaseHistory() {
  
  const purchasedBooks = await getPurchasedBooks();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-serif font-bold mb-6 text-gray-900">My Purchased Books</h1>
      
      {purchasedBooks.length === 0 ? (
        <p className="text-gray-500 text-sm">You haven`t purchased any books yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-xl border border-[#EAE6DF] shadow-sm">
              <h2 className="font-medium text-gray-900 line-clamp-1">{book.bookName}</h2>
              <p className="text-xs text-gray-500 mt-1">Price: ${book.price}</p>
              <p className="text-[10px] text-gray-400 mt-2">
                Purchased on: {new Date(book.purchasedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}