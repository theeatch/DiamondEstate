// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKmZR7MmM6bH46KpYqYV0IvZrfYE2Jbpk",
  authDomain: "diamond-estate-1a716.firebaseapp.com",
  projectId: "diamond-estate-1a716",
  storageBucket: "diamond-estate-1a716.appspot.com",
  messagingSenderId: "806450408587",
  appId: "1:806450408587:web:f47875afcc7b057b48388e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
