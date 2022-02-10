class Game {
  constructor() {
    this.bg = new Image();
    this.bonusImg = new Image();
    this.bg.src = "./images/level01.jpg";
    this.bonusImg.src = "./images/liveup.png";

    this.player = new Player();
    this.enemyArr = [];
    this.attacksArr = [];

    this.gameIsActive = true;
    this.bonusTime = 100;
    this.spawnSpeed = 500;
    this.level = 1;
    this.counter = 0;
    this.score = 0;
    this.oldLevel = 1;
    this.maxEnemies = 5;
    this.pointsPerKill = 100;

    this.newLevelMusic = new Audio();
    this.monsterCollisionMusic = new Audio();
    this.newLevelMusic.src = "./music/BubbleLevelUp.wav";
    this.monsterCollisionMusic.src = "./music/BubbleEnemyHit.wav";
  }

  // Methods required on the game
  playMonsterCollision = () => {
    /*
     * Music when enemy hits player
     * */
    this.monsterCollisionMusic.volume = 0.1;
    this.monsterCollisionMusic.play().then(() => {
      return true;
    });
  };

  playLevelUpMusic = () => {
    /*
     * Music when player level up
     * */
    this.newLevelMusic.volume = 0.1;
    this.newLevelMusic.play().then(() => {
      return true;
    });
  };

  // Background Methods
  clearBackground = () => {
    /*
     * Clear the screen.
     * */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  drawBackground = () => {
    /*
     * Draw the Background
     * */
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

  drawData = () => {
    /*
     * Update the score in game screen and game over screen
     * */
    scoreText.innerText = this.score.toString();
    gameOverScore.innerText = this.score.toString();
    levelText.innerText = `${this.level}`;
  };

  drawBonus = () => {
    /*
     * Draw the image about extra live given to player
     * */
    this.bonusTime++;
    if (this.bonusTime < 100) {
      ctx.drawImage(this.bonusImg, 660, 514, 64, 60);
    }
  };

  spawnAttack = () => {
    /*
     * When player push attack button, a new attack is created and added into the array
     * */
    this.attacksArr.push(new Attack(this.player));
  };

  spawnEnemy = () => {
    /*
     * Function that controls the enemies spawn, at level that is multiple of 5, appear 2 enemies instead 1
     * */
    if (this.enemyArr.length <= this.maxEnemies) {
      if (this.counter % this.spawnSpeed === 0) {
        if (this.level % 5 !== 0) {
          this.enemyArr.push(new Enemy());
        } else {
          this.enemyArr.push(new Enemy());
          this.enemyArr.push(new Enemy());
        }
      }
    }
  };

  increaseLevel = () => {
    /*
     * Increase the difficult of the game when the player increase its level.
     * As higher is the level of the user, higher is the spawn speed.
     * */
    if (this.score % 500 === 0 && this.score !== 0) {
      for (let i = this.level; i > 0; i--) {
        if (i === this.level) {
          this.spawnSpeed = 500 / 2 + 100;
        } else {
          this.spawnSpeed = Math.floor(this.spawnSpeed / 2 + 100);
          if (this.spawnSpeed <= 200) {
            this.spawnSpeed = this.spawnSpeed - this.level * 2;
            if (this.spawnSpeed < 50) {
              this.spawnSpeed = 50;
            }
          }
        }
      }
      this.oldLevel = this.level;
      this.level = this.score / 500 + 1;
      if (this.oldLevel !== this.level) {
        this.bonusLive();
        this.playLevelUpMusic();
      }
    }
  };

  bonusLive = () => {
    /*
     * Each 5 levels, the user receive an extra life if he got less than 3.
     * */
    if (this.level % 5 === 0) {
      if (this.player.lives < 3) {
        this.player.lives++;
        this.livesHandler();
        this.bonusTime = 0;
      }
    }
  };

  collisionWithPlayer = () => {
    /*
     * Detects the collision of an enemy with the player
     * */
    this.enemyArr.forEach((enemy) => {
      if (!enemy.isDed) {
        if (
          this.player.x + 10 < enemy.x + enemy.width &&
          this.player.x - 10 + this.player.width > enemy.x &&
          this.player.y + 10 < enemy.y + enemy.height &&
          this.player.height + this.player.y - 10 > enemy.y
        ) {
          enemy.isDed = true;
          enemy.img.src = "./images/enemy_player_ded.png";
          this.player.lives--;
          this.player.play_collission();
          this.livesHandler();
        }
      }
    });
  };

  collisionWithAttack = () => {
    /*
     * Detects the collision of an enemy with a bubble.
     * */
    this.attacksArr.forEach((attack) => {
      if (attack.isActive) {
        this.enemyArr.forEach((enemy, enemyIndex) => {
          if (
            attack.x + 25 < enemy.x + enemy.width &&
            attack.x - 5 + attack.width > enemy.x &&
            attack.y + 5 < enemy.y + enemy.height &&
            attack.height + attack.y - 5 > enemy.y
          ) {
            this.score += this.pointsPerKill;
            this.enemyArr.splice(enemyIndex, 1);
            attack.attack_length = 0;
            attack.img.src = "./images/enemy-ded.png";
            attack.width = enemy.width;
            attack.height = enemy.height;
            attack.isDed = true;
            this.playMonsterCollision();
          }
        });
      }
    });
  };

  livesHandler = () => {
    /*
     * Adapt the display to the current lives, if lives = 0, it disables
     * the game screen and goes to game over screen.
     * It's also in charge of show the hearts at top left of the screen.
     * */
    if (this.player.lives <= 0) {
      this.gameIsActive = false;
      canvas.style.display = "none";
      gameScreen.style.display = "none";
      gameOverScreen.style.display = "flex";
      audio.pause();
    } else if (this.player.lives > 0) {
      switch (this.player.lives) {
        case 1:
          live2.style.display = "none";
          live3.style.display = "none";
          break;
        case 2:
          live2.style.display = "inline";
          live3.style.display = "none";
          break;
        case 3:
          live2.style.display = "inline";
          live3.style.display = "inline";
      }
    }
  };

  removeDedEnemies = () => {
    /*
     * Check if the enemy is dead in both conditions and remove it from the array.
     * */
    this.enemyArr.forEach((enemy, enemyIndex) => {
      if (enemy.isDed && enemy.totallyDed) {
        this.enemyArr.splice(enemyIndex, 1);
      }
    });
  };

  handleAttack = (attack, index) => {
    /*
     * In charge of move the attack and remove in case it reaches the top of the screen.
     * */
    attack.moveAttack();
    // remove attacks from the array
    if (attack.y < 0 - attack.height / 2) {
      this.attacksArr.splice(index, 1);
    }
  };

  // check if player/enemy on wall:

  // Game Loop
  gameLoop = () => {
    // Clear the old elements
    this.clearBackground();

    // Move elements
    this.player.gravity();
    this.spawnEnemy();
    this.attacksArr.forEach((attack, index) =>
      this.handleAttack(attack, index)
    );
    this.enemyArr.forEach((enemy) => enemy.moveEnemy(this.player));

    // draw elements
    this.drawBackground();
    this.drawBonus();
    this.player.drawPlayer();
    this.attacksArr.forEach((attack) => attack.drawAttack());
    this.enemyArr.forEach((enemy) => enemy.drawEnemy());
    this.drawData();
    this.increaseLevel();
    this.removeDedEnemies();
    this.collisionWithPlayer();
    this.collisionWithAttack();

    // loop game
    if (this.gameIsActive) {
      requestAnimationFrame(this.gameLoop);
      this.counter++;
    }
  };
}
