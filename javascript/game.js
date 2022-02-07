class Game{
    constructor(){
        this.bg = new Image();
        this.player = new Player();
        this.enemyArr = [new Enemy()]
        this.attacksArr = []
        this.bg.src = "./images/level01.jpg"
        this.gameIsActive = true;
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

    collisionWithPlayer = () => {
        this.enemyArr.forEach((enemy) => {
            if (this.player.x + 10 < enemy.x + enemy.width &&
                this.player.x - 10 + this.player.width > enemy.x &&
                this.player.y + 10 < enemy.y + enemy.height &&
                this.player.height + this.player.y - 10 > enemy.y) {
                console.log("Enemy hit to player")
                /* TODO:
                *   Reduce Lives
                *   Change display of lives
                *   If zero lives, end game, show gameOver screen
                * */
            }

        })
    }

    collisionWithAttack = () => {
        this.attacksArr.forEach((attack, attackIndex)=>{
            if (attack.isActive){
                this.enemyArr.forEach((enemy, enemyIndex) =>{
                    if (attack.x + 25 < enemy.x + enemy.width &&
                        attack.x - 5 + attack.width > enemy.x &&
                        attack.y + 5 < enemy.y + enemy.height &&
                        attack.height + attack.y - 5 > enemy.y) {
                        console.log("Bubble hit enemy")
                        /* TODO:
                        *   Remove Enemy from Array
                        *   Remove Bubble from Array
                        *   Add points to score
                        *   PopUp a bubble with enemy inside
                        * */
                    }
                })
            }
        })
    }

    // check if player/enemy on wall:

    // Game Loop
    gameLoop = () =>{
        // Clear the old elements
        this.clearBackground();
        // Move elements
        this.player.gravity();

        // scrap all the attacks launched on the game
        this.attacksArr.forEach((attack) =>{
            attack.moveAttack()
            // remove attacks from the array
            if (attack.y<(0-attack.height/2)) {
                this.attacksArr.shift();
            }
        })
        this.enemyArr.forEach((enemy) =>{
            enemy.moveEnemy(this.player)
        })


        // draw elements
        this.drawBackground();
        this.player.drawPlayer();
        this.attacksArr.forEach((attack) =>{
            attack.drawAttack();
        })
        this.enemyArr.forEach((enemy) =>{
            enemy.drawEnemy();
        })

        this.collisionWithPlayer();
        this.collisionWithAttack();

        // TODO handle lives, add a checker for player.lives and edit the display to flex or none.
        // loop game
        if (this.gameIsActive){
            requestAnimationFrame(this.gameLoop);
        }
    }
}