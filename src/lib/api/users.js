import { serverFetch } from "../core/server";




export const getusers = async () => {
    return serverFetch(`/api/users`);
}
export const deleteUsers = async (id) => {
    return serverFetch(`/api/users/${id}`,{ method: "DELETE" });
}

export const updateUsers = async (id,newRole) => {
    return serverFetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { role: newRole })
    })
}

