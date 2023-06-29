import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyA-Czz1mEeoFHXuM0SatcG_sIMytC0WHuU",
    authDomain: "task-management-b5ae5.firebaseapp.com",
    databaseURL: "https://task-management-b5ae5-default-rtdb.firebaseio.com",
    projectId: "task-management-b5ae5",
    storageBucket: "task-management-b5ae5.appspot.com",
    messagingSenderId: "1040741492532",
    appId: "1:1040741492532:web:47c99ba6845bd60de0a761"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;