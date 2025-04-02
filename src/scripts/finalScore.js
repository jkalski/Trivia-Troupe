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


//Return to category page if button is clicked
let button = document.querySelector("#returnHome");

button.addEventListener('click', () => {
    window.location.href = "category.html";
});