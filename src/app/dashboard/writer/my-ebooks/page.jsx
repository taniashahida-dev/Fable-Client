import { getUserSession } from "@/lib/core/session";
import { revalidatePath } from "next/cache";
import { Eye, ArrowRightToSquare, SquareCheck, PencilToSquare } from '@gravity-ui/icons';
import DeleteBookButton from "@/components/Dashboard/DeleteBookButton";
import { deleteEbook, getWriterEbooks, updateEbook } from "@/lib/api/ebooks";
import Link from "next/link";

const MyBooksPage = async () => {

    const user = await getUserSession();
    const writersEBook = await getWriterEbooks(user?.id) || [];
    
const handleTogglePublish = async (formData) => {
    'use server';
    const bookId = formData.get('bookId');
    const currentStatus = formData.get('currentStatus');
    const newStatus = currentStatus?.toLowerCase() === 'published' ? 'unpublished' : 'published';
    
    await updateEbook(bookId, { status: newStatus }); // অবজেক্ট আকারে পাঠানো হলো
    revalidatePath('/dashboard/writer/my-ebooks'); // সঠিক ড্যাশবোর্ড পাথ
};

const handleDelete = async (formData) => {
    'use server';
    const bookId = formData.get('bookId');
    
    if (bookId) {
        await deleteEbook(bookId);
        revalidatePath('/dashboard/writer/my-ebooks'); // সঠিক ড্যাশবোর্ড পাথ
    }
};

   

    // High Contrast Status Pill styling for light backgrounds
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'bg-emerald-50 text-emerald-700 border-emerald-300';
            case 'unpublished':
            case 'draft':
                return 'bg-slate-100 text-slate-700 border-slate-300';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-300';
            default:
                return 'bg-indigo-50 text-indigo-700 border-indigo-300';
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-10 font-sans mt-10 max-w-7xl mx-auto">
            <div className="space-y-8">
             
                {/* Header Container Section — High Contrast Titles */}
                <div className="flex justify-between items-center border-b-2 border-slate-200 pb-5">
                    <h1 className="text-3xl text-[#0F172A] font-serif font-black tracking-tight">My Ebooks</h1>
                    <span className="text-xs bg-[#6366F1]/10 text-[#6366F1] border-2 border-[#6366F1]/20 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider">
                        Writer Panel
                    </span>
                </div>

                {/* 📊 CRUNCHY BRIGHT TABLE: Built with clear grid boundaries and sharp color contrast */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                {/* Header row explicitly tinted with clean grey block and Prussian Blue lettering */}
                                <tr className="border-b-2 border-slate-300 text-[#0F172A] uppercase text-xs font-black tracking-wide bg-slate-100/90">
                                    <th className="py-4 px-6">Title</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Sales</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-100 text-sm font-semibold text-slate-700">
                                {writersEBook.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-[#64748B] font-medium text-base">
                                            No ebooks uploaded yet. Create your first masterpiece!
                                        </td>
                                    </tr>
                                ) : (
                                    writersEBook.map((book) => {
                                        const isPublished = book.status?.toLowerCase() === 'published';
                                        return (
                                            <tr key={book._id} className="hover:bg-slate-50/80 transition-colors group">
                                                
                                                {/* Column 1: Artwork Cover Preview Frame + Bold Title Text */}
                                                <td className="py-4 px-6 flex items-center gap-4">
                                                    <div className="w-10 h-14 bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200 shadow-xs shrink-0">
                                                        {book.coverImage ? (
                                                            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[9px] text-[#64748B] font-black tracking-tighter">NO COVER</div>
                                                        )}
                                                    </div>
                                                    <div className="font-bold text-[#0F172A] group-hover:text-[#6366F1] transition-colors truncate max-w-[200px] md:max-w-xs">
                                                        {book.title}
                                                    </div>
                                                </td>
                                                
                                                {/* Column 2: Distinct Pricing Color Segment */}
                                                <td className="py-4 px-4 text-[#6366F1] font-bold">
                                                    {book.price === 0 ? 'Free' : `$${book.price.toFixed(2)}`}
                                                </td>

                                                {/* Column 3: Higher visibility badges */}
                                                <td className="py-4 px-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border-2 tracking-wider uppercase ${getStatusStyle(book.status)}`}>
                                                        {book.status || 'Pending'}
                                                    </span>
                                                </td>

                                                {/* Column 4: Counter Metrics display */}
                                                <td className="py-4 px-4 text-[#0F172A] font-mono font-bold text-sm">
                                                    {book.salesCount || '0'}
                                                </td>

                                                {/* Column 5: Action Button Containers */}
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2.5">
                                                        
                                                        {/* Publish / Unpublish Interactive Trigger Form */}
                                                        <form action={handleTogglePublish}>
                                                            <input type="hidden" name="bookId" value={book._id} />
                                                            <input type="hidden" name="currentStatus" value={book.status || 'pending'} />
                                                            <button 
                                                                type="submit"
                                                                className={`p-2 rounded-lg transition-all border-2 ${
                                                                    isPublished 
                                                                        ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-600 hover:text-white hover:border-amber-600' 
                                                                        : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                                                                }`} 
                                                                title={isPublished ? "Unpublish Ebook" : "Publish Ebook"}
                                                            >
                                                                {isPublished ? <ArrowRightToSquare size={15} /> : <SquareCheck size={15} />}
                                                            </button>
                                                        </form>

                                                     {/* Edit Button linked with Dynamic ID */}
<Link 
    href={`/dashboard/writer/edit-ebook/${book._id}`}
    className="p-2 bg-slate-50 hover:bg-[#6366F1] text-slate-500 hover:text-white rounded-lg transition-all border-2 border-slate-200 hover:border-[#6366F1] flex items-center justify-center" 
    title="Edit Ebook"
>
    <PencilToSquare size={15} />
</Link>

                                                        {/* View Details Feature Anchor Link */}
                                                        <button className="p-2 bg-slate-50 hover:bg-[#6366F1] text-slate-500 hover:text-white rounded-lg transition-all border-2 border-slate-200 hover:border-[#6366F1]" title="View Details">
                                                            <Eye size={15} />
                                                        </button>

                                                        {/* Action Handler Server Component Button */}
                                                        <DeleteBookButton bookId={book._id} deleteAction={handleDelete} />

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyBooksPage;