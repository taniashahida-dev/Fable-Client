import {  serverMutation } from "../core/server";

export const deleteBookmark = async (id) => {
return serverMutation(`/api/bookmarks/${id}`, {}, 'DELETE');
    
};