// Get all category buttons
const categoryButtons = document.querySelectorAll(
  ".category-container .category button"
);

// Add an event listener to each category button
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Get the category selected
    const selectedCategory = button.textContent;

    // Store selected category
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.removeItem("customCategoryId");

    // Redirect to the question page
    window.location.href = "questionPage.html";
  });
});

function startGame(category) {
  localStorage.setItem("selectedCategory", category);
  localStorage.removeItem("customCategoryId");
  window.location.href = "questionPage.html";
}

function generateCarouselSlides(categories) {
  const sliderInner = document.getElementById("carousel");
  sliderInner.innerHTML = "";

  let anglePerSlide = 360 / categories.length;
  let radius = 150 / Math.tan(Math.PI / categories.length);

  let currentRotation = 0;
  let autoRotateInterval;

  function updateRotation() {
    sliderInner.style.transform = `rotateY(${currentRotation}deg)`;
  }

  function startAutoRotation() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }

    autoRotateInterval = setInterval(() => {
      currentRotation -= anglePerSlide;
      updateRotation();
    }, 5000);
  }

  document.getElementById("leftArrow").addEventListener("click", () => {
    currentRotation += anglePerSlide;
    updateRotation();
    startAutoRotation();
  });

  document.getElementById("rightArrow").addEventListener("click", () => {
    currentRotation -= anglePerSlide;
    updateRotation();
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
  startAutoRotation();
}

document.addEventListener("DOMContentLoaded", () => {
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

  // Add buttons for creating and managing custom categories
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "30px";  // Add spacing between buttons
  buttonContainer.style.marginTop = "30px";
  buttonContainer.style.marginBottom = "30px";
  
  const createCategoryButton = document.createElement("button");
  createCategoryButton.textContent = "Create Custom Category";
  createCategoryButton.classList.add("create-category-btn");
  createCategoryButton.addEventListener("click", () => {
    window.location.href = "create-category.html";
  });
  
  const manageCategoriesButton = document.createElement("button");
  manageCategoriesButton.textContent = "Manage Categories";
  manageCategoriesButton.classList.add("create-category-btn");
  manageCategoriesButton.addEventListener("click", () => {
    window.location.href = "manage-categories.html";
  });

  buttonContainer.appendChild(createCategoryButton);
  buttonContainer.appendChild(manageCategoriesButton);
  document.querySelector(".createCategoryContainer").appendChild(buttonContainer);

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

      // Create a simple grid for custom categories
      if (customCategories.length > 0) {
        const customHeader = document.createElement("h2");
        customHeader.textContent = "Custom Categories";
        customHeader.style.textAlign = "center";
        customHeader.style.marginTop = "30px";
        document.querySelector(".container").appendChild(customHeader);

        const categoryGrid = document.createElement("div");
        categoryGrid.className = "custom-category-grid";
        categoryGrid.style.display = "grid";
        categoryGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
        categoryGrid.style.gap = "20px";
        categoryGrid.style.padding = "20px";
        categoryGrid.style.maxWidth = "1200px";
        categoryGrid.style.margin = "0 auto";
        categoryGrid.style.paddingBottom = "100px";

        customCategories.forEach((category) => {
          const button = document.createElement("button");
          button.textContent = category.name;
          button.className = "custom-category-button";

          if (category.creator !== username) {
            button.textContent += ` (by ${category.creator})`;
          }

          button.addEventListener("click", function () {
            localStorage.setItem("selectedCategory", category.name);
            localStorage.setItem("customCategoryId", category._id);
            window.location.href = "questionPage.html";
          });

          categoryGrid.appendChild(button);
        });
        
        document.querySelector(".container").appendChild(categoryGrid);
      }
    } catch (error) {
      console.error("Error loading custom categories:", error);
    }
  }
});