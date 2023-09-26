// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOuczRQgGBrOi2rDCsDxTUxxUJramHoYg",
  authDomain: "iei-gallery-6d63f.firebaseapp.com",
  projectId: "iei-gallery-6d63f",
  storageBucket: "iei-gallery-6d63f.appspot.com",
  messagingSenderId: "216583653737",
  appId: "1:216583653737:web:93d640f562b0f9f7d695f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFirestore = getFirestore();


export {projectStorage , projectFirestore};

