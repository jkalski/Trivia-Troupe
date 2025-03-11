// Variables
let loginContainer = document.getElementById("login-form-wrapper");
let signUpContainer = document.getElementById("create-account-button");
let modalContainer = document.getElementById("modalContainer");
let xButton = document.getElementById("x-btn");


const loginForm = document.getElementsByClassName("loginForm");


const signUpForm = document.getElementsByClassName("signupForm");
const signUpEmail = document.getElementById("Email");
const signUpUsername = document.getElementById("Signup-Username");
const signUpPassword = document.getElementById("Signup-Password");
const signUpConfirmPassword = document.getElementById("RepeatPassword");

// Show/Hide Sign-Up Form/Login Form
signUpContainer.addEventListener("click", function() {
    modalContainer.classList.add('show');
    loginContainer.classList.add('hidden')
});

xButton.addEventListener("click", function() {
    modalContainer.classList.remove('show');
    loginContainer.classList.remove('hidden');
});

// Establishing Sign-Up Form Functionality
signUpForm.addEventListener('submit', (e) => {
    //Prevents the submit action to refresh page
    e.preventDefault();

    //Error Checking
    let errors = [];

    errors = getSignUpErrors(signUpUsername.value, signUpEmail.value, signUpPassword.value, signUpConfirmPassword.value);
})


function getSignUpErrors (username, email, password, passwordConfirm) {
    let errors = [];

    if (username === '' || username == null) {
        errors.push('Username is required');
        //Here we add a class to identify that there is an error
    }
    if (email === '' || email == null) {
        errors.push('Email is required');
        //Add same class
    }
    if (password === '' || password == null) {
        errors.push('Password is Required');
        //Add class
    }
    if (passwordConfirm === '' || passwordConfirm == null) {
        errors.push ('Please confirm password');
        //Add class
    }
    else if (passwordConfirm !== password) {
        errors.push ('Passwords were not the same');
        //add class
    }

    return errors;
}