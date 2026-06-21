import { getEBookById } from "@/lib/api/ebooks";
import EbookDetails from "../EbookDetails";
import { getWriters } from "@/lib/api/writers";
import { getUserSession } from "@/lib/core/session";



const EbookDetailsPage =async ({params}) => {
    const {id} = await params
    console.log(id)
   const eBook = await getEBookById(id)
const user = await getUserSession()

   const writerData = await getWriters(eBook.writerId)
   const writer = Array.isArray(writerData) && writerData.length > 0 ? writerData[0] : null;
   console.log(writer)
//    console.log(eBook)
    return (
        <div className="min-h-screen">
           <EbookDetails bookData={eBook} currentUser={user}  writer={writer}></EbookDetails>
        </div>
    );
};

export default EbookDetailsPage;