import {combineReducers, createStore} from "redux";
import {pathReducer} from "./reducers/PathReducer";

const rootReducer = combineReducers({path: pathReducer});

const store = createStore(rootReducer);

export default store;