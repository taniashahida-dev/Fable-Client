
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getWriterEbooks = async (writerId, status = '') => {
    let url = `${baseUrl}/api/ebooks?writerId=${writerId}`;
    if (status) {
        url += `&status=${status}`;
    }
    const res = await fetch(url, { cache: 'no-store' }); 
    return res.json();
}