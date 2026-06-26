import { getAccessToken } from "../actions/token";
import {  serverFetch } from "../core/server";

export const  getCombinedTransactions = async  ()=> {
  const token = await getAccessToken()
  try {
    const data = await  serverFetch(
    "/api/admin/transactions",
    {
        cache: "no-store",
    },
    token
);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching admin transactions:", error);
    return [];
  }
}