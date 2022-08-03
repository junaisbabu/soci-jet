import { ActionTypes } from "../constants/actionTypes";

const initialState = [];

export const followersReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ActionTypes.FOLLOWERS:
      const newArr = payLoad;
      return newArr;

    default:
      return state;
  }
};
