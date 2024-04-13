import { auth } from "@/firebase/firebase";
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile  } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password, firstName, lastName, phoneNumber) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // Update the user's profile with additional information
  await updateProfile(user, { displayName: `${firstName} ${lastName}` });

  // Create a document in the 'Users' collection with the user's additional information
  await setDoc(doc(db, 'Users', user.uid), {
    firstName,
    lastName,
    phoneNumber,
    email: user.email,
    userName: "",
    memberSince: "",
    apartmentsRented: "0",
    propertiesBought: "0",
  });

  return user;
};

export const getUserProfile = async (userId) => {
  const docRef = doc(db, 'Users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  const docRef = doc(db, 'Users', userId);
  await updateDoc(docRef, updatedData);
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
