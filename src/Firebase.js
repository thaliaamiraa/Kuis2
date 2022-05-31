import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAvGZlcF-BHBsiFQlT-yFnih-L_WAltpHM",
  authDomain: "kuis2-cd09f.firebaseapp.com",
  projectId: "kuis2-cd09f",
  storageBucket: "kuis2-cd09f.appspot.com",
  messagingSenderId: "921306118047",
  appId: "1:921306118047:web:2711d1a0e2d77f92e86faa",
  measurementId: "G-W34C2MKE70"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
