import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getWriterEbooks = async (writerId, status = '') => {
    let url = `${baseUrl}/api/ebooks?writerId=${writerId}`;
    if (status) {
        url += `&status=${status}`;
    }
    const res = await fetch(url, { cache: 'no-store' }); 
    return res.json();
}



export const getEbooks = async () => {
   return serverFetch(`/api/ebooks`)
};


export const getEBookById = async (bookId) => {
    const res = await fetch(`${baseUrl}/api/ebooks/${bookId}`, {
      
        cache: 'no-store' 
    });
    return res.json();
};



export const updateEbook = async (bookId, updatedData) => {
    const res = await fetch(`${baseUrl}/api/ebooks/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedData })
    });
    return res.json();
};


export const deleteEbook = async (bookId) => {
    const res = await fetch(`${baseUrl}/api/ebooks/${bookId}`, {
        method: 'DELETE'
    });
    return res.json();
};