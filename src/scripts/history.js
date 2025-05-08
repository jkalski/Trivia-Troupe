document.addEventListener("DOMContentLoaded", () => {
  // Apply dark mode based on localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  //Handle back button
  document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
  });

  // Get username from localStorage
  const username = localStorage.getItem("username");

  // If not logged in, display default values and a message
  if (!username || username === "Guest") {
    document.getElementById("games-played").textContent = "0";
    document.getElementById("max-score").textContent = "0";
    document.getElementById("best-time").textContent = "0 min 0 sec";
    
    // Show login message
    const container = document.querySelector(".history-container");
    const loginMsg = document.createElement("p");
    loginMsg.textContent = "Please log in to view your game history";
    loginMsg.style.color = "#1abc9c";
    loginMsg.style.fontWeight = "bold";
    loginMsg.style.marginTop = "30px";
    container.appendChild(loginMsg);
  } else {
    // Fetch user history if logged in
    fetchUserHistory(username);
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
});

/**
 * Fetches the user's game history from the backend
 * @param {string} username - The username to fetch history for
 */
async function fetchUserHistory(username) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/history?username=${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update statistics
    document.getElementById("games-played").textContent = data.games_played;
    document.getElementById("max-score").textContent = data.max_score;
    
    // Format best time for display (from "MM:SS" format)
    const bestTime = data.best_time;
    if (bestTime && bestTime !== "00:00") {
      const [minutes, seconds] = bestTime.split(":");
      document.getElementById("best-time").textContent = 
        `${parseInt(minutes)} min ${parseInt(seconds)} sec`;
    }
    
    // If we have history records, create a table to display them
    if (data.history && data.history.length > 0) {
      createHistoryTable(data.history);
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    // Show error message to user
    document.getElementById("games-played").textContent = "0";
    document.getElementById("max-score").textContent = "0";
    document.getElementById("best-time").textContent = "0 min 0 sec";
    
    const container = document.querySelector(".history-container");
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Failed to load history data. Please try again later.";
    errorMsg.style.color = "red";
    errorMsg.style.marginTop = "30px";
    container.appendChild(errorMsg);
  }
}

/**
 * Creates a table to display recent game history
 * @param {Array} history - Array of game history records
 */
function createHistoryTable(history) {
  // Sort history by date (most recent first)
  const sortedHistory = [...history].sort((a, b) => {
    // Handle the date format from MongoDB (could be string or Date object)
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB - dateA;
  });
  
  // Get only the 5 most recent games
  const recentGames = sortedHistory.slice(0, 5);
  
  // Check if an existing table already exists and remove it
  const existingTable = document.querySelector(".recent-games");
  if (existingTable) {
    existingTable.remove();
  }
  
  // Create a table container
  const tableContainer = document.createElement("div");
  tableContainer.className = "recent-games";
  tableContainer.innerHTML = `
    <h2>Recent Games</h2>
    <table class="history-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Score</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody id="history-table-body">
      </tbody>
    </table>
  `;
  
  document.querySelector(".history-container").appendChild(tableContainer);
  
  // Add rows to the table
  const tableBody = document.getElementById("history-table-body");
  
  recentGames.forEach(game => {
    const row = document.createElement("tr");
    
    // Format date
    let formattedDate = "Unknown";
    if (game.date) {
      const date = new Date(game.date);
      if (date instanceof Date && !isNaN(date)) {
        formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
    }
    
    row.innerHTML = `
      <td>${game.category || "Unknown"}</td>
      <td>${game.score}</td>
      <td>${game.time}</td>
      <td>${formattedDate}</td>
    `;
    
    tableBody.appendChild(row);
  });
}