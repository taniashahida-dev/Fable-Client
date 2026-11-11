'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

export const getAccessToken = async () => {
  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    return tokenData?.token || null;
  } catch (error) {
    return null;
  }
};