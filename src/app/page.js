import Banner from "@/components/Home/Banner";
import EbookGenres from "@/components/Home/EbookGenres";
import FeaturedEbooks from "@/components/Home/FeaturedEbooks";
import TopWriters from "@/components/Home/TopWriters";

export default function Home() {
  return (
    <div className="block pt-24 min-h-screen ">
      
       <Banner></Banner>
       <FeaturedEbooks></FeaturedEbooks>
     <TopWriters></TopWriters>
     <EbookGenres></EbookGenres>
    </div>
  );
}