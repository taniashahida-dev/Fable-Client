import { protectedFetch} from "../core/server";


export const getAdminRawAnalytics = async () => {
  return protectedFetch("/api/admin/raw-analytics", { cache: "no-store" });
};