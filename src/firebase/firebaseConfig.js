import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-FVrwuwOzWu-VMOt9jNFkLVupfnmbO-8",
  authDomain: "socially-ceaa4.firebaseapp.com",
  projectId: "socially-ceaa4",
  storageBucket: "socially-ceaa4.appspot.com",
  messagingSenderId: "443168617185",
  appId: "1:443168617185:web:c25b9db775bd3472743da0",
  measurementId: "G-4NPELXFFQC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
