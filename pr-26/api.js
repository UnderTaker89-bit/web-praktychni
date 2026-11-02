const API_URL = 'http://localhost:5000/postings';

export async function request(path = '', options = {}) {
    const response = await fetch(API_URL + path, {
        ...options,
        signal: options.signal ?? AbortSignal.timeout(10000)
    });
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`HTTP ${response.status}: ${body || response.statusText}`);
    }
    return response.status === 204 ? null : await response.json();
}

export async function loadData() {
    const data = await request();
    console.log('Відправлення PostService:', data);
    return data;
}
export const loadPosting = id => request('/' + encodeURIComponent(id));
export const createPosting = model => request('', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(model)
});
export const updatePosting = (id, model) => request('/' + encodeURIComponent(id), {
    method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(model)
});
export const deletePosting = id => request('/' + encodeURIComponent(id), {method: 'DELETE'});
