import firebase from '../firebaseConfig';
import "firebase/auth";


const isLogged=()=>{
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            return true;
        } else {
            return false;
        }
      });
};

function logout(){
    firebase.auth().signOut();
}

export {isLogged, logout}