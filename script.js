// بدء اللعبة
document.getElementById('start-game-btn').addEventListener('click', () => {
    document.querySelector('.main-content').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    startGame();
});

// الوظائف الخاصة باللعبة
const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
let colorSequence = [];
let playerSequence = [];
let currentLevel = 0;

function startGame() {
    colorSequence = [];
    playerSequence = [];
    currentLevel = 0;
    nextRound();
}

function nextRound() {
    currentLevel++;
    playerSequence = [];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    colorSequence.push(newColor);
    displaySequence();
}

function displaySequence() {
    document.getElementById('colors-container').innerHTML = "";
    document.getElementById('color-display').innerHTML = "";

    let index = 0;
    const interval = setInterval(() => {
        document.body.style.backgroundColor = colorSequence[index];
        document.getElementById('color-display').innerHTML = colorSequence[index];

        index++;

        if (index === colorSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                showColors();
            }, 1000);
        }
    }, 1000);
}

function showColors() {
    document.body.style.backgroundColor = "#f3f4f6";
    document.getElementById('color-display').innerHTML = "";
    displayColorBoxes();
}

function displayColorBoxes() {
    const colorBoxes = document.getElementById('colors-container');
    const uniqueColors = [...new Set(colorSequence)];
    const shuffledColors = shuffleArray(uniqueColors);

    shuffledColors.forEach((color) => {
        let box = document.createElement('div');
        box.classList.add('color-box');
        box.style.backgroundColor = color;
        box.setAttribute('data-color', color);
        box.addEventListener('click', playerClick);
        colorBoxes.appendChild(box);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playerClick(event) {
    const clickedColor = event.target.style.backgroundColor;
    playerSequence.push(clickedColor);

    if (playerSequence[playerSequence.length - 1] !== colorSequence[playerSequence.length - 1]) {
        showErrorMessage();
    } else if (playerSequence.length === colorSequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function showErrorMessage() {
    document.getElementById('error-message').style.display = 'block';
}

function retryGame() {
    document.getElementById('error-message').style.display = 'none';
    startGame();
}
