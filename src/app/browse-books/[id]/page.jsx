import { getEBookById } from "@/lib/api/ebooks";
import EbookDetails from "../EbookDetails";
import { getWriters } from "@/lib/api/writers";



const EbookDetailsPage =async ({params}) => {
    const {id} = await params
    console.log(id)
   const eBook = await getEBookById(id)


   const writerData = await getWriters()
   const writer = Array.isArray(writerData) && writerData.length > 0 ? writerData[0] : null;
   console.log(writer)
//    console.log(eBook)
    return (
        <div className="min-h-screen">
           <EbookDetails bookData={eBook}  writer={writer}></EbookDetails>
        </div>
    );
};

export default EbookDetailsPage;