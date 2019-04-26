import {ADD_FIELD, REMOVE_FIELD, SET_DEST, SET_SRC} from "../actions/PathActions";
import pathFields from '../../assets/camera-fields-map';

const initState = {
    srcPath: '',
    destPath: '',
    openFields: pathFields,
    usedFields: []
};

const removeFieldByName = (array, fieldName) => {
    const fieldIndex = array.findIndex((field) => field.alias === fieldName);
    return array.splice(fieldIndex, 1)[0];
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
        case ADD_FIELD: {
            const usedItem = removeFieldByName(state.openFields);

            state = {
                ...state,
                usedFields: state.usedFields.concat(usedItem)
            };
            break;
        }
        case REMOVE_FIELD : {
            const openedField = removeFieldByName(state.usedFields);

            state = {
                ...state,
                openFields: state.openFields.concat(openedField)
            };
            break;
        }
        default:
            return state;
    }
    console.log(state);
    return state;
};
