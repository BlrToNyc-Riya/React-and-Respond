// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4GYNR_PXaqtXXzpFszBhZj6O8swi_x8M",
  authDomain: "e-learning-2dcea.firebaseapp.com",
  projectId: "e-learning-2dcea",
  storageBucket: "e-learning-2dcea.appspot.com",
  messagingSenderId: "180356325386",
  appId: "1:180356325386:web:a81c1d9181149865263ff3",
  measurementId: "G-E6PTZF59SF",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
