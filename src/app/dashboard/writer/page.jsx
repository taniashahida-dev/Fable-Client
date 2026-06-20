import { getUserSession } from "@/lib/core/session";


const WriterPage = async() => {

    const user = await  getUserSession()
 
    return (
        <div>
            i am a writer
            
        </div>
    );
};

export default WriterPage;