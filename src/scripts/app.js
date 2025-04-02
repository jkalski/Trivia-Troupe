let selectedCategory = localStorage.getItem("selectedCategory") || ""; // Get selected category from localStorage
let questions = [];

fetch(`http://127.0.0.1:5000/questions?category=${encodeURIComponent(selectedCategory)}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        questions = data;
        console.log(`Questions for category "${selectedCategory}" loaded:`, questions);

        // show category on the screen
        const categoryDisplay = document.getElementById("categoryDisplay");
        if (categoryDisplay) {
            categoryDisplay.innerText = `Category: ${selectedCategory}`;
        }
    })
    .catch((error) => console.error("Error loading questions from backend:", error));


//  stopwatch starts. 
function startStopwatch() {
    const stopwatch = document.getElementById("stopwatch");
    let counter = 0;
    let countup;
    countup = setInterval(() => {
        let minutes = Math.floor(counter / 60000); // Converts milliseconds to minutes
        let seconds = Math.floor(counter % 60000 / 1000); // Get remainder in seconds
        let milliseconds = Math.floor((counter % 1000) / 10); //Get two-digit milliseconds

        // Format display
        let formattedTime =
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
        //`${milliseconds.toString().padStart(2, '0')}`; // If we want milliseconds displayed

        stopwatch.innerHTML = formattedTime;
        counter += 10;
    }, 10)
};

// Having the slider move
function startSliderAnimation() {
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
            requestAnimationFrame(moveSlider);
        }
        else {
            //When timer reaches 0, reset the slider and go to the next question
            fetchQA();
            resetSlider();
        }
    }

    moveSlider();
}

//Reseet the slider back to the right side
function resetSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${document.querySelector(".progress-container").offsetWidth}px)`;

    setTimeout(() => {
        startSliderAnimation();
    }, 100); // Restart with small delay
}


// fetch question and answers
let score = 0; // Initialize score as global variable
let correctAnswer;
let answers = [];

function fetchQA() {
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.style.display = 'none'; // hide start button on start

    //Checking if the questions array is empty
    if (questions.length === 0) {
        endGame(); //End the game and go to the final screen page
        return;
    }

    // Pick a random question and remove it from the array
    let removal = Math.floor(Math.random() * questions.length);
    const questionArea = document.getElementById("question");
    const currentQuestion = questions[removal];

    questions[removal] = questions[questions.length - 1];
    questions.length = questions.length - 1;

    // Sanity check for incomplete data
    if (
        !currentQuestion ||
        !currentQuestion.question ||
        !currentQuestion.correct_answer ||
        !currentQuestion.options ||
        currentQuestion.options.length < 4
    ) {
        console.error("❌ Skipping bad question:", currentQuestion);
        fetchQA(); // Skip and try another
        return;
    }

    questionArea.innerHTML = currentQuestion.question;

    // Store correct answer
    correctAnswer = currentQuestion.correct_answer;

    // Shuffle all answer options
    answers = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    // Display all answer buttons
    const answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = "";
    answers.forEach((answer) => {
        answerContainer.innerHTML += `<button class="answer" onclick="checkCorrectAnswer('${answer}')">${answer}</button>`;
    });

    //Reset slider animation
    resetSlider();

    // Debug logs
    console.log(removal);
    console.log(questions);
    console.log(answers);
}

//check correct
function checkCorrectAnswer(input) {
    if (input === correctAnswer) {
        // flash screen green if correct
        console.log("Correct! Input was: " + input);
        updateScore(100); // Increment the score by 100 when correct
    } else {
        // flash red if incorrect
        console.log("Incorrect! Input was: " + input + "\n Correct answer was: " + correctAnswer);
    }
    fetchQA();
}


//update score   ??????
function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = `${score.toString().padStart(4, '0')}`; //Format the score as 0000
}

//stopwatch/game ends
function endGame() {
    //Get final time from stopwatch display
    let finalTime = document.getElementById("stopwatch").innerText;

    //Store finalScore and finalTime in localStorage (FOR NOW);
    localStorage.setItem("finalScore", score);
    localStorage.setItem("finalTime", finalTime);

    // Redirect to finalScore.html
    window.location.href = "finalScore.html";
}
