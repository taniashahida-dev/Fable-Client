
import EbookListingContainer from "@/components/ebooks/EbookListingContainer";
import { getEbooks } from "@/lib/api/ebooks"; // আপনার প্রজেক্টের API ফাংশন

export default async function BrowseBooksPage() {
  // Fetching all published books on initial server request
  // Passing empty string for writerId to pull all available matching entries
  const ebooks = await getEbooks()
console.log(ebooks)
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 block pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Browse Ebooks
        </h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          {ebooks?.length || 0} ebooks across multiple genres available.
        </p>
      </div>

      {/* Main interactive logic bridge */}
      <EbookListingContainer initialEbooks={ebooks || []} />
    </div>
  );
}