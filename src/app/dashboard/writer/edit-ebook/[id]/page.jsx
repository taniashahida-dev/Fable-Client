import { getUserSession } from '@/lib/core/session'; 
import EditEbookForm from './EditEbookForm';
import { getEBookById } from '@/lib/api/ebooks';
import EditEbookFallbackPage from '../page';

const EditEbookPage = async ({ params }) => {
    
    const resolvedParams = await params;
    const { id } = resolvedParams; 
    
    const user = await getUserSession();
    
  
    const ebookData = id ? await getEBookById(id) : null;
    if (!ebookData) {
        return <EditEbookFallbackPage />;
    }
    
    return (
        <div className="w-full min-h-screen text-slate-100">
            <EditEbookForm writer={user} ebook={ebookData} />
        </div>
    );
};

export default EditEbookPage;