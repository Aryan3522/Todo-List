import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

export const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};