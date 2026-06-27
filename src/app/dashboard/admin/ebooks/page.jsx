import { getEbooks } from "@/lib/api/ebooks";
import ManageEbooksTable from "./ManageEbooksTable";

export default async function ManageEbooksPage() {
  const ebooksData = await getEbooks({});

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Manage All Ebooks
        </h1>
        <p className="text-xs md:text-sm text-slate-700">
          Approve new submissions, toggle availability, or remove listings.
        </p>
      </div>

      <ManageEbooksTable initialBooks={ebooksData} />
    </div>
  );
}
