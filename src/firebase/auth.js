import { auth } from "@/firebase/firebase";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
    return auth.signOut();
};


export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};
