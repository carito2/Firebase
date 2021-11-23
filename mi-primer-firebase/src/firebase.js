import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCu-opoNfKOk7j64WAAzxqDHD4LpVsr3Xk",
    authDomain: "proyecto-prueba-f24a8.firebaseapp.com",
    projectId: "proyecto-prueba-f24a8",
    storageBucket: "proyecto-prueba-f24a8.appspot.com",
    messagingSenderId: "585240260246",
    appId: "1:585240260246:web:482cf75a6defa178749cb7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore()
// exporta el paquete de firebase para poder usarlo
export default firebase