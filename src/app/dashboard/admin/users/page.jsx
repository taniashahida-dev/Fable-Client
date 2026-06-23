import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import ManageUsersTable from "./ManageUsersTable";
import { getusers } from "@/lib/api/users";

export default async function ManageUsersPage() {
  // Admin checking using your session component
  const sessionUser = await getUserSession();
  if (!sessionUser || sessionUser.role !== "admin") {
    redirect("/unauthorized");
  }

 const users = await getusers()

  return (
    <div className="w-full min-h-screen p-6  ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-slate-400 mt-1">Easily update user roles or terminate accounts.</p>
      </div>

      <ManageUsersTable initialUsers={users} />
    </div>
  );
}