import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getPurchasedBooksOfReader = async (email) => {
  if (!email) return []; 
  
  return serverFetch(
    `/api/purchased-books/reader?email=${email}`,
    { cache: 'no-store' } 
  );
};


export const getPurchasedBooks = async () => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return [];
  }
  
  return getPurchasedBooksOfReader(user.email);
};