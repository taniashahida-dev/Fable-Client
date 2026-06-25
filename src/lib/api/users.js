import { protectedFetch, serverFetch, serverMutation } from "../core/server";




export const getusers = async () => {
    return protectedFetch(`/api/users`);
}
export const deleteUsers = async (id) => {
   return serverMutation(`/api/users/${id}`, {}, "DELETE");
}

export const updateUsers = async (id,newRole) => {
   return serverMutation(`/api/users/${id}`, { role: newRole }, 'PATCH');
}

