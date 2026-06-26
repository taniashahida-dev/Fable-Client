import { getAccessToken } from "../actions/token";
import {  serverFetch, serverMutation } from "../core/server";




export const getWriterEbooks = async (writerId, status = '') => {
  
    let path = `/api/ebooks?writerId=${writerId}`;
    if (status) {
        path += `&status=${status}`;
    }
    return serverFetch(path);
}

export const getEbooks = async (filters = {}) => {
  const { search = "", category = "all", availability = "all", sortBy = "newest" } = filters;
  const queryString = `?search=${search}&category=${category}&availability=${availability}&sortBy=${sortBy}`;
  return serverFetch(`/api/ebooks${queryString}`);
};


export const getEBookById = async (bookId, email = '') => {
    
    const path = email ? `/api/ebooks/${bookId}?email=${email}` : `/api/ebooks/${bookId}`;
    return serverFetch(path, {
        cache: 'no-store' 
    });
};


export const updateEbook = async (bookId, updatedData) => {
    const token = await getAccessToken()
  return serverMutation(
    `/api/ebooks/${bookId}`,
    updatedData,
    "PATCH",
    token
);
};


export const deleteEbook = async (bookId) => {
    const token = await getAccessToken()
   return serverMutation(
    `/api/ebooks/${bookId}`,
    {},
    "DELETE",
    token
);
};