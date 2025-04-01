// Variables for login
let loginContainer = document.getElementById("login-form-wrapper");
let signUpContainer = document.getElementById("create-account-button");
let modalContainer = document.getElementById("modalContainer");
let xButton = document.getElementById("x-btn");

const loginForm = document.getElementsByClassName("loginForm");
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
    loginContainer.classList.add('hidden');
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
    } else {
        // If no errors, simulate login and redirect
        window.location.href = "category.html"; // Redirects to category.html after successful sign-up
    }
})

function getSignUpErrors (username, email, password, passwordConfirm) {
    let hasErrors = false;

    if (username === '' || username == null) {
        signUpUsernameError.textContent = "Username is Required"; 
        signUpUsername.classList.add('incorrect');
        hasErrors = true;
    }
    if (email === '' || email == null) {
        signUpEmailError.textContent = "Email is Required";
        signUpEmail.classList.add('incorrect');
        hasErrors = true;
    }
    if (password === '' || password == null) {
        signUpPasswordError.textContent = "Password is Required";
        signUpPassword.classList.add('incorrect');
        hasErrors = true;
    }
    if (passwordConfirm === '' || passwordConfirm == null) {
        signUpRepeatPasswordError.textContent = "Please Confirm Password";
        signUpRepeatPassword.classList.add('incorrect');
        hasErrors = true;
    }
    else if (passwordConfirm !== password) {
        signUpRepeatPasswordError.textContent = "Password was not the same";
        signUpRepeatPassword.classList.add('incorrect');
        hasErrors = true;
    }

    return hasErrors;
}

//Function to clear errors as someone types
function attachInputListeners() {
    const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword ,signUpRepeatPassword];

    signUpallInputs.forEach(input => {
        input.addEventListener('input', () => clearInputError(input));
    });
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
    const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword ,signUpRepeatPassword];

    signUpallInputs.forEach(input => {
        input.value = '';
    });
    signUpallInputs.forEach(clearInputError);
}
