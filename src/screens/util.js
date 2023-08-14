export function isEmpty(str = '') {
    return str.trim().length === 0
}

export function isEmptyArray(arr = []) {
    return arr.length === 0
}

export const noop = ()=> {}