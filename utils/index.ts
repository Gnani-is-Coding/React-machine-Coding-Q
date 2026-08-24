export function getlocalStorageItem(key: string) {
    return localStorage.getItem(key)
}

export function setLocalStorageItem<T>(key: string, value: T) {
    return localStorage.setItem(key, String(value))
}