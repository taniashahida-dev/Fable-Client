import { requireRole } from "@/lib/core/session";

const AdminLayout =async ({children}) => {
      await requireRole('recruiter')
    return children;
};

export default AdminLayout;