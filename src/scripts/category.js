let categorySelectBtn = document.getElementsByClassName("category-select-btn")[0]; // getElementsByClassName returns an array

categorySelectBtn.addEventListener("click", function(){
    window.location.href = "selectCategories.html"; // Redirects to the selectCategories.html page
});
