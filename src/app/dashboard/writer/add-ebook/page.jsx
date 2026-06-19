

import { getUserSession } from '@/lib/core/session'; // আপনার সেশন মেথড অনুযায়ী
import AddEbookForm from './AddEbookForm';

const AddEbookPage = async () => {
    // ১. রাইটার বা ইউজারের সেশন ডাটা ফেচ করা হচ্ছে
    const user = await getUserSession();
    
    return (
        <div className="w-full min-h-screen text-slate-100">
            {/* রাইটার অবজেক্ট প্রপস আকারে ফর্মের ভেতর পাস করা হচ্ছে */}
            <AddEbookForm writer={user} />
        </div>
    );
};

export default AddEbookPage;