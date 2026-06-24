import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getWriters = async (writerId) => {
    return serverFetch(`/api/writers?writerId=${writerId}`);
}

export const getAllWriters = async () => {
    return serverFetch(`/api/writers`);
}


export const getLoggedInWriter = async () => {
    const user = await getUserSession();
    return getWriters(user?.id);
}


export const checkWriterVerification = async (writerId) => {
    if (!writerId) return { isVerified: false };
    
  
    return serverFetch(`/api/writer/check-verification/${writerId}`, {
        cache: 'no-store'
    });
}