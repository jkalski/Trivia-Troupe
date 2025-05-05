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

            // remove highlight from all buttons
            [tutorialButton, historyButton[0], categoryButton].forEach(btn => btn.classList.remove('highlight'));

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
        const targetElements = [tutorialButton, historyButton[0], categoryButton];
        const tutorialBox = tutorialBoxes[stepIndex];
        const arrow = arrows[stepIndex];
        const target = targetElements[stepIndex];

        // Hide all tutorial boxes
        tutorialBoxes.forEach(box => box.style.display = 'none');
        arrows.forEach(arrow => arrow.classList.remove('arrow-top', 'arrow-left', 'arrow-right'));

        // Show current tutorial box
        tutorialBox.style.display = 'block';

        // Highlight target
        target.classList.add('highlight');

        // Get target position
        const rect = target.getBoundingClientRect();
        const boxRect = tutorialBox.getBoundingClientRect();

        // Position tutorial box near the target
        const offset = 10;
        if (stepIndex === 0) {
            tutorialBox.style.position = 'absolute';
            tutorialBox.style.top = `${window.scrollY + rect.bottom + offset}px`;
            tutorialBox.styel.left = `${window.scrollX + rect.left}px`;
            arrow.classList.add('arrow-top');
        } else if (stepIndex === 1) {
            tutorialBox.style.position = 'absolute';
            tutorialBox.style.top = `${window.scrollY + rect.top}px`;
            tutorialBox.style.left = `${window.scrollX + rect.left - boxRect.width - offset}px`;
            arrow.classList.add('arrow-right');
        } else if (stepIndex === 2) {
            tutorialBox.style.position = 'absolute';
            tutorialBox.style.top = `${window.scrollY + rect.top}px`;
            tutorialBox.style.left = `${window.scrollX + rect.right + offset}px`;
            arrow.classList.add('arrow-left');
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
  
