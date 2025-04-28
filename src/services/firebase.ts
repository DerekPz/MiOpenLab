import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD7bMXCGXxPPdj6wn6RfQnFOajHflzd4tw",
    authDomain: "laboratorio-ed3d0.firebaseapp.com",
    projectId: "laboratorio-ed3d0",
    storageBucket: "laboratorio-ed3d0.firebasestorage.app",
    messagingSenderId: "798399989715",
    appId: "1:798399989715:web:a9a8038292440478f5d126"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
