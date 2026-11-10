import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session'; 
import EditEbookForm from './EditEbookForm';
import { getEBookById } from '@/lib/api/ebooks';
import EditEbookFallbackPage from '../page';

const EditEbookPage = async ({ params }) => {
    
    const resolvedParams = await params;
    const { id } = resolvedParams; 
    
    const user = await getUserSession();
    
    let ebookData = null;
    if (id) {
        try {
            ebookData = await getEBookById(id);
        } catch {
            ebookData = null;
        }
    }
    if (!ebookData) {
        return <EditEbookFallbackPage />;
    }

    const currentUserId = String(user?.id || user?.sub || '');
    if (!currentUserId || String(ebookData.writerId || '') !== currentUserId) {
        redirect('/unauthorized');
    }
    
    return (
        <div className="w-full min-h-screen text-slate-100">
            <EditEbookForm writer={user} ebook={ebookData} />
        </div>
    );
};

export default EditEbookPage;