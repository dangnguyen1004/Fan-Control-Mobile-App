import firebase from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// import "firebase/firestore";
//import "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyD1LzPcLAWMZyK5ReigpdeERbsLZhU65yg",
    authDomain: "iotdatabase-1fe93.firebaseapp.com",
    databaseURL: "https://iotdatabase-1fe93-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iotdatabase-1fe93",
    storageBucket: "iotdatabase-1fe93.appspot.com",
    messagingSenderId: "719384932871",
    appId: "1:719384932871:web:b67f63b2b3f66627fd70a2",
    measurementId: "G-26G6P0HD7F"
};
firebase.initializeApp(firebaseConfig);

export default firebase