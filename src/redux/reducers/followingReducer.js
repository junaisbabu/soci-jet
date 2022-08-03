import { ActionTypes } from "../constants/actionTypes";

const initialState = [];

export const followingReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ActionTypes.FOLLOWING:
      const newArr = payLoad;
      return newArr;

    default:
      return state;
  }
};
