import { getAccessToken } from "../actions/token";
import { serverFetch, serverMutation } from "../core/server";

const token = await getAccessToken()
export const getusers = async () => {
  
 return serverFetch(
    "/api/users",
    {},
    token
);
};

// ২. ইউজার ডিলিট করা
export const deleteUsers = async (id) => {
  return serverMutation(
    `/api/users/${id}`,
    {},
    "DELETE",
    token
);
};

// ৩. ইউজার আপডেট করা
export const updateUsers = async (id, newRole) => {
  return serverMutation(
    `/api/users/${id}`,
    {
        role: newRole,
    },
    "PATCH",
    token
);
};