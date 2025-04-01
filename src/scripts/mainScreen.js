// Get all category buttons
const categoryButtons = document.querySelectorAll('.category-container .category button');

// Add an event listener to each category button
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the category selected (optional, depending on the data you want to pass)
        const selectedCategory = button.textContent;

        // You can use localStorage, sessionStorage, or query parameters to store the selected category
        localStorage.setItem('selectedCategory', selectedCategory);  // Store selected category (optional)

        // Redirect to the question page
        window.location.href = 'questionPage.html';
    });
});
