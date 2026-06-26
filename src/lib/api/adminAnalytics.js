"use server";

import { getAccessToken } from "../actions/token";
import { serverFetch } from "../core/server";

export const getAdminRawAnalytics = async () => {
  const token = await getAccessToken()

  return serverFetch(
    "/api/admin/raw-analytics",
    { cache: "no-store" },
    token
  );
};