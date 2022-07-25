import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = (email, password) => {
  console.log("sign up");
  return createUserWithEmailAndPassword(auth, email, password);
};

export const userSignOut = () => {
  return signOut(auth);
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
