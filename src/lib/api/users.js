'use server'

import { getAccessToken } from "../actions/token";
import { serverFetch, serverMutation } from "../core/server";


export const getusers = async () => {
  const token = await getAccessToken()
 return serverFetch(
    "/api/users",
    {},
    token
);
};

// ২. ইউজার ডিলিট করা
export const deleteUsers = async (id) => {
  const token = await getAccessToken()
  return serverMutation(
    `/api/users/${id}`,
    {},
    "DELETE",
    token
);
};

// ৩. ইউজার আপডেট করা
export const updateUsers = async (id, newRole) => {
  const token = await getAccessToken()
  return serverMutation(
    `/api/users/${id}`,
    {
        role: newRole,
    },
    "PATCH",
    token
);
};