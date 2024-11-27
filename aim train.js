// Game Variables
let score = 0;
let timeLeft = 60;
let spawnInterval;
let countdownInterval;
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverPopup = document.getElementById('gameOverPopup');
const finalScoreDisplay = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgain');

// Countdown Variables
let countdownTime = 3; // 3-second countdown before game starts
const countdownDisplay = document.createElement('div');
countdownDisplay.id = 'countdown';
countdownDisplay.style.position = 'absolute';
countdownDisplay.style.top = '50%';
countdownDisplay.style.left = '50%';
countdownDisplay.style.transform = 'translate(-50%, -50%)';
countdownDisplay.style.fontSize = '48px';
countdownDisplay.style.color = 'white';
document.body.appendChild(countdownDisplay);

// Get difficulty from URL
const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

// Set target spawn time based on difficulty
let spawnTime;
if (difficulty === 'easy') {
    spawnTime = 1000; // 1 second
} else if (difficulty === 'medium') {
    spawnTime = 850; // 0.85 seconds
} else {
    spawnTime = 700; // 0.7 seconds
}

// Crosshair Movement
document.addEventListener('mousemove', (e) => {
    const crosshair = document.getElementById('crosshair');
    crosshair.style.left = `${e.clientX}px`;
    crosshair.style.top = `${e.clientY}px`;
});

// Random Position Generator
function getRandomPosition() {
    const x = Math.floor(Math.random() * (window.innerWidth - 50));
    const y = Math.floor(Math.random() * (window.innerHeight - 50));
    return { x, y };
}

// Spawn Target
function spawnTarget() {
    const { x, y } = getRandomPosition();
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.display = 'block';
}

// Click Target
target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    target.style.display = 'none';

    // Clear the existing interval and reset it based on difficulty
    clearInterval(spawnInterval);
    setSpawnInterval();
    
    spawnTarget(); // Immediately show the next target
});

// Function to set spawn interval based on difficulty
function setSpawnInterval() {
    spawnInterval = setInterval(spawnTarget, spawnTime);
}

// Timer Countdown
function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// End Game
function endGame() {
    target.style.display = 'none';
    clearInterval(spawnInterval);
    gameOverPopup.style.display = 'block';
    finalScoreDisplay.textContent = `Final Score: ${score}`;
}

// 3-Second Countdown before Game Starts
function startCountdown() {
    countdownDisplay.textContent = countdownTime;
    countdownInterval = setInterval(() => {
        countdownTime--;
        countdownDisplay.textContent = countdownTime;
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.style.display = 'none';
            startGame();
        }
    }, 1000);
}

// Game Start
function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    gameOverPopup.style.display = 'none';
    
    startTimer();
    setSpawnInterval(); // Set the spawn interval based on difficulty
}

// Play Again Button
playAgainBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to difficulty selection page
});

// Start the countdown when the page loads
startCountdown();
