import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyC9xop7Nx65NgTKxZrpvxjBkTIkj2xY6OQ",
  authDomain: "vao-stars-encuesta.firebaseapp.com",
  projectId: "vao-stars-encuesta",
  storageBucket: "vao-stars-encuesta.appspot.com",
  messagingSenderId: "1027483978453",
  appId: "1:1027483978453:web:1e66789c2f9ca80193305c"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };