import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCecX8XtNXj4ctdc1MANtjAziyuTGc9PGU',
  authDomain: 'jobfinder-90f6a.firebaseapp.com',
  databaseURL: 'https://jobfinder-90f6a.firebaseio.com',
  projectId: 'jobfinder-90f6a',
  storageBucket: 'jobfinder-90f6a.appspot.com',
  messagingSenderId: '266967186975'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase, firebaseConfig };
