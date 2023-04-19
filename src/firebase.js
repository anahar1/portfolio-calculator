import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu_YDzWh-TkstCf08Jjrp6lL-R5kXewBs",
  authDomain: "lighthall-challenge-2.firebaseapp.com",
  projectId: "lighthall-challenge-2",
  storageBucket: "lighthall-challenge-2.appspot.com",
  messagingSenderId: "15103337115",
  appId: "1:15103337115:web:4a58d80586f1b12e999c3e",
  measurementId: "G-PK5VE4BXF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const addUser = async (name) => {
  try {
    const docRef = doc(firestore, "TaskManager", "data");
    await setDoc(docRef, { [name]: {} }, { merge: true });
  } catch (error) {
    console.log('Error saving user data to Firestore', error);
  }
};
