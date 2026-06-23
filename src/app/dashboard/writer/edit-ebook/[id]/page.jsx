import { getUserSession } from '@/lib/core/session'; 
import EditEbookForm from './EditEbookForm';
import { getEBookById } from '@/lib/api/ebooks';

// Next.js ডাইনামিক রাউটে আইডি সবসময় params-এ আসে
const EditEbookPage = async ({ params }) => {
    // params অবজেক্টটি আনর‍্যাপ বা অ্যাওয়েট করে আইডি নেওয়া হলো
    const resolvedParams = await params;
    const { id } = resolvedParams; 
    
    const user = await getUserSession();
    
    // ডাটাবেজ থেকে নির্দিষ্ট বইয়ের ডাটা ফেচ করা হচ্ছে
    const ebookData = id ? await getEBookById(id) : null;
    
    return (
        <div className="w-full min-h-screen text-slate-100">
            <EditEbookForm writer={user} ebook={ebookData} />
        </div>
    );
};

export default EditEbookPage;