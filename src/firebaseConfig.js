import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDliMWKflUfbcKJtsDFdcBK7N1zwlC51Hk",
    authDomain: "bank-steem.firebaseapp.com",
    projectId: "bank-steem",
    storageBucket: "bank-steem.appspot.com",
    messagingSenderId: "300425944534",
    appId: "1:300425944534:web:7074f7c4911981cc9d1877"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;