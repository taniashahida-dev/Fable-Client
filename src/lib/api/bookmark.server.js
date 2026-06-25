'use server'

import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getUserBookMarks = async () => {
  const user = await getUserSession();
    if (!user?.email) return [];
    return serverFetch(`/api/bookmarks?email=${user.email}&role=reader`, { cache: 'no-store' });
};




export const getWriterBookmarkedAnalytics = async () => {
    const user = await getUserSession();
    if (!user?.email) return [];
    
    const writerName = user.name || "Tania"; 
    
    return serverFetch(`/api/bookmarks?email=${user.email}&role=writer&name=${writerName}`, { cache: 'no-store' });
};