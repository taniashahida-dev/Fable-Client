import { getUserSession } from "@/lib/core/session";

import { getPurchasedBooksOfWriter } from "@/lib/api/purchasedbooksData";
import { getWriterBookmarkedAnalytics } from "@/lib/api/bookmark.server";
import OverviewClient from "./OverviewClient";
import { getWriterEbooks } from "@/lib/api/ebooks";


export default async function WriterOverviewPage() {
   
    const user = await getUserSession();
    
  
    const [booksData, salesData, bookmarksData] = await Promise.all([
        getWriterEbooks(user?.id).then(res => res || []),
        getPurchasedBooksOfWriter().then(res => res || []),
        getWriterBookmarkedAnalytics().then(res => res || [])
    ]);

  
    const totalEarnings = salesData.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const copiesSold = salesData.length;
    const liveEbooks = booksData.filter(book => book.status?.toLowerCase() === 'published').length;
    const totalBookmarks = bookmarksData.length;

    
    const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = {};
    
    salesData.forEach(sale => {
        const date = new Date(sale.purchasedAt || sale.createdAt);
        if (!isNaN(date)) {
            const monthName = monthsOrder[date.getMonth()];
            monthlyMap[monthName] = (monthlyMap[monthName] || 0) + Number(sale.price || 0);
        }
    });

 
    const currentMonthIndex = new Date().getMonth();
    const revenueChartData = [];
    for (let i = 5; i >= 0; i--) {
        const targetIndex = (currentMonthIndex - i + 12) % 12;
        const mName = monthsOrder[targetIndex];
        revenueChartData.push({
            name: mName,
            earnings: monthlyMap[mName] || 0
        });
    }

   
    const bookSalesMap = {};
    salesData.forEach(sale => {
        const bName = sale.bookName || "Untitled Ebook";
        bookSalesMap[bName] = (bookSalesMap[bName] || 0) + 1;
    });
    
    const topBooksChartData = Object.keys(bookSalesMap).map(name => ({
        name: name,
        sales: bookSalesMap[name]
    })).slice(0, 5); 
    
    const recentSales = [...salesData]
        .sort((a, b) => new Date(b.purchasedAt || b.createdAt) - new Date(a.purchasedAt || a.createdAt))
        .slice(0, 4);

    return (
        <OverviewClient 
            stats={{ totalEarnings, copiesSold, liveEbooks, totalBookmarks }}
            revenueChartData={revenueChartData}
            topBooksChartData={topBooksChartData}
            recentSales={recentSales}
            userName={user?.name || "Writer"}
        />
    );
}