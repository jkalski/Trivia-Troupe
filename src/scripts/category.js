document.addEventListener('DOMContentLoaded', () => {
    const tutorialButton = document.querySelector('.tutorial-btn');
    const tutorialContent = document.querySelector('.tutorial-content');
    const nextButtons = document.querySelectorAll('.next-btn');
    const categoryButton = document.querySelector('.category-select-btn');
    const tutorialBoxes = document.querySelectorAll('.tutorial-box');
    const arrows = document.querySelectorAll('.arrow');
    const historyButton = document.querySelectorAll('.history-btn')

    historyButton.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'history.html';
        });
    });
    
    let currentStep = 0;

    // Show the tutorial when clicked
    tutorialButton.addEventListener('click', () => {
        currentStep = 0;
        tutorialContent.style.display = 'block';
        tutorialBoxes.forEach(box => box.style.display = 'none'); // Hide all tutorial boxes initially
        showStep(currentStep);
    });

    // Handle the "Next" button click to go through the tutorial
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep++;
            if (currentStep < tutorialBoxes.length) {
                showStep(currentStep);
            } else {
                tutorialContent.style.display = 'none';
                currentStep = 0;
            }
        });
    });

    // Show the specific tutorial step and position
    function showStep(stepIndex) {
        // Hide all tutorial boxes
        tutorialBoxes.forEach(box => box.style.display = 'none');
        
        // Show the current step
        tutorialBoxes[stepIndex].style.display = 'block';
        
        // Reset arrows position and show the correct one
        arrows.forEach(arrow => arrow.classList.remove('arrow-top', 'arrow-left', 'arrow-right'));
        switch(stepIndex) {
            case 0:
                arrows[0].classList.add('arrow-top');
                break;
            case 1:
                arrows[1].classList.add('arrow-left');
                break;
            case 2:
                arrows[2].classList.add('arrow-right');
                break;
        }
    }

    // When the "Category Select" button is clicked, go to mainScreen.html
    categoryButton.addEventListener('click', () => {
        window.location.href = 'mainScreen.html';
    });
});

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
  
