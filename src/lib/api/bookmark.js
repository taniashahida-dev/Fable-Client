import { getAccessToken } from "../actions/token";
import {  serverMutation } from "../core/server";

export const deleteBookmark = async (id) => {
    const token = await getAccessToken()
 return serverMutation(
        `/api/bookmarks/${id}`,
        {},
        "DELETE",
        token
    );
    
};