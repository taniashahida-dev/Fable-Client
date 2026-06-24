import { serverFetch } from "../core/server";

export const  getCombinedTransactions = async  ()=> {
  try {
    const data = await serverFetch("/api/admin/transactions", {
      cache: "no-store", 
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching admin transactions:", error);
    return [];
  }
}