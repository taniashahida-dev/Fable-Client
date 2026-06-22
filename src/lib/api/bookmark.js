import { serverFetch } from "../core/server";



export const getUserBookmarks = async (email) => {
    
    return serverFetch(`/api/bookmarks?email=${email}`, { cache: 'no-store' })
};


export const deleteBookmark = async (id) => {
return serverFetch (`/api/bookmarks/${id}`, {
        method: 'DELETE'
    })
    
};