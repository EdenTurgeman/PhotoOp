import {SET_PROCESS_STARTED, SET_PROCESS_ENDED, SET_PROCESS_SUCCESS, SET_PROCESS_NOT_SUCCESS} from "../actions/MoveActions";

const initState = {
    processRunning: false,
    processSuccess: false
};

export const moveReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PROCESS_STARTED: {
            state = {
                ...state,
                processRunning: true
            };
            break;
        }
        case SET_PROCESS_ENDED: {
            state = {
                ...state,
                processRunning: false
            };
            break;

        }
        case SET_PROCESS_SUCCESS: {
            state = {
                ...state,
                processSuccess: true
            };
            break;
        }
        case SET_PROCESS_NOT_SUCCESS: {
            state = {
                ...state,
                processSuccess: false
            };
            break;
        }
        default:
            return state;
    }

    return state;
};
