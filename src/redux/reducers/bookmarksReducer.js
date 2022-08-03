import { ActionTypes } from "../constants/actionTypes";

const initialState = [];

export const bookmarksReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ActionTypes.BOOKMARKS:
      const newArr = payLoad;
      return newArr;

    default:
      return state;
  }
};
