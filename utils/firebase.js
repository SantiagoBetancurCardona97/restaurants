import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCV7otX8xy5r3_-ERFjMUsUdEHDn1AhL9g",
    authDomain: "restaurants-8c6a7.firebaseapp.com",
    projectId: "restaurants-8c6a7",
    storageBucket: "restaurants-8c6a7.appspot.com",
    messagingSenderId: "672614891751",
    appId: "1:672614891751:web:b892b2b1ab48809a3a6242"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)