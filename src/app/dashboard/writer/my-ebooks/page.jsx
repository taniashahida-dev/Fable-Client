import { getUserSession } from "@/lib/core/session";
import { revalidatePath } from "next/cache";
import {  PencilToSquare } from '@gravity-ui/icons';
import DeleteBookButton from "@/components/Dashboard/DeleteBookButton";

import Link from "next/link";
import StatusDropdown from "@/components/Dashboard/StatusDropDown";
import { deleteEbook, getWriterEbooks, updateEbook } from "@/lib/api/ebooks";


const MyBooksPage = async () => {

    const user = await getUserSession();
    const writersEBook = await getWriterEbooks(user?.id) || [];
    
    const handleTogglePublish = async (bookId, targetStatus) => {
        'use server';
        await updateEbook(bookId, { status: targetStatus }); 
        revalidatePath('/dashboard/writer/my-ebooks'); 
    };

    const handleDelete = async (formData) => {
        'use server';
        const bookId = formData.get('bookId');
        
        if (bookId) {
            await deleteEbook(bookId);
            revalidatePath('/dashboard/writer/my-ebooks');
        }
    };

    // 💡 ফাংশনালিটি এবং কালার কোড আগের মতোই রাখা হয়েছে
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'unpublished':
            case 'draft':
                return 'bg-slate-50 text-slate-600 border-slate-200';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            default:
                return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        }
    };

    return (
       <div className="min-h-screen p-4 md:p-8 font-sans max-w-7xl mx-auto mt-6 lg:mt-1">
        <div className="space-y-6">
          
            {/* হেডার সেকশন */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl text-[#0F172A] font-serif font-black tracking-tight">
                        My Ebooks
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 hidden sm:block">Manage and monitor your published works</p>
                </div>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider shadow-xs">
                    Writer Panel
                </span>
            </div>

            {/* 📊 টেবিল কন্টেইনার */}
            <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse table-fixed"> 
                        <thead>
                           
                            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-extrabold tracking-wider bg-slate-50/75">
                                <th className="py-4 px-6 w-[40%]">Title</th>
                                <th className="py-4 px-4 w-[15%]">Price</th>
                                <th className="py-4 px-4 w-[20%]">Status</th>
                                <th className="py-4 px-6 text-right w-[25%] min-w-[160px] ">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            {writersEBook.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-16 text-center text-slate-400 font-medium text-base">
                                        No ebooks uploaded yet. Create your first masterpiece!
                                        </td>
                                    </tr>
                                ) : (
                                    writersEBook.map((book) => {
                                        
                                        return (
                                            <tr key={book._id} className="hover:bg-slate-50/50 transition-colors group">
                                                
                                                {/* কলাম ১: টাইটেল */}
                                                <td className="py-4 px-6 flex items-center gap-4">
                                                    <div className="w-10 h-14 bg-slate-50 rounded-lg overflow-hidden border border-slate-200/80 shadow-xs shrink-0 transition-transform group-hover:scale-[1.03]">
                                                        {book.coverImage ? (
                                                            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-400 font-black tracking-tighter">NO COVER</div>
                                                        )}
                                                    </div>
                                                    {/* 💡 এখানে truncate প্রপার্টি পারফেক্টলি কাজ করবে উইডথ ফিক্সড থাকায় */}
                                                    <div className="font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors truncate pr-4">
                                                        {book.title}
                                                    </div>
                                                </td>
                                                
                                                {/* কলাম ২: প্রাইস */}
                                                <td className="py-4 px-4 text-indigo-600 font-bold">
                                                    {book.price === 0 ? (
                                                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-bold">Free</span>
                                                    ) : (
                                                        `$${book.price.toFixed(2)}`
                                                    )}
                                                </td>

                                                {/* কলাম ৩: স্ট্যাটাস */}
                                                <td className="py-4 px-4">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border tracking-wider uppercase inline-block ${getStatusStyle(book.status)}`}>
                                                        {book.status || 'Pending'}
                                                    </span>
                                                </td>

                                                {/* কলাম ৪: অ্যাকশন */}
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <StatusDropdown
                                                            bookId={book._id} 
                                                            currentStatus={book.status} 
                                                            toggleAction={handleTogglePublish} 
                                                        />
                                                        <Link 
                                                            href={`/dashboard/writer/edit-ebook/${book._id}`}
                                                            className="p-2 bg-white hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-200 hover:border-indigo-600 flex items-center justify-center shadow-xs active:scale-95" 
                                                            title="Edit Ebook"
                                                        >
                                                            <PencilToSquare size={14} />
                                                        </Link>
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