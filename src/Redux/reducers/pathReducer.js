import {SET_DEST, SET_SRC} from "../actions/pathActions";

const initState = {
    srcPath: '',
    destPath: ''
};

export const pathReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_SRC: {
            state = {
                ...state,
                srcPath: action.srcPath
            };
            break;
        }
        case SET_DEST: {
            state = {
                ...state,
                destPath: action.destPath
            };
            break;
        }
        default:
            return state;
    }
    console.log(state);
    return state;
};
