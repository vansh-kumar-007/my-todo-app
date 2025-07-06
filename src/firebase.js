// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (replace these with your actual config)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKnz63C3NKHssHfgAL41xtZ_7ae0JY8g8",
  authDomain: "my-todo-app-vansh-e9fb0.firebaseapp.com",
  projectId: "my-todo-app-vansh-e9fb0",
  storageBucket: "my-todo-app-vansh-e9fb0.firebasestorage.app",
  messagingSenderId: "387205511681",
  appId: "1:387205511681:web:38eb2fb63d1e774b811e00",
  measurementId: "G-4Y8V11VVSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);