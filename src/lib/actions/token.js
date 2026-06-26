'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

export const getAccessToken = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return tokenData.token;
};