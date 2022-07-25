import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    users: '',
}

export const userReducer = (state = initialState, {type, payLoad}) => {
    switch(type) {
        case ActionTypes.ADD_NEW_USER:
            return {...state, users: payLoad}

        default: return state;
    }
}