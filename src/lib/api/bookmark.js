


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserBookmarks = async (email) => {
    const res = await fetch(`${baseUrl}/api/bookmarks?email=${email}`, { cache: 'no-store' });
    return res.json();
};


export const deleteBookmark = async (id) => {
    const res = await fetch(`${baseUrl}/api/bookmarks/${id}`, {
        method: 'DELETE'
    });
    return res.json();
};