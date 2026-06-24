import Banner from "@/components/Home/Banner";
import EbookGenres from "@/components/Home/EbookGenres";
import FeaturedEbooks from "@/components/Home/FeaturedEbooks";
import TopWriters from "@/components/Home/TopWriters";
import { getEbooks } from "@/lib/api/ebooks";
import { getAllWriters } from "@/lib/api/writers";

export default async function Home() {
const allBooks = await getEbooks()
const allwriters = await getAllWriters()
  return (
    <div className="block pt-20 min-h-screen ">
      
       <Banner></Banner>
       <FeaturedEbooks allBooks={allBooks}></FeaturedEbooks>
     <TopWriters fetchedData={allwriters}></TopWriters>
     <EbookGenres></EbookGenres>
    </div>
  );
}