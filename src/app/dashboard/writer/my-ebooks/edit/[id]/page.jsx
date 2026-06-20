import { getSingleEbook } from "@/lib/api/ebooks";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";

const EditBookPage = async ({ params }) => {
    const { id } = await params; 
    const user = await getUserSession();
// console.log(id)
    // Fetch single ebook data from backend using the ID
    const bookData = await getSingleEbook(id); 

    return (
        <div className="min-h-screen text-slate-200 p-6 md:p-10 font-sans">
            <div className="max-w-2xl mx-auto bg-[#161b2e] border border-slate-900 p-8 rounded-2xl shadow-2xl space-y-6">
                <div>
                    <h1 className="text-2xl text-[#f59e0b] font-bold">Edit Ebook</h1>
                    <p className="text-sm text-slate-400 mt-1">Book ID: <span className="font-mono text-indigo-400">{id}</span></p>
                </div>

                <hr className="border-slate-900" />

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Book Title</label>
                        <input 
                            type="text" 
                            name="title"
                            defaultValue={bookData?.title || ""} 
                            className="w-full bg-[#111524] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Price ($)</label>
                        <input 
                            type="number" 
                            name="price"
                            defaultValue={bookData?.price || 0} 
                            className="w-full bg-[#111524] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Link href="/dashboard/writer/my-ebooks" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition text-sm font-medium">
                            Cancel
                        </Link>
                        <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition text-sm font-medium">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookPage;