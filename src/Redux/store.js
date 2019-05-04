import {combineReducers, createStore} from "redux";
import {pathReducer} from "./reducers/PathReducer";
import {moveReducer} from "./reducers/MoveReducer";

const rootReducer = combineReducers({path: pathReducer, move: moveReducer});

const store = createStore(rootReducer);

export default store;