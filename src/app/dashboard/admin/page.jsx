import { getAdminRawAnalytics } from "@/lib/api/adminAnalytics";

import OverviewClient from "./OverviewClient"; 

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
 
  const { totalUsers, totalWriters, allEbooks, salesData, feeData } = await getAdminRawAnalytics();

 
  const bookRevenue = salesData.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const feeRevenue = feeData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalEarnings = bookRevenue + feeRevenue;
  
  const copiesSold = salesData.length;
  const liveEbooks = allEbooks.length;

  
  const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyMap = {};
  
 
  salesData.forEach(sale => {
    const date = new Date(sale.purchasedAt || sale.createdAt);
    if (!isNaN(date)) {
      const monthName = monthsOrder[date.getMonth()];
      monthlyMap[monthName] = (monthlyMap[monthName] || 0) + Number(sale.price || 0);
    }
  });


  feeData.forEach(fee => {
    const date = new Date(fee.date || fee.createdAt);
    if (!isNaN(date)) {
      const monthName = monthsOrder[date.getMonth()];
      monthlyMap[monthName] = (monthlyMap[monthName] || 0) + Number(fee.amount || 0);
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


  const genreMap = {};
  allEbooks.forEach(book => {
    const genre = book.category || "Uncategorized";
    genreMap[genre] = (genreMap[genre] || 0) + 1;
  });

  const topBooksChartData = Object.keys(genreMap).map(name => ({
    name: name,
    sales: genreMap[name] 
  }));

  return (
    <div className="p-6 min-h-screen bg-white">
  
      <OverviewClient 
        stats={{ totalEarnings, copiesSold, liveEbooks, totalUsers, totalWriters }}
        revenueChartData={revenueChartData}
        topBooksChartData={topBooksChartData}
        userName="Admin"
      />
    </div>
  );
}