// Delete category function
async function deleteCategory(categoryId, categoryName) {
  const username = localStorage.getItem('username');
  
  if (!username) {
    alert('Please log in to delete categories');
    return;
  }
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This will also delete all questions in this category.`)) {
    return;
  }
  
  try {
    const response = await fetch(`http://127.0.0.1:5000/custom-categories/${categoryId}?username=${username}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert(`Category deleted successfully!\n${data.questions_deleted} questions were also deleted.`);
      // Refresh the page to update the categories
      window.location.reload();
    } else {
      alert(data.error || 'Failed to delete category');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    alert('Server error. Please try again later.');
  }
}

// Get all category buttons
const categoryButtons = document.querySelectorAll(
  ".category-container .category button"
);

// Add an event listener to each category button
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Get the category selected (optional, depending on the data you want to pass)
    const selectedCategory = button.textContent;

    // You can use localStorage, sessionStorage, or query parameters to store the selected category
    localStorage.setItem("selectedCategory", selectedCategory); // Store selected category (optional)
    localStorage.removeItem("customCategoryId"); // Clear any custom category ID when selecting standard category

    // Redirect to the question page
    window.location.href = "questionPage.html";
  });
});

function startGame(category) {
  localStorage.setItem("selectedCategory", category);
  localStorage.removeItem("customCategoryId"); // Clear any custom category ID when selecting standard category
  window.location.href = "questionPage.html";
}

function generateCarouselSlides(categories) {
  const sliderInner = document.getElementById("carousel");
  sliderInner.innerHTML = ""; //Clear any existing slides

  let anglePerSlide = 360 / categories.length;
  let radius = 150 / Math.tan(Math.PI / categories.length);

  let currentRotation = 0;
  let autoRotateInterval;

  function updateRotation() {
    sliderInner.style.transform = `rotateY(${currentRotation}deg)`;
  }

  //Function to start auto-rotation
  function startAutoRotation() {
    //Clear previous interval
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }

    //Set a new interval for auto rotation
    autoRotateInterval = setInterval(() => {
      currentRotation -= anglePerSlide;
      updateRotation();
    }, 5000); //Interval of 5000ms
  }

  //Arrow Manipulation
  document.getElementById("leftArrow").addEventListener("click", () => {
    currentRotation += anglePerSlide;

    updateRotation();

    //Restart auto-rotation after arrow clicked
    startAutoRotation();
  });

  document.getElementById("rightArrow").addEventListener("click", () => {
    currentRotation -= anglePerSlide;

    updateRotation();
    //Restart auto-rotation after arrow clicked
    startAutoRotation();
  });

  categories.forEach((category, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.transform = `rotateY(${
      i * anglePerSlide
    }deg) translateZ(${radius}px)`;

    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => startGame(category));

    slide.appendChild(button);
    sliderInner.appendChild(slide);
  });
  // Start auto rotation
  startAutoRotation();
}

document.addEventListener("DOMContentLoaded", () => {
  //Defaulting categories
  const defaultCategories = ["Math", "Science", "Pop Culture", "History"];

  generateCarouselSlides(defaultCategories);

  // Apply dark mode based on localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Optional: handle dark mode toggle on pages with a checkbox
  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = localStorage.getItem("darkMode") === "enabled";

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }

  // Add button for creating custom categories
  const createCategoryButton = document.createElement("button");
  createCategoryButton.textContent = "Create Custom Category";
  createCategoryButton.classList.add("create-category-btn");
  createCategoryButton.addEventListener("click", () => {
    window.location.href = "create-category.html";
  });

  // Add the create category button to the page
  document
    .querySelector(".createCategoryContainer")
    .appendChild(createCategoryButton);

  // Fetch and display custom categories if user is logged in
  const username = localStorage.getItem("username");
  if (username) {
    fetchCustomCategories();
  }

  async function fetchCustomCategories() {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/custom-categories?username=${username}&include_public=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const customCategories = await response.json();

      // Create a separate section for custom categories
      if (customCategories.length > 0) {
        const customHeader = document.createElement("h2");
        customHeader.textContent = "Custom Categories";
        customHeader.style.textAlign = "center";
        customHeader.style.marginTop = "30px";
        document.querySelector(".container").appendChild(customHeader);

        customCategories.forEach((category) => {
          const categoryWrapper = document.createElement("div");
          categoryWrapper.className = "category-wrapper";
          categoryWrapper.style.marginBottom = "20px";
          
          // Create a container for the main category button
          const customCategoryContainer = document.createElement("div");
          customCategoryContainer.className = "category";
          
          const button = document.createElement("button");
          button.textContent = category.name;

          // If this is a public category created by someone else, show the creator
          if (category.creator !== username) {
            button.textContent += ` (by ${category.creator})`;
          }

          button.addEventListener("click", function () {
            // Store both the category name and ID
            localStorage.setItem("selectedCategory", category.name);
            localStorage.setItem("customCategoryId", category._id);
            window.location.href = "questionPage.html";
          });

          customCategoryContainer.appendChild(button);
          
          // Create a container for the custom categories
          const categoryContainerWrapper = document.createElement("div");
          categoryContainerWrapper.className = "category-container";
          categoryContainerWrapper.appendChild(customCategoryContainer);
          
          // Add the main button container to wrapper
          categoryWrapper.appendChild(categoryContainerWrapper);
          
          // Add delete button container BELOW the category button (only if user owns it)
          if (category.creator === username) {
            const deleteContainer = document.createElement("div");
            deleteContainer.style.display = "flex";
            deleteContainer.style.justifyContent = "center";
            deleteContainer.style.marginTop = "10px";
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Category";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = (e) => {
              e.stopPropagation();
              deleteCategory(category._id, category.name);
            };
            
            deleteContainer.appendChild(deleteBtn);
            categoryWrapper.appendChild(deleteContainer);
          }
          
          document.querySelector(".container").appendChild(categoryWrapper);
        });
      }
    } catch (error) {
      console.error("Error loading custom categories:", error);
    }
  }
});