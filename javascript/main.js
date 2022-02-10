// * GLOBAL VARIABLES
const splashScreen = document.querySelector("#splash-screen");
const gameScreen = document.querySelector("#game-screen");
const canvas = document.querySelector("#my-canvas");
const gameOverScreen = document.querySelector("#gameover-screen");
const scoreText = document.querySelector("#game-score span");
const gameOverScore = document.querySelector("#score-text span");
const levelText = document.querySelector("#level-text span");
const live2 = document.querySelector("#live2");
const live3 = document.querySelector("#live3");

const ctx = canvas.getContext("2d");

let newGame;

const audio = new Audio();
audio.src = "./music/BubbleBobbleMusic.mp3";
audio.volume = 0.01;

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  // start game music
  audio.currentTime = 0;
  audio.play().then(() => {
    return true;
  });
  audio.loop = true;

  // remove splash-screen and draw canvas
  gameOverScreen.style.display = "none";
  splashScreen.style.display = "none";
  gameScreen.style.display = "flex";
  live2.style.display = "inline";
  live3.style.display = "inline";
  canvas.style.display = "flex";
  // Start the game
  newGame = new Game();
  newGame.gameLoop();
};

// * ADD EVENT LISTENERS
const startButtonDOM = document.querySelector("#start-btn");
startButtonDOM.addEventListener("click", startGame);

const reStartButtonDOM = document.querySelector("#restart-btn");
reStartButtonDOM.addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
  if ( canvas.style.display === "flex" ) {
    switch (true) {

      case e.code === "ArrowLeft" || e.code === "KeyA":
        newGame.player.moveLeft();
        break;

      case e.code === "ArrowUp" ||
      e.code === "KeyW" ||
      e.code === "Space":
        if ( !newGame.player.falling ) newGame.player.jump();
        break;

      case e.code === "KeyD" || e.code === "ArrowRight":
        newGame.player.moveRight();
        break;

      case e.code === "ControlLeft":
        newGame.spawnAttack();
        break;
    }
  }
});
