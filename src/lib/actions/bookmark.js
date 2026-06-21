import { serverMutation } from "../core/server";



export const addBookmark = async (info) => {
   return serverMutation('/api/bookmarks',info)
};