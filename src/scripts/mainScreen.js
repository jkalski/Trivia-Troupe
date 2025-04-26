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

  let angle = 360 / categories.length;

  //Arrow Manipulation
  document.getElementById("leftArrow").addEventListener("click", () => {
    angle += 90;
    sliderInner.style.transform = `rotateY(${angle}deg)`;
    console.log("clicked");
  });

  document.getElementById("rightArrow").addEventListener("click", () => {
    angle -= 90;
    sliderInner.style.transform = `rotateY(${angle}deg)`;
  });

  categories.forEach((category, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.transform = `rotateY(${i * angle}deg) translateZ(150px)`;

    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => startGame(category));

    slide.appendChild(button);
    sliderInner.appendChild(slide);
  });
  // Auto-rotation every 5 seconds (5000 milliseconds)
  setInterval(() => {
    angle -= 90; // Adjust angle for continuous rotation (you can change the increment value for faster/slower rotation)
    sliderInner.style.transform = `rotateY(${angle}deg)`;
  }, 5000); // Interval of 3000ms (3 seconds)
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

        const customCategoryContainer = document.createElement("div");
        customCategoryContainer.className = "category";

        customCategories.forEach((category) => {
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
        });

        // Create a container for the custom categories similar to existing categories
        const customCategoriesWrapper = document.createElement("div");
        customCategoriesWrapper.className = "category-container";
        customCategoriesWrapper.appendChild(customCategoryContainer);

        document
          .querySelector(".container")
          .appendChild(customCategoriesWrapper);
      }
    } catch (error) {
      console.error("Error loading custom categories:", error);
    }
  }
});
