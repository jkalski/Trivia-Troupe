let signUp = document.getElementById("create-account-button");
let modalContainer = document.getElementById("modalContainer");
let xButton = document.getElementById("x-btn");
let loginContainer = document.getElementById("login-form-wrapper");

signUp.addEventListener("click", function() {
    modalContainer.classList.add('show');
    loginContainer.classList.add('hidden')
});

xButton.addEventListener("click", function() {
    modalContainer.classList.remove('show');
    loginContainer.classList.remove('hidden');
});
