export const SET_SRC = 'SET_SRC';
export const SET_DEST = 'SET_DEST';
export const ADD_FIELD = 'SET_SRC';
export const REMOVE_FIELD = 'SET_DEST';

export function setSrc(srcPath) {
    return { type: SET_SRC, srcPath }
}

export function setDest(destPath) {
    return { type: SET_DEST, destPath }
}

export function addField(destPath) {
    return { type: ADD_FIELD, destPath }
}

export function removeField(destPath) {
    return { type: REMOVE_FIELD, destPath }
}
