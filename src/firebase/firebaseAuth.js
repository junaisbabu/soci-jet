import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const userSignOut = () => {
  return signOut(auth);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
