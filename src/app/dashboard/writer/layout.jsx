import { requireRole } from "@/lib/core/session";


const WriterLayout =async ({children}) => {
     await requireRole('writer')
    return children;
};

export default WriterLayout;