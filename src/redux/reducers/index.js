import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { userReducer } from "./userReducers";
import { postReducer } from "./postReducer";

const reducers = combineReducers({
    loggedUser: authReducer,
    addedUsers: userReducer,
    addedPosts: postReducer
})

export default reducers;