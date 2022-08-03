import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { userReducer } from "./userReducers";
import { postReducer } from "./postReducer";
import { followingReducer } from "./followingReducer";
import { followersReducer } from "./follwersReducer";
import { bookmarksReducer } from "./bookmarksReducer";

const reducers = combineReducers({
  loggedUser: authReducer,
  addedUsers: userReducer,
  addedPosts: postReducer,
  followingUsers: followingReducer,
  followers: followersReducer,
  bookmarks: bookmarksReducer,
});

export default reducers;
