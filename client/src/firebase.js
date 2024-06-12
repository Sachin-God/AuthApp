// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.API_KEY,
  apiKey: "AIzaSyBkCzi0RZMhzpeAHcwUuRBBmTZgH8nhjvk",
  authDomain: "auth-8d2d7.firebaseapp.com",
  projectId: "auth-8d2d7",
  storageBucket: "auth-8d2d7.appspot.com",
  messagingSenderId: "414526339083",
  appId: "1:414526339083:web:7864a056f16a5a8babaf0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);