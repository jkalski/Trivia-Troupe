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

function startGame(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "questionPage.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // Apply dark mode based on localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  
    // Optional: handle dark mode toggle on pages with a checkbox
    const toggle = document.getElementById('dark-mode');
    if (toggle) {
      toggle.checked = localStorage.getItem('darkMode') === 'enabled';
  
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('darkMode', 'enabled');
        } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    }
  });
  
