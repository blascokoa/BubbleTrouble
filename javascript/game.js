class Game{
    constructor(){
        this.bg = new Image();
        this.player = new Player();
        this.attacksArr = []
        this.bg.src = "./images/level01.jpg"
    }
    // Methods required on the game

    // Background Methods
    clearBackground = () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
}
    drawBackground = () =>{
        ctx.drawImage(this.bg, 0,0,canvas.width, canvas.height);
    }
    spawnAttack = () => {
        console.log("Drawing attack")
        this.attacksArr.push(new Attack(this.player))
    }

    // check if player/enemy on wall:

    // Game Loop
    gameLoop = () =>{
        // Clear the old elements
        this.clearBackground();
        // Move elements
        this.player.gravity();
        this.attacksArr.forEach((attack) =>{
            attack.moveAttack()
            if (attack.y<(0-attack.height/2)) {
                this.attacksArr.shift();
            }
        })
        // draw elements
        this.drawBackground();
        this.player.drawPlayer();
        this.attacksArr.forEach((attack) =>{
            attack.drawAttack();
        })
        // loop game
        requestAnimationFrame(this.gameLoop);
    }
}