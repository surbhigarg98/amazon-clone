// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC7MlhJ0t6gx-e-OjF-6Jd2h5eSIPGfPFg",
  authDomain: "clone-3eacf.firebaseapp.com",
  databaseURL: "https://clone-3eacf.firebaseio.com",
  projectId: "clone-3eacf",
  storageBucket: "clone-3eacf.appspot.com",
  messagingSenderId: "205355703572",
  appId: "1:205355703572:web:04ff297674fbdd65b23601",
  measurementId: "G-QFZ7ELX7H0"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth};