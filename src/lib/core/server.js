"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const serverFetch = async (path, options = {}, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
};

export const serverMutation = async (
  path,
  data = {},
  method = "POST",
  token,
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    const text = await res.text();
    let parsed = null;

    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { message: text };
      }
    }

    if (!res.ok) {
      return {
        error: true,
        status: res.status,
        message:
          parsed?.message ||
          parsed?.msg ||
          (typeof parsed?.error === "string" ? parsed.error : null) ||
          `API Error ${res.status}`,
      };
    }

    return parsed ?? { acknowledged: true };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: error?.message || "Network request failed",
    };
  }
};
