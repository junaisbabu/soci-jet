import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  currentUser: "",
};

export const authReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ActionTypes.ON_AUTH:
      return { ...state, currentUser: payLoad };

    default:
      return state;
  }
};
