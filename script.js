const gameData = {
    currentWord: "",
    progress: 0,
    possibleWords: ["sofa", "kompiuteris", "javascript", "obuolys", "bitas", "saldainis", "monitorius", "puodas", "dievas", "peilis", "pokeris"],
    chooseRandomWord: function() {
        const randomIndex = Math.floor(Math.random() * this.possibleWords.length);
        this.currentWord = this.possibleWords[randomIndex];
    }
};

// Math.random(0.5) = 1
// Math.random(2.1) = 2
// Math.floor(2.8) = 2
// Math.ceil(2.1) = 3

const UI = {
    wordElement: document.querySelector(".word"),
    progressBar: document.querySelector(".bar"),
    popup: document.querySelector(".popup"),
    timer: document.querySelector(".timer"),
    congratsPopup: document.querySelector(".congrats"),
    nextButton: document.querySelector(".next"),
    winnerAudio: document.querySelector(".winnerAudio"),
    gameOverAudio: document.querySelector(".gameOverAudio"),
    correctLetterAudio: document.querySelector(".correctLetter"),
    wrongLetterAudio: document.querySelector(".wrongLetter"),
    easyButton: document.querySelector(".easy"),
    mediumButton: document.querySelector(".medium"),
    hardButton: document.querySelector(".hard"),
    easySelected: document.querySelector(".easySelected"),
    mediumSelected: document.querySelector(".mediumSelected"),
    hardSelected: document.querySelector(".hardSelected"),
    hint: document.querySelector(".hint"),
    markGreat: document.querySelector(".markGreat"),
    markBad: document.querySelector(".markBad"),
    easyClick: document.querySelector(".easyClick"),
    mediumClick: document.querySelector(".mediumClick"),
    hardClick: document.querySelector(".hardClick"),
    nextClick: document.querySelector(".nextClick"),
    // againButton: document.querySelector(".again")
}

function hintForWord() {
    if (gameData.currentWord === "sofa") {
        UI.hint.innerHTML = "Sėdėti ant jos galima svetainėje.";
    } 
    if (gameData.currentWord === "kompiuteris") {
        UI.hint.innerHTML = "Prietaisas, kuriuo dabar mokomės JavaScript.";
    }
    if (gameData.currentWord === "javascript") {
        UI.hint.innerHTML = "Ką mes dabar mokomės?";
    }
    if (gameData.currentWord === "obuolys") {
        UI.hint.innerHTML = "Kas krenta nuo medžio?";
    }
    if (gameData.currentWord === "bitas") {
        UI.hint.innerHTML = "Elementarusis informacijos matavimo vienetas.";
    }
    if (gameData.currentWord === "saldainis") {
        UI.hint.innerHTML = "Gaminys iš cukraus.";
    }
    if (gameData.currentWord === "monitorius") {
        UI.hint.innerHTML = "Prietaisas, kuris leidžia vizualiai stebėti tam tikrus procesus.";
    }
    if (gameData.currentWord === "puodas") {
        UI.hint.innerHTML = "Indas, kuriame verdame sriubą.";
    }
    if (gameData.currentWord === "dievas") {
        UI.hint.innerHTML = "Antgamtinė esybė, garbinimo ir tikėjimo objektas.";
    }
    if (gameData.currentWord === "peilis") {
        UI.hint.innerHTML = "Pjaunamas vienašmenis įrankis arba ginklas.";
    }
    if (gameData.currentWord === "pokeris") {
        UI.hint.innerHTML = "Įgūdžių reikalaujantis kortų žaidimas.";
    }
}

UI.popup.style.display = "none";
UI.congratsPopup.style.display = "none";
UI.markGreat.style.display = "none";
UI.markBad.style.display = "none";

//Žaidimo sudėtingumas
let difficulty = 1;
UI.easySelected.style.opacity = "1";
UI.easyButton.addEventListener("click", () => {
    UI.easyClick.play();
    difficulty = 1;
    UI.easySelected.style.opacity = "1";
    UI.mediumSelected.style.opacity = "0";
    UI.hardSelected.style.opacity = "0";
    console.log("Žaidėjas pasirinko lengvą sudėtingumą.");
    initGame();
    restartProgressBar();
});
UI.mediumButton.addEventListener("click", () => {
    UI.mediumClick.play();
    difficulty = 2;
    UI.easySelected.style.opacity = "0";
    UI.mediumSelected.style.opacity = "1";
    UI.hardSelected.style.opacity = "0";
    console.log("Žaidėjas pasirinko vidutinį sudėtingumą.");
    initGame();
    restartProgressBar();
});
UI.hardButton.addEventListener("click", () => {
    UI.hardClick.play();
    difficulty = 3;
    UI.easySelected.style.opacity = "0";
    UI.mediumSelected.style.opacity = "0";
    UI.hardSelected.style.opacity = "1";
    console.log("Žaidėjas pasirinko sunkų sudėtingumą.");
    initGame();
    restartProgressBar();
});

function generateLetters() {
    UI.wordElement.innerHTML = "";

    for (let i = 0; i < gameData.currentWord.length; i++) {
        UI.wordElement.innerHTML += "<div></div>";
    }
}

function drawProgressBar() {
    UI.progressBar.style.width = `${gameData.progress}%`;
}

function initGame() {
    renderNewWord();
    drawProgressBar();
    hintForWord();
}

initGame();

// Kai žmogus paspaudžia klaviatūros mygtuką
document.addEventListener("keydown", (e) => {
    const letter = e.key;

    console.log(letter);

    let letterFound = false;

    // Patikrinti, ar tokia raidė egzistuoja žodyje
    for (let i = 0; i < gameData.currentWord.length; i++) {
        const wordLetter = gameData.currentWord[i];

        // Jei žmogus atspėjo raidę
        if (letter === wordLetter) {
            UI.correctLetterAudio.play();
            console.log(`Žaidėjas atspėjo raidę ${i} pozicijoje`);

            UI.wordElement.childNodes[i].innerHTML = letter;
            letterFound = true;
            goodMark();
        }
    }

    // Patikriname, ar nebuvo rasta nei viena raidė
    if (letterFound === false && difficulty === 1) {
        console.log("Pridedame žmogui baudos taškų!");
        UI.wrongLetterAudio.play();
        addProgress(15);
        badMark();
    }
    if (letterFound === false && difficulty === 2) {
        console.log("Pridedame žmogui baudos taškų!");
        UI.wrongLetterAudio.play();
        addProgress(25);
        badMark();
    }
    if (letterFound === false && difficulty === 3) {
        console.log("Pridedame žmogui baudos taškų!");
        UI.wrongLetterAudio.play();
        addProgress(50);
        badMark();
    }
    checkLoseCondition();
    checkWinCondition();
});

function goodMark() {
    UI.markGreat.style.display = "block";
    setInterval(() => {
        UI.markGreat.style.display = "none";
    }, 1000);
}

function badMark() {
    UI.markBad.style.display = "block";
    setInterval(() => {
        UI.markBad.style.display = "none";
    }, 1000);
}

function checkLoseCondition() {
    if (gameData.progress >= 100) {
        restartProgressBar();
        initGame();
        showPopup();
        console.log("Žaidėjas pralaimėjo");
    }
}

function checkWinCondition() {
    for (let letterElement of UI.wordElement.childNodes) {
        if (letterElement.innerHTML === "")
            return;
    }

    console.log("Žodis atspėtas!");
    showWinPopup();
    
    // Įdėjau papildomą logiką naujo žodžio sugeneravimui
    // Dar viena eilutė
}

function addProgress(progressAmount) {
    gameData.progress += progressAmount;

    // if (gameData.progress > 100)
    //     gameData.progress = 100;
    gameData.progress = Math.min(100, gameData.progress);

    drawProgressBar();
}

function renderNewWord() {
    gameData.chooseRandomWord();
    generateLetters();
}

function restartProgressBar() {
        gameData.progress = 0;    
}


//Kai būna GAME OVER, parodomas pop up trims sekundėms
function showPopup() {
    UI.gameOverAudio.play();
    UI.popup.style.display = "block";
    setInterval(function() {
        UI.popup.style.display = "none";
    }, 3000);
    // countDown();
    // setInterval(countDown(), 3 * 1000); //Turiu klausima dėl Count Down. Kaip jį padaryti? Kodėl man display:flex; nebegalioja, kai padarau šičia display
}

// function countDown() {
//     let time = 3;
//     let seconds = time % 60;
//     UI.timer.innerHTML = `${seconds}`;
//     time--;
// }

//Atspėjus žodį, parodome tekstą, jog žodis buvo atspėtas
function showWinPopup() {
    UI.congratsPopup.style.display = "block";
    UI.winnerAudio.play();
}

//Paspaudus mygtuka "TOLIAU", paslepiame tekstą, jog žodis buvo atspėtas ir generuojame viską iš naujo
UI.nextButton.addEventListener("click", () => {
    initGame();
    UI.nextClick.play();
    UI.congratsPopup.style.display = "none";
})

// UI.againButton.addEventListener("click", () => {
//     initGame();
//     UI.popup.style.display = "none";
// })
