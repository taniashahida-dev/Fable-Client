'use server';


import { serverMutation } from "../core/server";
import { getAccessToken } from "./token";


export const createEbooks = async (ebooksData) => {
   
  try {
   const token = await getAccessToken()

    console.log("Submitting Ebook Payload Data:", ebooksData);

    const result = await serverMutation(
      "/api/ebooks",
      ebooksData,
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