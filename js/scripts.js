// Import the functions you need from the SDKs you need
import { initializeApp, auth, database } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBWA63xhToWfw790BiUAbTC8JZiKmCjXs",
  authDomain: "nomadfindph-91454.firebaseapp.com",
  projectId: "nomadfindph-91454",
  storageBucket: "nomadfindph-91454.appspot.com",
  messagingSenderId: "812869603106",
  appId: "1:812869603106:web:f969718a5324f2012f5f7b"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
