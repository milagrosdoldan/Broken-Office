// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXRd-R1amJgxv3a4ZzDNKhJVuueV0BNbo",
  authDomain: "broken-office-globant-269aa.firebaseapp.com",
  projectId: "broken-office-globant-269aa",
  storageBucket: "broken-office-globant-269aa.appspot.com",
  messagingSenderId: "619242536650",
  appId: "1:619242536650:web:1a71fb070929630f70be33",
  measurementId: "G-90RF5TJZEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
