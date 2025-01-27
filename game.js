const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
let colorSequence = [];
let playerSequence = [];
let currentLevel = 0;

const soundPaths = {
    red: "red.mp3",
    green: "green.mp3",
    blue: "blue.mp3",
    yellow: "yellow.mp3",
    purple: "purple.mp3",
    orange: "orange.mp3",
    pink: "pink.mp3",
    cyan: "cyan.mp3",
};

// عند تحميل الصفحة تبدأ اللعبة تلقائيًا
window.onload = function () {
    startGame();
};

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
    document.getElementById("colors-container").innerHTML = "";
    document.getElementById("color-display").innerHTML = "";
    let delay = 0;

    colorSequence.forEach((color, index) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            document.getElementById("color-display").innerHTML = color;
            playColorSound(color);
        }, delay);

        delay += 1000;
    });

    setTimeout(showColors, delay + 500);
}

function playColorSound(color) {
    const sound = document.getElementById("color-sound");
    sound.src = soundPaths[color] || "";
    sound.play();
}

function showColors() {
    document.body.style.backgroundColor = "#f3f4f6";
    document.getElementById("color-display").innerHTML = "";
    displayColorBoxes();
}

function displayColorBoxes() {
    const colorBoxes = document.getElementById("colors-container");
    const uniqueColors = [...new Set(colorSequence)];
    const shuffledColors = shuffleArray(uniqueColors);

    shuffledColors.forEach((color) => {
        let box = document.createElement("div");
        box.classList.add("color-box");
        box.style.backgroundColor = color;
        box.setAttribute("data-color", color);
        box.addEventListener("click", playerClick);
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

    playColorSound(clickedColor);

    if (playerSequence[playerSequence.length - 1] !== colorSequence[playerSequence.length - 1]) {
        showErrorMessage();
    } else if (playerSequence.length === colorSequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function showErrorMessage() {
    document.getElementById("error-message").style.display = "block";
}

function retryGame() {
    document.getElementById("error-message").style.display = "none";
    startGame();
}
