export function setItem(key: string, data: any) {
    localStorage.setItem(key, toJsonString(data));
}

export function getItem(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item) {
        return toJSON(item);
    }
}

export function removeItem(key: string) {
    return localStorage.removeItem(key);
}

export function toJsonString(data: object) {
    return JSON.stringify(data);
}

export function toJSON(data: string) {
    return JSON.parse(data);
}

export function clearLocalStore() {
    return localStorage.clear();
}