export function fetch_url(url: string, options?:RequestInit):Promise<Response> {
    return fetch(url, options);
};