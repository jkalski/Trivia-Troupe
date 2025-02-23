let signUp = document.getElementById("create-account-button");
let modalContainer = document.getElementById("modalContainer");
let xButton = document.getElementById("x-btn");


signUp.addEventListener("click", function() {
    modalContainer.classList.add('show');
});

xButton.addEventListener("click", function() {
    modalContainer.classList.remove('show');
});
