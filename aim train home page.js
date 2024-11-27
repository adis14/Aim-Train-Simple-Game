// Get difficulty buttons
const easyButton = document.querySelector('.easy');
const mediumButton = document.querySelector('.medium');
const hardButton = document.querySelector('.hard');

// Get the pop-up elements
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Function to show pop-up
function showPopup() {
    popup.style.display = 'block';
}

// Function to close pop-up and start the game
function startGame(difficulty) {
    popup.style.display = 'none';
    // Redirect to the game page with difficulty parameter
    window.location.href = `game.html?difficulty=${difficulty}`;
}

// Add event listeners to buttons
easyButton.addEventListener('click', () => {
    showPopup();
    closePopup.addEventListener('click', () => startGame('easy'));
});

mediumButton.addEventListener('click', () => {
    showPopup();
    closePopup.addEventListener('click', () => startGame('medium'));
});

hardButton.addEventListener('click', () => {
    showPopup();
    closePopup.addEventListener('click', () => startGame('hard'));
});
