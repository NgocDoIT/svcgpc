import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDvl3nu3tOKzTPSOny8pJwjLYKdR3v6nCU",
  authDomain: "svcgpc-a2e5a.firebaseapp.com",
  projectId: "svcgpc-a2e5a",
  storageBucket: "svcgpc-a2e5a.firebasestorage.app",
  messagingSenderId: "182202761629",
  appId: "1:182202761629:web:6c5fe35fa701871d256f74",
  measurementId: "G-WTT3X2KZ2L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Initialize and export Firestore
