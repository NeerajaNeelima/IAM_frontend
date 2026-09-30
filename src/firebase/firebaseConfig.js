
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj0w4OdeZm_IRFVUXOi3x3pksLmDmKf-0",
  authDomain: "phone-number-authenticat-1d945.firebaseapp.com",
  projectId: "phone-number-authenticat-1d945",
  storageBucket: "phone-number-authenticat-1d945.firebasestorage.app",
  messagingSenderId: "800165920606",
  appId: "1:800165920606:web:d01459960523e071da99cf",
  measurementId: "G-K5J5758P6M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);