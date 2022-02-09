// * GLOBAL VARIABLES
const splashScreen = document.querySelector("#splash-screen");
const gameScreen = document.querySelector("#game-screen");
const canvas = document.querySelector("#my-canvas");
const gameOverScreen = document.querySelector("#gameover-screen");

let scoreText = document.querySelector("#game-score span");
let gameOverScore = document.querySelector("#score-text span");
let levelText = document.querySelector("#level-text span");

const live2 = document.querySelector("#live2");
const live3 = document.querySelector("#live3");

const ctx = canvas.getContext("2d");
let newGame;

let audio = new Audio();
audio.src = "./music/BubbleBobbleMusic.mp3";
audio.volume = 0.01;

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  audio.play().then(() => {
    return true;
  });
  audio.loop = true;
  // desaparecer el splash-screen y aparecer el canvas
  splashScreen.style.display = "none";
  gameScreen.style.display = "flex";
  canvas.style.display = "flex";
  // ejecutar mi juego
  newGame = new Game();
  newGame.gameLoop();
};

// * ADD EVENT LISTENERS
const startButtonDOM = document.querySelector("#start-btn");
startButtonDOM.addEventListener("click", startGame);

const reStartButtonDOM = document.querySelector("#restart-btn");
reStartButtonDOM.addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
  const keyPressed = e.code;
  if (canvas.style.display === "flex") {
    switch (true) {
      case keyPressed === "ArrowLeft" || keyPressed === "KeyA":
        newGame.player.moveLeft();
        break;
      case keyPressed === "ArrowUp" ||
        keyPressed === "KeyW" ||
        keyPressed === "Space":
        newGame.player.jump();
        break;
      case keyPressed === "KeyD" || keyPressed === "ArrowRight":
        newGame.player.moveRight();
        break;
      case keyPressed === "ControlLeft":
        newGame.spawnAttack();
        break;
    }
  }
});
