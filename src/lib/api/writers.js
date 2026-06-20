import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getwriters = async () => {
    return serverFetch(`/api/writers`);
}

export const getWritersBook = async (writersId) => {
    return serverFetch(`/api/my/ebooks?writersId=${writersId}`);
}

export const getLoggedInWriterEbooks = async () => {
    const user = await getUserSession();
    return getWritersBook(user?.id);
}