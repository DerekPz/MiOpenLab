import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

  // Exporta el firestore y auth para usarlos en otros archivos
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  
  export { firestore, auth };
