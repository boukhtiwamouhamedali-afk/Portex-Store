import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9FjlNOqyg_FGsykbk5CJguYfTMNCNcI4",
  authDomain: "potrex-store.firebaseapp.com",
  projectId: "potrex-store",
  storageBucket: "potrex-store.firebasestorage.app",
  messagingSenderId: "404352322240",
  appId: "1:404352322240:web:5e234d4e1fa2ff245dfb25",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);