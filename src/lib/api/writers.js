import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getWriters = async (writerId) => {
    return serverFetch(`/api/writers?writerId=${writerId}`);
}

export const getLoggedInWriter = async () => {
    const user = await getUserSession();
    return getWriters(user?.id);
}