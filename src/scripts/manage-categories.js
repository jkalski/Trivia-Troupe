//where stuff gets deleted
document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    const userCategories = document.getElementById('userCategories');
    
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }
    
    // Fetch and display user's categories
    fetchUserCategories();
    
    async function fetchUserCategories() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/custom-categories?username=${username}&include_public=false`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const categories = await response.json();
            
            // Clear existing content
            userCategories.innerHTML = '';
            
            if (categories.length === 0) {
                userCategories.innerHTML = '<p>You have not created any categories yet.</p>';
            } else {
                categories.forEach(category => {
                    const categoryCard = createCategoryCard(category);
                    userCategories.appendChild(categoryCard);
                });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            showNotification('Error loading categories', 'error');
        }
    }
    
    function createCategoryCard(category) {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        card.innerHTML = `
            <h3>${category.name}</h3>
            <p>${category.description || 'No description'}</p>
            <div class="card-actions">
                <button class="edit-btn" onclick="editCategory('${category._id}', '${category.name}')">
                    Add Questions
                </button>
                <button class="delete-btn" onclick="deleteCategory('${category._id}', '${category.name}')">
                    Delete
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Global function for editing categories
    window.editCategory = function(categoryId, categoryName) {
        // Store category info and redirect to add questions page
        localStorage.setItem('currentCategoryId', categoryId);
        localStorage.setItem('currentCategoryName', categoryName);
        window.location.href = 'add-questions.html';
    }
    
    // Global function for deleting categories
    window.deleteCategory = async function(categoryId, categoryName) {
        if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This will also delete all questions in this category.`)) {
            return;
        }
        
        try {
            const response = await fetch(`http://127.0.0.1:5000/custom-categories/${categoryId}?username=${username}`, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showNotification(`Category deleted successfully! ${data.questions_deleted} questions were also deleted.`, 'success');
                // Refresh the categories list
                fetchUserCategories();
            } else {
                showNotification(data.error || 'Failed to delete category', 'error');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            showNotification('Server error. Please try again later.', 'error');
        }
    }
    
    // Utility function to show notifications
    function showNotification(message, type = 'info') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    // Apply dark mode if enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});