
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyyZTOFhsk4eYqMUE0PAJEb8OIvovG-2w",
  authDomain: "video-51ab9.firebaseapp.com",
  projectId: "video-51ab9",
  storageBucket: "video-51ab9.appspot.com",
  messagingSenderId: "941590302462",
  appId: "1:941590302462:web:d3c80d4b01519a2025dfaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;