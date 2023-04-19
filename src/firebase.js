import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, setDoc, getDoc, collection, addDoc } from "@firebase/firestore";

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
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (!data[name]) {
        await updateDoc(docRef, {
          [name]: {}
        });
      } else {
        console.log(`Name '${name}' already exists in Firestore.`);
      }
    } else {
      await setDoc(docRef, {
        [name]: {}
      });
    }
  } catch (error) {
    console.log('Error adding name to Firestore', error);
  }
};

export const addTask = async ({ date, title, description, status }) => {
  try {
    console.log('Adding task for name:', title);
    const userDocRef = doc(firestore, "TaskManager", "data", title);
    await addDoc(collection(userDocRef, "tasks"), {
      date,
      description,
      status
    });
  } catch (error) {
    console.log('Error adding task to Firestore', error);
  }
};

