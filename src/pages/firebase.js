import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDET6urlvl2JYWj62imY2uxhVXk0XaWzyg",
    authDomain: "finalproject-4c54a.firebaseapp.com",
    projectId: "finalproject-4c54a",
    storageBucket: "finalproject-4c54a.appspot.com",
    messagingSenderId: "1018578439981",
    appId: "1:1018578439981:web:5bd1d4977d026bec5fcda4"
  };
  const app= initializeApp(firebaseConfig); 

  export const db = getFirestore(app);
  export const storage = getStorage(app);
  
