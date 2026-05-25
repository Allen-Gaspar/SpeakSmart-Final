import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy5_jwWk8eumgpdGxP7Z5x7lYdtBySYrM",
  authDomain: "speaksmart3.firebaseapp.com",
  projectId: "speaksmart3",
  storageBucket: "speaksmart3.firebasestorage.app",
  messagingSenderId: "976273587511",
  appId: "1:976273587511:web:34081448fa9c65b3ba2eb2",
  measurementId: "G-HZ9FGBGN0Q"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider };
