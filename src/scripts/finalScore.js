
// Retrieve final time and score from local storage
let finalScore = localStorage.getItem("finalScore") || "0000";
let finalTime = localStorage.getItem("finalTime") || "00:00";
let username = localStorage.getItem("username") || "Guest";
let category = localStorage.getItem("selectedCategory") || "Unknown";

// Inserting stats into table
document.getElementById("player-stats").innerHTML = `
    <tr>
        <td>${username}</td>
        <td>${finalTime}</td>
        <td>${finalScore}</td>
    </tr>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Save game history to the backend if user is logged in
    if (username && username !== "Guest") {
        saveGameHistory(username, category, finalScore, finalTime);
    }
    
    // Apply dark mode based on localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  
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

// Function to save game history
async function saveGameHistory(username, category, score, time) {
    try {
        const response = await fetch("http://127.0.0.1:5000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                category: category,
                score: score,
                time: time
            })
        });
        
        const data = await response.json();
        console.log("History saved:", data);
    } catch (error) {
        console.error("Error saving history:", error);
    }
}