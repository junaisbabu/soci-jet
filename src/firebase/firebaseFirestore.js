import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const postCollectionRef = collection(db, "posts");

class firestoreSevice {
  addDocument = async (collectionName, data) => {
    const collectionRef = collection(db, `${collectionName}`);
    const docRef = await addDoc(collectionRef, {
      ...data,
      timestamp: serverTimestamp(),
    });

    updateDoc(docRef, { docId: docRef.id });
  };

  setDocument = async (collectionRef, userId, data) => {
    return await setDoc(doc(db, `${collectionRef}`, userId), data);
  };

  updateDocument = (collectionRef, docId, updateData) => {
    const docRef = doc(db, `${collectionRef}`, docId);

    return updateDoc(docRef, updateData);
  };

  getDocument = (collectionRef, id) => {
    const docRef = doc(db, `${collectionRef}`, id);
    return getDoc(docRef);
  };

  deleteDocument = (collectionRef, id) => {
    const docRef = doc(db, `${collectionRef}`, id);
    return deleteDoc(docRef);
  };

  getDocuments = (collectionName) => {
    const collectionRef = collection(db, `${collectionName}`);
    return getDocs(collectionRef);
  };

  // Get all Posts When Add new post
  getPostsQuery = async () => {
    const q = await query(postCollectionRef, orderBy("timestamp", "desc"));

    return q;
  };

  getQuery = async (collectionName) => {
    const collectionRef = collection(db, `${collectionName}`);
    const q = await query(collectionRef);

    return q;
  };
}

export default new firestoreSevice();
