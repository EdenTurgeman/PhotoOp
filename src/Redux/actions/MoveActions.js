export const SET_PROCESS_STARTED = 'SET_PROCESS_STARTED';
export const SET_PROCESS_ENDED = 'REMOVE_FIELD';

export const SET_PROCESS_SUCCESS = 'SET_PROCESS_SUCCESS';
export const SET_PROCESS_NOT_SUCCESS = 'SET_PROCESS_NOT_SUCCESS';


export function setProcessStarted() {
    return { type: SET_PROCESS_STARTED, processRunning: true }
}

export function setProcessEnded() {
    return { type: SET_PROCESS_ENDED, processRunning: false }
}

export function setProcessSuccess() {
    return { type: SET_PROCESS_SUCCESS, processSuccess: true }
}

export function setProcessNotSuccess() {
    return { type: SET_PROCESS_NOT_SUCCESS, processSuccess: false }
}

