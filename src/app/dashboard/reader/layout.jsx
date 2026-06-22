import { requireRole } from "@/lib/core/session";


const ReaderLayout = async({children}) => {
     await requireRole('reader')
    return children;
};

export default ReaderLayout;