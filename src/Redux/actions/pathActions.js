export const SET_SRC = 'SET_SRC';
export const SET_DEST = 'SET_DEST';
export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const SWAP_FIELDS = 'SWAP_FIELDS';

export function setSrc(srcPath) {
    return { type: SET_SRC, srcPath }
}

export function setDest(destPath) {
    return { type: SET_DEST, destPath }
}

export function addField(fieldName) {
    return { type: ADD_FIELD, fieldName: fieldName }
}

export function removeField(fieldName) {
    return { type: REMOVE_FIELD, fieldName }
}

export function updateField(fieldIndex, fieldValue) {
    return { type: UPDATE_FIELD, fieldValue, fieldIndex}
}

export function swapFields(sourceIndex, destinationIndex) {
    return { type: SWAP_FIELDS, sourceIndex, destinationIndex}
}

