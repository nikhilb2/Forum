import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDDZ4hzLS-zZ0dujjGocNRnNA_Qbj5QA-Y",
  authDomain: "user-post-74b49.firebaseapp.com",
  databaseURL: "https://user-post-74b49.firebaseio.com",
  projectId: "user-post-74b49",
  storageBucket: "",
  messagingSenderId: "106756697136"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase
