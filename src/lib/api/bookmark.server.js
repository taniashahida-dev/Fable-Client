"use server";


import { getAccessToken } from "../actions/token";
import {  serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getUserBookMarks = async () => {

  const user = await getUserSession();
    if (!user?.email) return [];
      const token =await getAccessToken()
        if (!token) {
        return [];
    }

   return serverFetch(
    `/api/bookmarks?email=${user.email}&role=reader`,
    { cache: "no-store" },
    token
);
};




export const getWriterBookmarkedAnalytics = async () => {
    const user = await getUserSession();
    const writerId = user?.id || user?.sub;
    if (!writerId) return [];

    const token = await getAccessToken();
    if (!token) return [];

    return serverFetch(
    `/api/bookmarks?role=writer&writerId=${encodeURIComponent(writerId)}`,
    { cache: "no-store" },
    token
);
};