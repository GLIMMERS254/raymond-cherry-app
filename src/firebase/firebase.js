import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2Gx-Ei1FnOt94gaSjeGdOwhjDo2xJ6po",
  authDomain: "raymond-cherry-app.firebaseapp.com",
  databaseURL: "https://raymond-cherry-app-default-rtdb.firebaseio.com",
  projectId: "raymond-cherry-app",
  storageBucket: "raymond-cherry-app.appspot.com",
  messagingSenderId: "557590641277",
  appId: "1:557590641277:web:0f9fd20b035e6180404f14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);