import { ActionTypes } from "../constants/actionTypes"

export const onAuth = (currentUser) => {
    return {
        type: ActionTypes.ON_AUTH,
        payLoad: currentUser
    }
}

export const addNewUser = (newUser) => {
    return {
        type: ActionTypes.ADD_NEW_USER,
        payLoad: newUser
    }
}