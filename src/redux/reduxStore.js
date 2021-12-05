import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authsReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authsReducer,
    form: formReducer,
    app: appReducer,
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;