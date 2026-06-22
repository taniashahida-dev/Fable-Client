const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: options.method || 'GET', 
        headers: {
            ...((options.body && !(options.body instanceof FormData)) && { 'Content-Type': 'application/json' }),
            ...options.headers,
        },
        ...options
    });
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return res.json();
}