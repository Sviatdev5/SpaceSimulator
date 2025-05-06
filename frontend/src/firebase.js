import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Імпортуємо Firestore

const firebaseConfig = {
    apiKey: "AIzaSyC7mo3vpcYipaot9Pm6y4_vfLqJBAKE2nI",
    authDomain: "spacesimulator-f829b.firebaseapp.com",
    projectId: "spacesimulator-f829b",
    storageBucket: "spacesimulator-f829b.firebasestorage.app",
    messagingSenderId: "985133134480",
    appId: "1:985133134480:web:9f0dc890da9465fb281e15",
    measurementId: "G-0J0M25E9Q5"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Змінюємо rtdb на db
  