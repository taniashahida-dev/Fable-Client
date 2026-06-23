import { requireRole } from "@/lib/core/session";

const AdminLayout =async ({children}) => {
      await requireRole('admin')
    return children;
};

export default AdminLayout;