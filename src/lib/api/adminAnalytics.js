import { serverFetch } from "../core/server";


export const getAdminRawAnalytics = async () => {
  return serverFetch("/api/admin/raw-analytics", { cache: "no-store" });
};