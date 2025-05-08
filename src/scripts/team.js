// src/scripts/team.js

document.addEventListener('DOMContentLoaded', () => {
  // Apply dark mode based on localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  // Handle dark mode toggle on pages with a checkbox
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
  
  // Add subtle animation to team cards when they come into view
  const teamCards = document.querySelectorAll('.team-card');
  
  // Use Intersection Observer to detect when cards are in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Set initial state and observe each card
  teamCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  
  // Optional: Add random colors to avatars for visual variety
  const avatars = document.querySelectorAll('.avatar');
  const colors = [
    '#1abc9c', // Original teal
    '#3498db', // Blue
    '#9b59b6', // Purple
    '#e74c3c', // Red
    '#f39c12', // Orange
    '#2ecc71', // Green
    '#e67e22'  // Dark orange
  ];
  
  avatars.forEach(avatar => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    avatar.style.backgroundColor = randomColor;
  });
});