// add-questions.js
document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('questionForm');
    const notification = document.getElementById('notification');
    const categoryName = document.getElementById('categoryName');
    const questionCount = document.getElementById('questionCount');
    const questionsList = document.getElementById('questionsList');
    const finishBtn = document.getElementById('finishBtn');
    
    // Get category info from localStorage
    const categoryId = localStorage.getItem('currentCategoryId');
    const categoryNameText = localStorage.getItem('currentCategoryName');
    
    // Check if we have category info
    if (!categoryId || !categoryNameText) {
        showNotification('No category selected. Redirecting...', 'error');
        setTimeout(() => {
            window.location.href = 'mainScreen.html';
        }, 2000);
        return;
    }
    
    // Display category name
    categoryName.textContent = categoryNameText;
    
    // Store questions count
    let questionsAdded = 0;
    
    // Handle form submission
    questionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const questionText = document.getElementById('questionText').value.trim();
        const options = Array.from(document.querySelectorAll('.option-input')).map(input => input.value.trim());
        const correctIndex = parseInt(document.querySelector('input[name="correctOption"]:checked').value);
        const correctAnswer = options[correctIndex];
        const username = localStorage.getItem('username');
        
        // Validate form
        if (!questionText || options.some(option => !option)) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        try {
            const response = await fetch(`http://127.0.0.1:5000/custom-categories/${categoryId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: questionText,
                    options: options,
                    correct_answer: correctAnswer,
                    creator: username
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showNotification('Question added successfully!', 'success');
                
                // Add question to the list
                addQuestionToList(questionText, options, correctAnswer);
                
                // Reset form
                questionForm.reset();
                document.querySelector('input[name="correctOption"][value="0"]').checked = true;
                
                // Update count
                questionsAdded++;
                updateQuestionCount();
            } else {
                showNotification(data.error || 'Failed to add question', 'error');
            }
        } catch (error) {
            console.error('Error adding question:', error);
            showNotification('Server error. Please try again later.', 'error');
        }
    });
    
    // Handle finish button
    finishBtn.addEventListener('click', () => {
        // Clear current category info
        localStorage.removeItem('currentCategoryId');
        localStorage.removeItem('currentCategoryName');
        
        // Redirect to main screen
        window.location.href = 'mainScreen.html';
    });
    
    // Utility functions
    function showNotification(message, type = 'info') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    function addQuestionToList(question, options, correctAnswer) {
        const li = document.createElement('li');
        let optionsHtml = options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            return `<span style="${isCorrect ? 'font-weight: bold; color: green;' : ''}">
                ${String.fromCharCode(65 + index)}) ${option}
            </span>`;
        }).join(' | ');
        
        li.innerHTML = `
            <strong>Q:</strong> ${question}<br>
            <strong>Options:</strong> ${optionsHtml}
        `;
        li.style.marginBottom = '10px';
        questionsList.appendChild(li);
    }
    
    function updateQuestionCount() {
        questionCount.textContent = questionsAdded;
    }
    
    // Apply dark mode if enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});