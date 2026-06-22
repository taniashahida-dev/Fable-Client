import { serverFetch } from "../core/server";

export const deleteBookmark = async (id) => {
return serverFetch (`/api/bookmarks/${id}`, {
        method: 'DELETE'
    })
    
};