import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");
const postCollectionRef = collection(db, "posts");
class firestoreSevice {
  addNewUsers = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  updateUserDetails = (id, updateData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, updateData);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };

  addPosts = (newPost) => {
    return addDoc(postCollectionRef, newPost);
  };

  // Implement firebase function
  getAllPosts = () => {
    return getDocs(postCollectionRef);
  };

  deletePost = (id) => {
    const postDoc = doc(db, "posts", id);
    return deleteDoc(postDoc);
  };

  // Get all Posts When Add new post
  getPosts = async () => {
    const snapshot = await this.getAllPosts();

    const posts = await snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    console.log('posts firebase: ', posts);
    return posts;
  };
}

export default new firestoreSevice();
