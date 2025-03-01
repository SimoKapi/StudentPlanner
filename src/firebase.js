// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqoIZT5z0jFp_IZiPYT2WJ7CJpL4cdnHE",
  authDomain: "student-planner-1f801.firebaseapp.com",
  projectId: "student-planner-1f801",
  storageBucket: "student-planner-1f801.firebasestorage.app",
  messagingSenderId: "412011412030",
  appId: "1:412011412030:web:1691c746be846d57d8ef6f",
  measurementId: "G-VJ1ZW4DDML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth()

export { auth, db }