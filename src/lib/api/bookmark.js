import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getBookmarks = async (email) => {
    
    return serverFetch(`/api/bookmarks?email=${email}`, { cache: 'no-store' })
};

export const getUserBookMarks = async () => {
    
    const user = await getUserSession()

    return getBookmarks(user.email)
};




export const deleteBookmark = async (id) => {
return serverFetch (`/api/bookmarks/${id}`, {
        method: 'DELETE'
    })
    
};