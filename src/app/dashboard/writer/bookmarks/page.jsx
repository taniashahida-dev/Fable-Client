import { getWriterBookmarkedAnalytics } from '@/lib/api/bookmark.server';
import { Bookmark, Eye, BookOpen, Person } from '@gravity-ui/icons';
import Link from "next/link";

const WriterBookmarksPage = async () => {
   
    const bookmarkAnalytics = await getWriterBookmarkedAnalytics() || [];

    return (
        <div className="min-h-screen p-6 md:p-10 font-sans mt-16 max-w-7xl mx-auto">
            <div className="space-y-8">
                
                {/* 📌 Header Title - High Contrast Bright Layout */}
                <div className="flex justify-between items-center border-b-2 border-slate-200 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#6366F1]/10 text-[#6366F1] rounded-xl border border-[#6366F1]/20">
                            <Bookmark size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                            <h1 className="text-3xl text-[#0F172A] font-serif font-black tracking-tight">Bookmark Tracker</h1>
                            <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mt-0.5">See who saved your creative works</p>
                        </div>
                    </div>
                    <span className="text-xs bg-slate-100 text-[#0F172A] border-2 border-slate-200 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider">
                        Total Saved: {bookmarkAnalytics.length}
                    </span>
                </div>

                {/* 🖼️ GALLERY VIEW GRID */}
                {bookmarkAnalytics.length === 0 ? (
                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto mt-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4 border border-slate-200">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A]">No bookmarked masterpieces</h3>
                        <p className="text-sm text-[#64748B] mt-1 font-medium">
                            When readers bookmark your ebooks for inspiration or reference, they will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {bookmarkAnalytics.map((item) => {
                            // আপনার ডেটাবেজ (image_8e2769.jpg) অনুযায়ী টাইটেল ও আইডি ফিল্ড ম্যাপিং
                            const title = item.bookName || item.title;
                            const bookId = item.bookId || item._id;

                            return (
                                <div 
                                    key={item._id} 
                                    className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#6366F1]/40 transition-all flex flex-col group"
                                >
                                    {/* Book Cover Design Grid */}
                                    <div className="relative aspect-[3/4] bg-slate-50 border-b-2 border-slate-100 overflow-hidden flex items-center justify-center p-4">
                                        {item.coverImage ? (
                                            <img 
                                                src={item.coverImage} 
                                                alt={title} 
                                                className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-24 h-36 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-[#64748B] font-black tracking-tighter shadow-inner">
                                                NO COVER
                                            </div>
                                        )}
                                        
                                        {item.category && (
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0F172A] border border-slate-200 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Book Meta Details Block */}
                                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-[#0F172A] text-base line-clamp-1 group-hover:text-[#6366F1] transition-colors" title={title}>
                                                {title}
                                            </h3>
                                           
                                        </div>

                                        {/* 👤 READER INFO BLOCK (কার্ডের ভেতরের এক্সক্লুসিভ চেঞ্জার) */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-0.5">
                                            <p className="text-[10px] text-[#64748B] font-black uppercase tracking-wider">Bookmarked By</p>
                                            <div className="flex items-center gap-1.5 text-slate-800">
                                                <Person size={13} className="text-[#6366F1]" />
                                                <span className="text-xs font-bold truncate">{item.userName || "Anonymous"}</span>
                                            </div>
                                            
                                        </div>

                                        {/* Pricing + Action Footer Segment */}
                                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                            <span className="text-[#6366F1] font-black text-sm">
                                                {item.price === 0 || !item.price ? 'Free' : `$${Number(item.price).toFixed(2)}`}
                                            </span>

                                            {/* Action Control - View Details Button */}
                                            <Link 
                                                href={`/ebooks/${bookId}`}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-[#6366F1] text-slate-600 hover:text-white rounded-lg transition-all border-2 border-slate-200 hover:border-[#6366F1] text-xs font-bold uppercase tracking-wider"
                                                title="View Ebook Details"
                                            >
                                                <Eye size={13} className="stroke-[2.5]" />
                                                <span>View</span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default WriterBookmarksPage;