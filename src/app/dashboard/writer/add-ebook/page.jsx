import { getUserSession } from '@/lib/core/session'; 
import AddEbookForm from './AddEbookForm';
import { checkWriterVerification } from '@/lib/api/writers'; 
import { ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const AddEbookPage = async () => {
    const user = await getUserSession();
    const writerId = user?.id || user?.sub; 

    let isVerified = false;

    if (writerId) {
    
        const data = await checkWriterVerification(writerId);
        isVerified = data?.isVerified; 
    }
    if (!isVerified) {
        return (
            <div className="w-full min-h-[80vh] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white border-2 border-slate-200 rounded-2xl p-8 text-center shadow-md space-y-6">
                    <div className="flex justify-center">
                        <div className="p-4 bg-[#6366F1]/10 text-[#6366F1] rounded-full">
                            <ShieldCheck size={40} className="stroke-2" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-serif font-black text-[#0F172A] tracking-tight">Unlock Writer Dashboard</h2>
                        <p className="text-sm text-slate-500">To publish your original masterpieces on Fable, a one-time verification fee is required.</p>
                    </div>

                    <form action="/api/writer-checkout" method="POST">
                        <input type="hidden" name="writerEmail" value={user?.email || ''} />
                        <input type="hidden" name="writerId" value={writerId || ''} />
                        <input type="hidden" name="writerName" value={user?.name || ''} />
                        
                        <button type="submit" className="w-full bg-[#0F172A] text-white font-bold rounded-xl py-3 px-4 flex items-center justify-center gap-2">
                            <CreditCard size={18} /> Pay Verification Fee <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full min-h-screen text-slate-100">
            <AddEbookForm writer={user} />
        </div>
    );
};

export default AddEbookPage;