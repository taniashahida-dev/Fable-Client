
import DashboardTableSkeleton from "@/components/Dashboard/DashboardTableSkeleton";

export default function PurchaseHistoryLoading() {
  return (
    <div className="p-6 space-y-6 w-full">
    
      <div className="space-y-2">
        <div className="h-8 w-52 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-80 bg-slate-100 rounded animate-pulse" />
      </div>

    
      <DashboardTableSkeleton columns={5} rows={5} />
    </div>
  );
}