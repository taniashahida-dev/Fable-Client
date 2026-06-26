import { serverMutation } from "../core/server";
import { getAccessToken } from "./token";



export const addBookmark = async (info) => {
   
  try {
   const token = await getAccessToken()


    const result = await serverMutation(
      '/api/bookmarks',
      info,
      "POST",
      token
    );

    return result;
  } catch (error) {
    console.error("createEbooks Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};