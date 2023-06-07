// Toutes les variables dont j'ai besoin
const player_0 = document.querySelector(".player_0");
const player_1 = document.querySelector(".player_1");

const newGame = document.getElementById("newgamebtn");
const rollTheDice = document.getElementById("rolldice");

const holdScore = document.getElementById("hold");

const global_0 = document.getElementById("global_0");
const global_1 = document.getElementById("global_1");

const current_0 = document.getElementById("current_0");
const current_1 = document.getElementById("current_1");

const dice = document.querySelector("img");

// Valeur des scrores global et current par défault
global_0.textContent = "0";
global_1.textContent = "0";

current_0.textContent = "0";
current_1.textContent = "0";

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playGame = true;

// ***** SWITCH PLAYER FUNCTION *****
const switchPlayer = function () {
  // Sinon on change de jouer, si c'est le joueur 1 on passe au 0 et vice-verca
  document.getElementById(`current_${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Change de style selon le jouer actif
  player_0.classList.toggle("player_active");
  player_1.classList.toggle("player_active");
};

// ***** NEW GAME FUNCTION *****
newGame.addEventListener("click", () => {
  playGame = true;
  currentScore = 0;

  global_0.textContent = "0";
  global_1.textContent = "0";
  current_0.textContent = "0";
  current_1.textContent = "0";

  document
    .querySelector(`.player_${activePlayer}`)
    .classList.remove("player_winner");
});
// ********************

// ***** ROLL THE DICE FUNCTION *****
rollTheDice.addEventListener("click", () => {
  if (playGame) {
    // Génère un nombre random de 1 à 6
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    // Génère une face de dès de 1 à 6 en fonction du 'randomNumber'
    let diceImage = `assets/dice${randomNumber}.png`;
    let imgDice = document.querySelector("img");
    imgDice.setAttribute("src", diceImage);
    dice.classList.remove("hidden");
    // Si le nombre est diférent de 1, ajoute le score à 'current'
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current_${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// ***** HOLD THE SCORE FUNCTION *****
holdScore.addEventListener("click", () => {
  if (playGame) {
    // Ajoute le current score au global score
    scores[activePlayer] += currentScore;
    document.getElementById(`global_${activePlayer}`).textContent =
      scores[activePlayer];
    // Si le score du joueur en cour est supérieur à 100, ajoute la class "player_winner"
    if (scores[activePlayer] >= 100) {
      playGame = false;
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add("player_winner");
      document;
      // .querySelector(`.player_${activePlayer}`)
      // .classList.add("player_active");
      dice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});
