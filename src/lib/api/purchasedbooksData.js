import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getPurchasedBooksOfReader = async (email) => {
  if (!email) return [];

  return protectedFetch(`/api/purchased-books/reader?email=${email}`, {
    cache: "no-store",
  });
};

export const getPurchasedBooks = async () => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return [];
  }

  return getPurchasedBooksOfReader(user.email);
};

export const purchasedBookWriter = async (writerId) => {
  return protectedFetch(`/api/purchased-books/writer?writerId=${writerId}`, {
    cache: "no-store",
  });
};

export const getPurchasedBooksOfWriter = async () => {
  const user = await getUserSession();

  if (!user || !user.id) {
    console.warn(
      "Unauthorized attempt or missing session data for writer sales.",
    );
    return [];
  }
  const data = await protectedFetch(
    `/api/purchased-books/writer?writerId=${user.id}`,
    { cache: "no-store" },
  );
  return Array.isArray(data) ? data : [];
};
