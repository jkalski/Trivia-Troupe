let selectedCategory = localStorage.getItem("selectedCategory") || ""; // Get selected category from localStorage
let customCategoryId = localStorage.getItem("customCategoryId") || ""; // Get custom category ID if it exists
let questions = [];
let currentAnimationFrame = null; // Track current animation frame
let isTransitioning = false; // Prevent multiple transitions
let gameStarted = false; // Track if game has started

// Determine the correct URL based on whether we have a custom category or standard category
let fetchUrl = "http://127.0.0.1:5000/questions";

// If we have a custom category ID, use that
if (customCategoryId) {
  fetchUrl += `?custom_category_id=${encodeURIComponent(customCategoryId)}`;
} else if (selectedCategory) {
  // Otherwise use the standard category
  fetchUrl += `?category=${encodeURIComponent(selectedCategory)}`;
}

fetch(fetchUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    questions = data;
    console.log(
      `Questions for ${customCategoryId ? 'custom category' : 'category'} "${selectedCategory}" loaded:`,
      questions
    );

    // show category on the screen
    const categoryDisplay = document.getElementById("categoryDisplay");
    if (categoryDisplay) {
      categoryDisplay.innerText = `Category: ${selectedCategory}`;
    }
  })
  .catch((error) =>
    console.error("Error loading questions from backend:", error)
  );

//  stopwatch starts.
function startStopwatch() {
  const stopwatch = document.getElementById("stopwatch");
  let counter = 0;
  let countup;
  countup = setInterval(() => {
    let minutes = Math.floor(counter / 60000); // Converts milliseconds to minutes
    let seconds = Math.floor((counter % 60000) / 1000); // Get remainder in seconds
    let milliseconds = Math.floor((counter % 1000) / 10); //Get two-digit milliseconds

    // Format display
    let formattedTime =
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
    //`${milliseconds.toString().padStart(2, '0')}`; // If we want milliseconds displayed

    stopwatch.innerHTML = formattedTime;
    counter += 10;
  }, 10);
}

// Having the slider move
function startSliderAnimation() {
  // Cancel any existing animation
  if (currentAnimationFrame) {
    cancelAnimationFrame(currentAnimationFrame);
    currentAnimationFrame = null;
  }

  const slider = document.querySelector(".slider");
  let progressBar = document.querySelector(".progress-container").offsetWidth;
  let startTime = Date.now(); // Capture start time
  let duration = 30000; // 30 Seconds for each question

  function moveSlider() {
    let elapsedTime = Date.now() - startTime;
    let percentage = elapsedTime / duration;
    let newPosition = Math.min(percentage * progressBar, progressBar);

    slider.style.transform = `translateX(${-newPosition}px)`;

    if (percentage < 1) {
      currentAnimationFrame = requestAnimationFrame(moveSlider);
    } else {
      // When timer reaches 0, go to next question only if not already transitioning
      if (!isTransitioning) {
        isTransitioning = true;
        fetchQA();

        // Allow transitions again after a delay
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }
    }
  }

  currentAnimationFrame = requestAnimationFrame(moveSlider);
}

// Reset the slider back to the right side
function resetSlider() {
  // Cancel any existing animation first
  if (currentAnimationFrame) {
    cancelAnimationFrame(currentAnimationFrame);
    currentAnimationFrame = null;
  }

  const slider = document.querySelector(".slider");
  slider.style.transform = `translateX(${
    document.querySelector(".progress-container").offsetWidth
  }px)`;

  setTimeout(() => {
    startSliderAnimation();
  }, 100); // Restart with small delay
}

// fetch question and answers
let score = 0; // Initialize score as global variable
let correctAnswer;
let answers = [];
let lastAnswerTime = 0; // Used to prevent rapid-fire answers

function fetchQA() {
  const startGameButton = document.getElementById("startGameButton");
  startGameButton.style.display = "none"; // hide start button on start

  // Initialize the game if not already started
  if (!gameStarted) {
    gameStarted = true;
  }

  // Checking if the questions array is empty
  if (questions.length === 0) {
    endGame(); // End the game and go to the final screen page
    return;
  }

  // Pick a random question and remove it from the array
  let removal = Math.floor(Math.random() * questions.length);
  const questionArea = document.getElementById("question");
  const currentQuestion = questions[removal];

  questions[removal] = questions[questions.length - 1];
  questions.length = questions.length - 1;

  // Handle different question fields in custom vs standard categories
  const questionText =
    currentQuestion.question_text || currentQuestion.question;
  const options = currentQuestion.options || [];
  const correctAnswerValue = currentQuestion.correct_answer;

  // Sanity check for incomplete data
  if (
    !currentQuestion ||
    !questionText ||
    !correctAnswerValue ||
    !options ||
    options.length < 2
  ) {
    console.error("❌ Skipping bad question:", currentQuestion);
    // Use setTimeout to prevent stack overflow for recursive calls
    setTimeout(() => fetchQA(), 0);
    return;
  }

  questionArea.innerHTML = questionText;

  // Store correct answer
  correctAnswer = correctAnswerValue;

  // Shuffle all answer options
  answers = [...options].sort(() => Math.random() - 0.5);

  // Display all answer buttons
  const answerContainer = document.getElementById("answer-container");
  answerContainer.innerHTML = "";
  answers.forEach((answer) => {
    answerContainer.innerHTML += `<button class="answer" data-answer="${answer}" onclick="checkCorrectAnswer(this)">${answer}</button>`;
  });

  // Reset slider animation
  resetSlider();

  // Debug logs
  console.log("Question index:", removal);
  console.log("Remaining questions:", questions.length);
  console.log("Answer options:", answers);
}

// Check correct answer with debounce to prevent rapid clicks
function checkCorrectAnswer(button) {
  const now = Date.now();
  const input = button.getAttribute("data-answer");

  // Prevent rapid-fire answers (must be at least 500ms apart)
  if (now - lastAnswerTime < 500) return;
  lastAnswerTime = now;

  // Only process if not currently transitioning
  if (!isTransitioning) {
    isTransitioning = true;

    if (input === correctAnswer) {
      // flash screen green if correct
      document.body.classList.add("correct-answer");
      console.log("Correct! Input was: " + input);
      updateScore(100); // Increment the score by 100 when correct
    } else {
      // flash red if incorrect
      document.body.classList.add("incorrect-answer");
      console.log(
        "Incorrect! Input was: " +
          input +
          "\n Correct answer was: " +
          correctAnswer
      );
    }

    // Remove flash effect after a short delay
    setTimeout(() => {
      document.body.classList.remove("correct-answer", "incorrect-answer");
    }, 300);

    // Cancel current animation before fetching next question
    if (currentAnimationFrame) {
      cancelAnimationFrame(currentAnimationFrame);
      currentAnimationFrame = null;
    }

    // Get next question
    fetchQA();

    // Allow transitions again after a delay
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// Update score
function updateScore(points) {
  score += points;
  document.getElementById("score").innerText = `${score
    .toString()
    .padStart(4, "0")}`; // Format the score as 0000
}

// Game ends
function endGame() {
  // Get final time from stopwatch display
  let finalTime = document.getElementById("stopwatch").innerText;

  // Store finalScore and finalTime in localStorage
  localStorage.setItem("finalScore", score);
  localStorage.setItem("finalTime", finalTime);

  // Clear the custom category ID when game is over
  localStorage.removeItem("customCategoryId");

  // Redirect to finalScore.html
  window.location.href = "finalScore.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Apply dark mode based on localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
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

// Add this to style.css for visual feedback (optional)
/*
.correct-answer {
    background-color: rgba(0, 255, 0, 0.3);
    transition: background-color 0.3s;
}

.incorrect-answer {
    background-color: rgba(255, 0, 0, 0.3);
    transition: background-color 0.3s;
}
*/