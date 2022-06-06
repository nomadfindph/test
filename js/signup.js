import { initializeApp, auth, database } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAhUG66V4vHNyDAV0nZbjjBPMO2hIlmJ5s",
    authDomain: "nomadfindph-dd2ba.firebaseapp.com",
    projectId: "nomadfindph-dd2ba",
    storageBucket: "nomadfindph-dd2ba.appspot.com",
    messagingSenderId: "942605152653",
    appId: "1:942605152653:web:1641ac3e1047be1c8e8dc4"
  };


const firebase = initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function signUp() {
    let fullname = document.getElementById("singin-fullname").value;
    let username = document.getElementById("singin-username").value;
    let email = document.getElementById("singin-email").value;
    let password = document.getElementById("singin-password").value;

    // validate input fields
    if (validateEmail(email) === false || validatePassword(password) === false) {
        alert("Email or Password is not filled!");
        return; 
    }

    if (validateField(fullname) === false || validateField(username) === false) {
        alert("One or more fields needs information!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password) 
    .then(function() {
        // user variable
        let user = auth.currentUser;
        
        // adding to database
        let databaseReference = database.ref()

        // create user object data 
        let userData = {
            fullname: fullname,
            username: username,
            email: email,
            // track user last login
            lastLogin: Date.now()

        }
        
        databaseReference.child('users/' + user.uid).set(userData)

    }) 

    .catch(function(error) {
        // Firebase will use this to tell us of the error
        let errorCode = error.code;
        let errorMessage = error.message;

        alert(errorMessage);
    })

}

function validateEmail(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);

    if (expression.test(email) === true) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    if (password < 8) {
        return false;
    } else {
        return true;
    }
}

function validateField(field) {
    if (field === null) {
        return false;
    } 
    
    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}
