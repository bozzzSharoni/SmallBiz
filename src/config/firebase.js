import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCMDzCons4EZ1clV02C6HI6HsZL1XJ-Md4",
    authDomain: "smallbiz-6c996.firebaseapp.com",
    databaseURL: "https://smallbiz-6c996.firebaseio.com",
    projectId: "smallbiz-6c996",
    storageBucket: "gs://smallbiz-6c996.appspot.com/",
    messagingSenderId: "709512455520",
    appId: "1:709512455520:web:ae4170e26d2b568e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase