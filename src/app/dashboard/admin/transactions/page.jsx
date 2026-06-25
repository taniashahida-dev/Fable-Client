import { getCombinedTransactions } from "@/lib/api/transaction";
import TransactionsTable from "./TransactionsTable";


export const dynamic = "force-dynamic";



export default async function AdminTransactionsPage() {

  const transactions = await getCombinedTransactions();

  return (
    <div className="w-full min-h-screen bg-white p-6 md:p-10">
      
     
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
          Transactions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor all system-wide ebook purchases and writer publishing fees in real-time.
        </p>
      </div>

      {/* 📊 Table Wrapper */}
      <div className="w-full">
        {transactions && transactions.length > 0 ? (
         
          <TransactionsTable transactions={transactions} />
        ) : (
          /* 🔍 Empty State (No Gobindo Design, Pure Aesthetic UI) */
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 rounded-2xl bg-[#f8fafc]/50">
            <p className="text-sm font-semibold text-slate-400">
              No transactions recorded yet in the system.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}