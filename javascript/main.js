// * GLOBAL VARIABLES
let splashScreen = document.querySelector("#splash-screen");
let canvas = document.querySelector("#my-canvas");
let gameOverScreen = document.querySelector("#gameover-screen");

let ctx = canvas.getContext("2d");
let newGame;

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
    // desaparecer el splash-screen y aparecer el canvas
    splashScreen.style.display = "none";
    canvas.style.display = "flex";
    // ejecutar mi juego
    newGame = new Game();
    newGame.gameLoop();
};

// * ADD EVENT LISTENERS
let startButtonDOM = document.querySelector("#start-btn");
startButtonDOM.addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
    let keyPressed = e.code;
    if (canvas.style.display === "flex") {
        switch (true) {
            case (keyPressed === "ArrowLeft"  || keyPressed === "KeyA"):
                newGame.player.moveLeft();
                break;
            case (keyPressed === "ArrowUp" || keyPressed === "KeyW" || keyPressed === "Space"):
                newGame.player.jump()
                break;
            case (keyPressed === "KeyD" || keyPressed === "ArrowRight"):
                newGame.player.moveRight()
                break;
            case (keyPressed === "ControlLeft"):
                newGame.spawnAttack()
                break;
        }
    }

});
