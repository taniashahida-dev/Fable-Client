
import ReaderOverviewCharts from "@/components/Dashboard/ReaderOverviewCharts";
import { getUserBookMarks } from "@/lib/api/bookmark.server";



import { getPurchasedBooks } from "@/lib/api/purchasedbooksData";
import { LayoutDashboard } from "lucide-react";

export default async function ReaderDashboardOverview() {
  
  const purchasedBooksData = await getPurchasedBooks();
  const bookMarksData = await getUserBookMarks()
  const purchasedBooks = Array.isArray(purchasedBooksData) ? purchasedBooksData : [];
  const bookMarks = Array.isArray(bookMarksData) ? bookMarksData : [];

  return (
    <div className="p-6  min-h-screen mt-10">
    
      <div className="flex items-center gap-3 mb-8 border-b border-[#EAE6DF] pb-4">
        <LayoutDashboard className="w-8 h-8 text-[#1A4B58]" />
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Reader Overview</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back! Here is a summary of your reading library and expenses.</p>
        </div>
      </div>

     
      <ReaderOverviewCharts purchasedBooks={purchasedBooks}  bookMarks={ bookMarks}/>

    
    </div>
  );
}