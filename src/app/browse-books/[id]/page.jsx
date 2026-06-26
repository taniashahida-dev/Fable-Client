
import EbookDetails from "../EbookDetails";
import { getWriters } from "@/lib/api/writers";
import { getUserSession } from "@/lib/core/session";
import { getUserBookMarks } from "@/lib/api/bookmark.server";
import { getEBookById } from "@/lib/api/ebooks";


const EbookDetailsPage = async ({ params }) => {
    const { id } = await params;
    
    const user = await getUserSession();
    const eBook = await getEBookById(id, user?.email); 


    const userBookmarks = await getUserBookMarks();
    
   
    const isBookmarkedBefore = Array.isArray(userBookmarks) && 
        userBookmarks.some(bookmark => bookmark.bookId === id);

    if (eBook) {
        eBook.isBookmarked = isBookmarkedBefore;
    }

    const writerData = await getWriters(eBook?.writerId);
    const writer = Array.isArray(writerData) && writerData.length > 0 ? writerData[0] : null;
  
    return (
        <div className="min-h-screen">
            <EbookDetails 
                bookData={eBook} 
                currentUser={user}  
                writer={writer}
            />
        </div>
    );
};

export default EbookDetailsPage;