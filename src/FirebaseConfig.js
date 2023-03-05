import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; //

const firebaseConfig = {
    apiKey: "AIzaSyD8r358--s_dypc1TuEG3S-M7IH7-XgU64",
    authDomain: "must-do.firebaseapp.com",
    projectId: "must-do",
    storageBucket: "must-do.appspot.com",
    messagingSenderId: "403335231706",
    appId: "1:403335231706:web:6f1710a9bbb2ca84348de3"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };

export default firebaseConfig;