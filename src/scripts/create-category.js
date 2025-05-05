// src/scripts/create-category.js
document.addEventListener("DOMContentLoaded", () => {
  const categoryForm = document.getElementById("categoryForm");
  const notification = document.getElementById("notification");

  // Check if user is logged in
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  //Handle back button
  document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
  });

  // Handle form submission
  categoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const categoryName = document.getElementById("categoryName").value.trim();
    const description = document
      .getElementById("categoryDescription")
      .value.trim();
    const isPublic = document.getElementById("isPublic").checked;

    // Validate input
    if (!categoryName) {
      showNotification("Please enter a category name", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/custom-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          creator: username,
          description: description,
          is_public: isPublic,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("Category created successfully!", "success");

        // Store category ID in localStorage and redirect to add questions page
        localStorage.setItem("currentCategoryId", data.category_id);
        localStorage.setItem("currentCategoryName", categoryName);

        // Redirect after a brief delay
        setTimeout(() => {
          window.location.href = "add-questions.html";
        }, 1500);
      } else {
        showNotification(data.error || "Failed to create category", "error");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      showNotification("Server error. Please try again later.", "error");
    }
  });

  // Utility function to show notifications
  function showNotification(message, type = "info") {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    // Hide after 3 seconds
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }

  // Apply dark mode if enabled
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});
