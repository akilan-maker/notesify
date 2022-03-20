// v9 compat packages are API compatible with v8 code
import { useState, useEffect } from "react";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import {firestore} from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8p9trgNszEpOOgTibZ4t9LGVhayn1J88",
  authDomain: "notesify-1f271.firebaseapp.com",
  projectId: "notesify-1f271",
  storageBucket: "notesify-1f271.appspot.com",
  messagingSenderId: "443831924586",
  appId: "1:443831924586:web:29f4e88ffb1786385fd713",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function UserData() {
  const [currentUser, setCurrent] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrent(user));
    return unsub;
  }, []);

  return currentUser;
}

// export function Handlesafe() {
//   const listRef = firestore().collection("lists");
//   // const userDocument = listRef.doc("JcXJduwFg9PczpWAA6Gk");
//   console.log("poop");
//   return;
// }

export function logout() {
  return signOut(auth);
}
