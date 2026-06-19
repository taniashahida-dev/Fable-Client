import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";


const HomeLayout = ({chidren}) => {
    return (
        <div>
<Navbar></Navbar>
            <main className="min-h-screen">
  {chidren}
            </main>
          <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;