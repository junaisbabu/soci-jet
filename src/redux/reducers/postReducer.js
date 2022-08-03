import { ActionTypes } from "../constants/actionTypes";

const initialState = [];

export const postReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ActionTypes.ADD_POSTS:
      const newArr = payLoad;
      return newArr;

    case ActionTypes.GET_POSTS:
      const copy = payLoad;
      return copy;

    default:
      return state;
  }
};
