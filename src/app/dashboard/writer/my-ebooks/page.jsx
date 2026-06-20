import { getWriterEbooks } from "@/lib/api/ebooks";
import { getUserSession } from "@/lib/core/session";
import { Eye, TrashBin, Pencil } from '@gravity-ui/icons';

const MyBooksPage =async () => {

    const user = await getUserSession()
    // console.log(user)
    const writersEBook = await getWriterEbooks(user.id) || []
   const totalEarnings = writersEBook.reduce((acc, book) => acc + (book.salesCount ? book.salesCount * book.price : 0), 0);
    const totalSales = writersEBook.reduce((acc, book) => acc + (book.salesCount || 0), 0);
    const publishedCount = writersEBook.filter(book => book.status?.toLowerCase() === 'published').length;

   
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'pending':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'draft':
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            default:
                return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        }
    };

    return (
        <div className="min-h-screen  text-slate-200 p-6 md:p-10 font-sans">
            <div className=" mx-auto space-y-8">
                
                
                <div className="flex justify-between items-center border-b border-slate-900 pb-5">
                    <h1 className="text-3xl text-[#f59e0b] font-bold tracking-tight">My Ebooks</h1>
                    <span className="text-sm bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-medium">
                        Writer Panel
                    </span>
                </div>

              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                    <div className="bg-[#161b2e] border border-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Earnings</span>
                        <h2 className="text-4xl font-bold text-indigo-400 mt-2">${totalEarnings.toFixed(2)}</h2>
                    </div>

                     <div className="bg-[#161b2e] border border-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</span>
                        <h2 className="text-4xl font-bold text-slate-200 mt-2">{totalSales}</h2>
                    </div>

                   
                    <div className="bg-[#161b2e] border border-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Published Books</span>
                        <h2 className="text-4xl font-bold text-emerald-400 mt-2">{publishedCount} <span className="text-sm text-slate-500 font-normal">/ {writersEBook.length} total</span></h2>
                    </div>
                </div>

              
                <div className="bg-[#161b2e] border border-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-900 text-slate-500 uppercase text-xs font-bold tracking-wider bg-[#111524]">
                                    <th className="py-4 px-6">Title</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Sales</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900/60">
                                {writersEBook.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-10 text-center text-slate-500 text-sm">
                                            No ebooks uploaded yet. Create your first masterpiece!
                                        </td>
                                    </tr>
                                ) : (
                                    writersEBook.map((book) => (
                                        <tr key={book._id} className="hover:bg-[#1c223a]/40 transition-colors group">
                                            {/* কভার এবং টাইটেল */}
                                            <td className="py-4 px-6 flex items-center gap-4">
                                                <div className="w-10 h-14 bg-slate-800 rounded-lg overflow-hidden border border-slate-700/50 shadow-md shrink-0">
                                                    {book.coverImage ? (
                                                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-indigo-950 flex items-center justify-center text-[10px] text-indigo-400 font-bold">NO CV</div>
                                                    )}
                                                </div>
                                                <div className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-xs">
                                                    {book.title}
                                                </div>
                                            </td>
                                            
                                         
                                            <td className="py-4 px-4 text-indigo-300 font-medium">
                                                {book.price === 0 ? 'Free' : `$${book.price}`}
                                            </td>
        <td className="py-4 px-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border tracking-wide uppercase ${getStatusStyle(book.status)}`}>
                                                    {book.status || 'Pending'}
                                                </span>
                                            </td>
       <td className="py-4 px-4 text-slate-400 font-mono">
                                                {book.salesCount || '0'}
                                            </td>

                                  
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 bg-slate-800/80 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-lg transition border border-slate-700/30" title="Edit Ebook">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button className="p-2 bg-slate-800/80 hover:bg-emerald-600 text-slate-400 hover:text-white rounded-lg transition border border-slate-700/30" title="View Details">
                                                        <Eye size={14} />
                                                    </button>
                                                    <button className="p-2 bg-slate-800/80 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition border border-slate-700/30" title="Delete">
                                                        <TrashBin size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
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