//Retrive final time and score from local storage
let finalScore = localStorage.getItem("finalScore") || "0000";
let finalTime = localStorage.getItem("finalTime") || "00:00";
let username = localStorage.getItem("username") || "Guest";

// Inserting stats into table
document.getElementById("player-stats").innerHTML = `
    <tr>
        <td> ${username} </td>
        <td>${finalTime}</td>
        <td>${finalScore}</td>
    </tr>
`;

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