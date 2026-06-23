import { serverFetch } from "../core/server";




export const getWriterEbooks = async (writerId, status = '') => {
  
    let path = `/api/ebooks?writerId=${writerId}`;
    if (status) {
        path += `&status=${status}`;
    }
    return serverFetch(path, { cache: 'no-store' });
}

export const getEbooks = async (filters = {}) => {
  const { search = "", category = "all", availability = "all", sortBy = "newest" } = filters;
  const queryString = `?search=${search}&category=${category}&availability=${availability}&sortBy=${sortBy}`;
  return serverFetch(`/api/ebooks${queryString}`);
};



export const getEBookById = async (bookId) => {
    return serverFetch(`/api/ebooks/${bookId}`, {
        cache: 'no-store' 
    })
};
export const updateEbook = async (bookId, updatedData) => {
    return serverFetch(`/api/ebooks/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( updatedData )
    })
};


export const deleteEbook = async (bookId) => {
    return serverFetch (`/api/ebooks/${bookId}`, {
        method: 'DELETE'
    })
};