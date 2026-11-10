import { getAccessToken } from "../actions/token";
import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getPurchasedBooksOfReader = async (email) => {
  if (!email) return [];
  const token = await getAccessToken();
  if (!token) return [];
  return serverFetch(
    `/api/purchased-books/reader?email=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    },
    token,
  );
};


export const getPurchasedBooks = async () => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return [];
  }

  return getPurchasedBooksOfReader(user.email);
};

export const purchasedBookWriter = async (writerId) => {
  if (!writerId) return [];
  const token = await getAccessToken();
  if (!token) return [];
  return serverFetch(
    `/api/purchased-books/writer?writerId=${encodeURIComponent(writerId)}`,
    {
      cache: "no-store",
    },
    token,
  );
};



export const getPurchasedBooksOfWriter = async () => {
  const user = await getUserSession();
  const writerId = user?.id || user?.sub;

  if (!user || !writerId) {
    console.warn(
      "Unauthorized attempt or missing session data for writer sales.",
    );
    return [];
  }
  const token = await getAccessToken();
  if (!token) return [];
  const data = await serverFetch(
    `/api/purchased-books/writer?writerId=${encodeURIComponent(writerId)}`,
    {
      cache: "no-store",
    },
    token,
  );
  return Array.isArray(data) ? data : [];
};