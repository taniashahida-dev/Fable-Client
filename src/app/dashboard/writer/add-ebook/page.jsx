

import { getUserSession } from '@/lib/core/session'; 
import AddEbookForm from './AddEbookForm';

const AddEbookPage = async () => {
   
    const user = await getUserSession();
    
    return (
        <div className="w-full min-h-screen text-slate-100">
        
            <AddEbookForm writer={user} />
        </div>
    );
};

export default AddEbookPage;