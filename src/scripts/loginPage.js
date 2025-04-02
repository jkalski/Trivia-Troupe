document.addEventListener("DOMContentLoaded", () => {
    // Variables for login
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
            localStorage.setItem("username", username); // Store username in localStorage
            window.location.href = "category.html"; // Redirect after login
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
    signUpContainer.addEventListener("click", function () {
        modalContainer.classList.add('show');
        loginContainer.classList.add('hidden');
    });

    xButton.addEventListener("click", function () {
        modalContainer.classList.remove('show');
        loginContainer.classList.remove('hidden');
        clearAllErrors();
    });

    // Establishing Sign-Up Form Functionality
    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (getSignUpErrors(signUpUsername.value, signUpEmail.value, signUpPassword.value, signUpRepeatPassword.value)) {
            return;
        }

        const newUser = {
            username: signUpUsername.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        };

        try {
            const res = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Registration successful!");
                window.location.href = "category.html"; //  Redirect after login
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Server error during signup.");
        }
    });

    //Function to clear errors as someone types
    function attachInputListeners() {
        const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword, signUpRepeatPassword];

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
            if (errorMessage) {
                errorMessage.textContent = ''; //Clear the error message
            }
        }
    }

    //Function when you close the signup form
    function clearAllErrors() {
        const signUpallInputs = [signUpUsername, signUpEmail, signUpPassword, signUpRepeatPassword];

        signUpallInputs.forEach(input => {
            input.value = '';
        });
        signUpallInputs.forEach(clearInputError);
    }

    function getSignUpErrors(username, email, password, passwordConfirm) {
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
});
