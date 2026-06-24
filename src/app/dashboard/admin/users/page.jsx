import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import ManageUsersTable from "./ManageUsersTable";
import { getusers } from "@/lib/api/users";

export default async function ManageUsersPage() {
  const sessionUser = await getUserSession();
  if (!sessionUser || sessionUser.role !== "admin") {
    redirect("/unauthorized");
  }

  const users = await getusers();

  return (
    <div className="w-full min-h-screen p-6 ">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold ">Manage Users</h1>
        <p className="text-xs text-slate-800 mt-1">Easily update user roles or terminate accounts.</p>
      </div>

      <ManageUsersTable initialUsers={users} />
    </div>
  );
}