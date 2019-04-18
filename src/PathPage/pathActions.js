export const SET_SRC = 'SET_SRC';
export const SET_DEST = 'SET_DEST';

export function setSrc(srcPath) {
    return { type: SET_SRC, srcPath }
}

export function setDest(destPath) {
    return { type: SET_DEST, destPath }
}
