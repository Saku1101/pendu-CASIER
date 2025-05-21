const word = "CASIER";
let guessedLetters = [];
let remainingGuesses = 4;
let wordDisplay = document.getElementById("word-display");
let remainingGuessesDisplay = document.getElementById("remaining-guesses");
let guessedLettersDisplay = document.getElementById("guessed");
let messageDisplay = document.getElementById("message");
let letterInput = document.getElementById("letter-input");
let guessButton = document.getElementById("guess-button");

// Fonction pour afficher le mot avec des underscores
function updateWordDisplay() {
    let display = "";
    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display.trim();
}

// Fonction pour mettre à jour l'affichage des lettres devinées
function updateGuessedLettersDisplay() {
    guessedLettersDisplay.textContent = guessedLetters.join(", ");
}

// Fonction pour gérer les tentatives
function guessLetter() {
    const letter = letterInput.value.toUpperCase();
    letterInput.value = ""; // Efface l'input

    if (!letter.match(/^[A-Z]$/)) {
        messageDisplay.textContent = "Veuillez entrer une lettre valide.";
        return;
    }

    if (guessedLetters.includes(letter)) {
        messageDisplay.textContent = "Vous avez déjà essayé cette lettre.";
        return;
    }

    guessedLetters.push(letter);
    updateGuessedLettersDisplay();

    if (word.includes(letter)) {
        updateWordDisplay();
        if (!wordDisplay.textContent.includes("_")) {
            messageDisplay.textContent = "Félicitations ! Vous avez gagné !";
            guessButton.disabled = true; // Désactive le bouton après la victoire
        } else {
            messageDisplay.textContent = "Bonne devinette !";
        }
    } else {
        remainingGuesses--;
        remainingGuessesDisplay.textContent = remainingGuesses;
        messageDisplay.textContent = "Mauvaise lettre.";
        if (remainingGuesses === 0) {
            messageDisplay.textContent = "Vous avez perdu ! Le mot étais -.-. .- ... .. . .-.";
            guessButton.disabled = true; // Désactive le bouton après la défaite
        }
    }
}

// Initialisation du jeu
updateWordDisplay();
guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});
