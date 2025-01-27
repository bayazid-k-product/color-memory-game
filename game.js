const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
let colorSequence = [];
let playerSequence = [];
let currentLevel = 0;

// عند تحميل الصفحة تبدأ اللعبة تلقائيًا
window.onload = function() {
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
    // إخفاء الألوان الحالية
    document.getElementById('colors-container').innerHTML = "";
    document.getElementById('color-display').innerHTML = "";

    let index = 0;
    // عرض الألوان بتغيير الخلفية مع اسم اللون في النص
    const interval = setInterval(() => {
        document.body.style.backgroundColor = colorSequence[index];
        document.getElementById('color-display').innerHTML = colorSequence[index];

        // تشغيل الصوت عند عرض اللون
        playColorSound(colorSequence[index]);
        
        index++;

        if (index === colorSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                showColors();
            }, 1000);
        }
    }, 1000); // عرض كل لون لمدة ثانية
}

function playColorSound(color) {
    const sound = document.getElementById('color-sound');

    // تحديد مسار الصوت بناءً على اللون
    switch(color) {
        case "red":
            sound.src = "red.mp3"; // ضع المسار الصحيح هنا
            break;
        case "green":
            sound.src = "green.mp3";
            break;
        case "blue":
            sound.src = "blue.mp3";
            break;
        case "yellow":
            sound.src = "yellow.mp3";
            break;
        case "purple":
            sound.src = "purple.mp3";
            break;
        case "orange":
            sound.src = "orange.mp3";
            break;
        case "pink":
            sound.src = "pink.mp3";
            break;
        case "cyan":
            sound.src = "cyan.mp3";
            break;
        default:
            sound.src = "";
    }

    sound.play();  // تشغيل الصوت
}

function showColors() {
    // بعد انتهاء عرض الألوان، رجع المربعات
    document.body.style.backgroundColor = "#f3f4f6";  // العودة للخلفية الأصلية
    document.getElementById('color-display').innerHTML = "";  // إخفاء اسم اللون
    displayColorBoxes();
}

function displayColorBoxes() {
    const colorBoxes = document.getElementById('colors-container');
    const uniqueColors = [...new Set(colorSequence)]; // إزالة الألوان المتكررة

    const shuffledColors = shuffleArray(uniqueColors); // خلط الألوان

    // عرض المربعات بشكل عشوائي
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
    // دالة لخلط الألوان عشوائيًا
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // تبادل العناصر
    }
    return array;
}

function playerClick(event) {
    const clickedColor = event.target.style.backgroundColor;
    playerSequence.push(clickedColor);

    // تشغيل الصوت عند اختيار اللون
    playColorSound(clickedColor);

    // التحقق من تطابق اللون
    if (playerSequence[playerSequence.length - 1] !== colorSequence[playerSequence.length - 1]) {
        showErrorMessage();  // إظهار رسالة الخطأ
    } else if (playerSequence.length === colorSequence.length) {
        setTimeout(nextRound, 1000);  // الانتقال للدور التالي بعد نجاح اللاعب
    }
}

function showErrorMessage() {
    // إظهار رسالة الخطأ
    document.getElementById('error-message').style.display = 'block';
}

function retryGame() {
    // إعادة تشغيل اللعبة من البداية
    document.getElementById('error-message').style.display = 'none';
    startGame();
}

function goToMainMenu() {
    // العودة إلى الصفحة الرئيسية
    alert("الرجوع إلى الصفحة الرئيسية...");
}
