import { serverMutation } from "../core/server";



export const createEbooks = async (ebooksData) => {
    return serverMutation('/api/ebooks', ebooksData);
}
