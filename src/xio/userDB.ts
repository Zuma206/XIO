import { firestore } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const usersRef = collection(firestore, "users");

export const getUserById = async (uid: string) => {
    const docRef = doc(usersRef, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

export const createUser = async (
    uid: string,
    username: string,
    gravatar: string
) => {
    const docRef = doc(usersRef, uid);
    await setDoc(docRef, { username, gravatar });
};
