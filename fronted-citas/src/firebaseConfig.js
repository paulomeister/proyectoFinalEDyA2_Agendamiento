// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoYE4kR9c8F_K9T4kYC_k7tOz8MHZk-n4",
  authDomain: "sistema-citas-1617f.firebaseapp.com",
  projectId: "sistema-citas-1617f",
  databaseURL: "https://sistema-citas-1617f-default-rtdb.firebaseio.com",
  storageBucket: "sistema-citas-1617f.appspot.com",
  messagingSenderId: "483663894334",
  appId: "1:483663894334:web:8976f166697e5d70ecfe6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
