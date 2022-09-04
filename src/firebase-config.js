import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    "AIzaSyDqw2SYZJIDadrsiVCEXZfj8TmF6ttCVe8",
  authDomain: "edutech-f4ece.firebaseapp.com",
  databaseURL:
    "https://edutech-f4ece-default-rtdb.firebaseio.com",
  projectId: "edutech-f4ece",
  storageBucket: "edutech-f4ece.appspot.com",
  messagingSenderId: "450823695942",
  appId:
    "1:450823695942:web:92480f6beeec66cf826447",
  measurementId: "G-LKQRT84P1Q",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
