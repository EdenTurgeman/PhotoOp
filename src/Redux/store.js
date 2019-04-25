import {combineReducers, createStore} from "redux";
import {pathReducer} from "./reducers/pathReducer";

const rootReducer = combineReducers({path: pathReducer});

const store = createStore(rootReducer);

export default store;