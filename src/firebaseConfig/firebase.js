import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfabt9zYgr0b5aGzwoFCUS8FbCNaQOPvY",
  authDomain: "ambpelis-74e54.firebaseapp.com",
  projectId: "ambpelis-74e54",
  storageBucket: "ambpelis-74e54.appspot.com",
  messagingSenderId: "405737048662",
  appId: "1:405737048662:web:67158bd8348f815dba89f7"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;