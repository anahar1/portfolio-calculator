import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu_YDzWh-TkstCf08Jjrp6lL-R5kXewBs",
  authDomain: "lighthall-challenge-2.firebaseapp.com",
  projectId: "lighthall-challenge-2",
  storageBucket: "lighthall-challenge-2.appspot.com",
  messagingSenderId: "15103337115",
  appId: "1:15103337115:web:4a58d80586f1b12e999c3e",
  measurementId: "G-PK5VE4BXF6",
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
          [name]: {},
        });
      } else {
        console.log(`Name '${name}' already exists in Firestore.`);
      }
    } else {
      await setDoc(docRef, {
        [name]: {},
      });
    }
  } catch (error) {
    console.log("Error adding name to Firestore", error);
  }
};

export const addTask = async ({ name, date, title, description, status }) => {
  try {
    if (name != null && title != null) {
      console.log("Adding task for name:", name);
      const userDocRef = doc(firestore, "TaskManager", "data", name, "tasks");
      await addDoc(collection(userDocRef, "tasks"), {
        title,
        date,
        description,
        status,
      });

      const tasksDocRef = collection(userDocRef, "tasks");
      const snapshot = await getDocs(tasksDocRef);
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return tasks;
    }
  } catch (error) {
    console.log("Error adding task to Firestore", error);
    return [];
  }
};

export const getTasks = async (name) => {
  try {
    if (name != null) {
      const userDocRef = doc(firestore, "TaskManager", "data", name, "tasks");
      const tasksCollRef = collection(userDocRef, "tasks");
      const snapshot = await getDocs(tasksCollRef);
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return tasks;
    }
  } catch (error) {
    console.log("Error fetching tasks from Firestore", error);
    return [];
  }
};

export const deleteTask = async (name, taskId) => {
  try {
    console.log("Deleting task with ID:", taskId, "for name:", name);
    const userDocRef = doc(firestore, "TaskManager", "data", name, "tasks", "tasks", taskId);
    await deleteDoc(userDocRef);
  } catch (error) {
    console.log("Error deleting task from Firestore", error);
    return [];
  }
};
