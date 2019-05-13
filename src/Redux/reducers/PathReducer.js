import {ADD_FIELD, REMOVE_FIELD, SET_DEST, SET_SRC, SWAP_FIELDS, UPDATE_FIELD} from "../actions/PathActions";
import pathFields from '../../assets/camera-fields-map';
const {ipcRenderer} = window;

const {usedFields, srcPath, destPath} = ipcRenderer.sendSync('getFullSettings');

const openFields = pathFields.filter(openField =>
    usedFields.findIndex(usedField => usedField.alias === openField.alias) === -1
);

const initState = {
    srcPath: srcPath,
    destPath: destPath,
    openFields: openFields,
    usedFields: usedFields
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
        case UPDATE_FIELD : {
            const field = state.usedFields[action.fieldIndex];

            if (field) {
                field.fieldValue = action.fieldValue;
                state = {
                    ...state,
                    usedFields: [...state.usedFields]
                };
            }
            break;
        }
        case SWAP_FIELDS : {
            const {sourceIndex, destinationIndex} = action;

            if (sourceIndex !== destinationIndex) {
                const orderedUsedList = [...state.usedFields];
                const [removedField] = orderedUsedList.splice(sourceIndex, 1);
                orderedUsedList.splice(destinationIndex, 0, removedField);

                state = {
                    ...state,
                    usedFields: orderedUsedList
                }
            }
            break;
        }
        default:
            return state;
    }

    return state;
};
