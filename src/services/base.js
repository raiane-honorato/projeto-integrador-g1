import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQFHYn8-5RDsy8eR_hud7JZe-9tPqDdPQ",
  authDomain: "correte-do-bem.firebaseapp.com",
  projectId: "correte-do-bem",
  storageBucket: "correte-do-bem.appspot.com",
  messagingSenderId: "447128122444",
  appId: "1:447128122444:web:d28a913b63fec7dbb6f0e9",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default}
