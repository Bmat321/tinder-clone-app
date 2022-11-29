// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdoSJ7OFNNvfpZA35X-xsEM-0xki8T_nA",
  authDomain: "appli-e38dc.firebaseapp.com",
  databaseURL: "https://appli-e38dc.firebaseio.com",
  projectId: "appli-e38dc",
  storageBucket: "appli-e38dc.appspot.com",
  messagingSenderId: "373673010996",
  appId: "1:373673010996:web:cd5af71b6f42ec1a5ee761",
  measurementId: "G-0SNJJE7T2R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
