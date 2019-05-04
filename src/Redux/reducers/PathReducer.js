import {ADD_FIELD, REMOVE_FIELD, SET_DEST, SET_SRC} from "../actions/PathActions";
import pathFields from '../../assets/camera-fields-map';

const initState = {
    srcPath: '',
    destPath: '',
    openFields: pathFields,
    usedFields: []
};

const getFieldIndex = (array, fieldName) => {
    return array.findIndex((field) => field.alias === fieldName);
};

const filterFieldByIndex = (array, fieldIndex) => {
    return array.filter((field, index) => {
        return !(index === fieldIndex)
    });
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
            const fieldIndex = getFieldIndex(state.openFields, action.fieldName);

            if (fieldIndex !== -1) {
                state = {
                    ...state,
                    usedFields: state.usedFields.concat(state.openFields[fieldIndex]),
                    openFields: filterFieldByIndex(state.openFields, fieldIndex)
                };
            }
            break;
        }
        case REMOVE_FIELD : {
            const fieldIndex = getFieldIndex(state.usedFields, action.fieldName);

            if (fieldIndex !== -1) {
                state = {
                    ...state,
                    openFields: state.openFields.concat(state.usedFields[fieldIndex]),
                    usedFields: filterFieldByIndex(state.usedFields, fieldIndex)
                };
            }
            break;
        }
        default:
            return state;
    }

    return state;
};