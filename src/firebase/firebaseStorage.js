import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { v4 } from "uuid";

class firebaseStorageService {
  addPost = async (image) => {
    if (image == null) return "";
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
}

export default new firebaseStorageService();
