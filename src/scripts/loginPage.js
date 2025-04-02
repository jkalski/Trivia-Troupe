// Variables
let loginContainer = document.getElementById("login-form-wrapper");
let signUpContainer = document.getElementById("create-account-button");
let modalContainer = document.getElementById("modalContainer");
let xButton = document.getElementById("x-btn");


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-Username").value;
    const password = document.getElementById("login-Password").value;

    const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Login successful!");
        // window.location.href = "questionPage.html"; // Optional redirect
    } else {
        alert(data.error || "Login failed");
    }
});



const signUpForm = document.getElementById("signupForm");
const signUpEmail = document.getElementById("SignUpEmail");
const signUpUsername = document.getElementById("SignUpUsername");
const signUpPassword = document.getElementById("SignUpPassword");
const signUpRepeatPassword = document.getElementById("SignUpRepeatPassword");
let signUpUsernameError = document.getElementById('SignUpUsernameError');
let signUpEmailError = document.getElementById('SignUpEmailError');
let signUpPasswordError = document.getElementById('SignUpPasswordError');
let signUpRepeatPasswordError = document.getElementById('SignUpRepeatPasswordError');

// Show/Hide Sign-Up Form/Login Form
signUpContainer.addEventListener("click", function() {
    modalContainer.classList.add('show');
    loginContainer.classList.add('hidden')
});

xButton.addEventListener("click", function() {
    modalContainer.classList.remove('show');
    loginContainer.classList.remove('hidden');
    clearAllErrors();
});

// Establishing Sign-Up Form Functionality
signUpForm.addEventListener("submit", (e) => {
    //Prevents the submit action to refresh page
    e.preventDefault();

    //Error checking
    if (getSignUpErrors(signUpUsername.value, signUpEmail.value, signUpPassword.value, signUpRepeatPassword.value)) {
        e.preventDefault();
    }
})

function getSignUpErrors (username, email, password, passwordConfirm) {

    if (username === '' || username == null) {
        signUpUsernameError.textContent = "Username is Required"; 
        //Here we add a class to highlight the error
        signUpUsername.classList.add('incorrect');

    }
    if (email === '' || email == null) {
        signUpEmailError.textContent = "Email is Required";
        //Here we add a class to highlight the error
        signUpEmail.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        signUpPasswordError.textContent = "Password is Required";
        //Here we add a class to highlight the error
        signUpPassword.classList.add('incorrect');
    }
    if (passwordConfirm === '' || passwordConfirm == null) {
        signUpRepeatPasswordError.textContent = "Please Confirm Password";
        //Here we add a class to highlight the error
        signUpRepeatPassword.classList.add('incorrect');
    }
    else if (passwordConfirm !== password) {
        signUpRepeatPasswordError.textContent = "Password was not the same";
        //Here we add a class to highlight the error
        signUpRepeatPassword.classList.add('incorrect');
    }
}

//Function to clear errors as someone types
function attachInputListeners() {
    const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword ,signUpRepeatPassword]

    signUpallInputs.forEach(input => {
        input.addEventListener('input', () => clearInputError(input));
    })
}

attachInputListeners();

//Helper Function
function clearInputError(input) {
    if (input.classList.contains('incorrect')) {
        input.classList.remove('incorrect');

        //Find the sibling p element and clear the text
        const errorMessage = document.getElementById(input.id + "Error");
        if(errorMessage) {
        errorMessage.textContent = ''; //Clear the error message
        }
    }
}

//Function when you close the signup form
function clearAllErrors() {
    const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword ,signUpRepeatPassword]

    signUpallInputs.forEach(input => {
        input.value = '';
    });
    signUpallInputs.forEach(clearInputError);
}