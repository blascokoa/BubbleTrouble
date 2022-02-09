class Game {
  constructor() {
    this.bg = new Image();
    this.player = new Player();
    this.enemyArr = [];
    this.attacksArr = [];
    this.bg.src = "./images/level01.jpg";
    this.gameIsActive = true;
    this.spawnSpeed = 500;
    this.level = 1;
    this.counter = 0;
    this.score = 0;
    this.oldLevel = 1;
    this.maxEnemies = 6;
    this.pointsPerKill = 500;

    this.newLevelMusic = new Audio();
    this.newLevelMusic.src = "./music/BubbleLevelUp.wav";

    this.monsterCollisionMusic = new Audio();
    this.monsterCollisionMusic.src = "./music/BubbleEnemyHit.wav";
  }

  // Methods required on the game
  playMonsterCollision = () => {
    this.monsterCollisionMusic.volume = 0.1;
    this.monsterCollisionMusic.play().then(() => {
      return true;
    });
  };

  playLevelUpMusic = () => {
    this.newLevelMusic.volume = 0.1;
    this.newLevelMusic.play().then(() => {
      return true;
    });
  };
  // Background Methods
  clearBackground = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  drawBackground = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

  drawData = () => {
    // Todo Solve the score text issue, its not printing and not showing the full text despite the tag
    //   is correct and not used in any other place
    scoreText.innerText = this.score.toString();
    levelText.innerText = `${this.level} - SpawnSpeed: ${this.spawnSpeed}`;
  };

  spawnAttack = () => {
    this.attacksArr.push(new Attack(this.player));
  };

  spawnEnemy = () => {
    if ( this.enemyArr.length <= this.maxEnemies ) {
      if ( this.counter % this.spawnSpeed === 0 ) {
        if ( this.level % 5 !== 0 ) {
          this.enemyArr.push(new Enemy());
        } else {
          this.enemyArr.push(new Enemy());
          this.enemyArr.push(new Enemy());
        }
      }
    }
  };

  increaseLevel = () => {
    if ( this.score % 500 === 0 && this.score !== 0 ) {
      for (let i = this.level; i > 0; i--) {
        if ( i === this.level ) {
          this.spawnSpeed = 500 / 2 + 100;
        } else {
          this.spawnSpeed = Math.floor(this.spawnSpeed / 2 + 100);
          if ( this.spawnSpeed <= 200 ) {
            this.spawnSpeed = this.spawnSpeed - this.level * 2;
            if ( this.spawnSpeed < 50 ) {
              this.spawnSpeed = 50;
            }
          }
        }
      }
      this.oldLevel = this.level;
      this.level = this.score / 500 + 1;
      if ( this.oldLevel !== this.level ) {
        this.playLevelUpMusic();
      }
    }
  };

  collisionWithPlayer = () => {
    this.enemyArr.forEach((enemy, enemyIndex) => {
      if ( !enemy.isDed ) {
        if (
            this.player.x + 10 < enemy.x + enemy.width &&
            this.player.x - 10 + this.player.width > enemy.x &&
            this.player.y + 10 < enemy.y + enemy.height &&
            this.player.height + this.player.y - 10 > enemy.y
        ) {
          if ( this.player.lives === 0 ) {
            //this.gameIsActive = false;
          } else if ( this.player.lives > 0 ) {
            this.player.lives--;
            switch (this.player.lives) {
              case 1:
                live2.style.display = "none";
                live3.style.display = "none";
                break;
              case 2:
                live3.style.display = "none";
                break;
            }
          }
          // Remove the enemy that hitted the player
          // this.enemyArr.splice(enemyIndex, 1);
          enemy.isDed = true;
          enemy.img.src = "./images/enemy_player_ded.png";
          this.player.play_collission();
        }
      }
    });
  };

  collisionWithAttack = () => {
    this.attacksArr.forEach((attack, attackIndex) => {
      if ( attack.isActive ) {
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
            attack.img.src = "../images/enemy-ded.png";
            attack.width = enemy.width;
            attack.height = enemy.height;
            attack.isDed = true;
            this.playMonsterCollision();
          }
        });
      }
    });
  };

  removeDedEnemies = () => {
    this.enemyArr.forEach((enemy, enemyIndex) => {
      if ( enemy.isDed && enemy.totallyDed ) {
        this.enemyArr.splice(enemyIndex, 1);
      }
    });
  };

  // check if player/enemy on wall:

  // Game Loop
  gameLoop = () => {
    // Clear the old elements
    this.clearBackground();

    // Move elements
    this.player.gravity();
    this.spawnEnemy();

    // scrap all the attacks launched on the game
    this.attacksArr.forEach((attack) => {
      attack.moveAttack();
      // remove attacks from the array
      if ( attack.y < 0 - attack.height / 2 ) {
        this.attacksArr.shift();
      }
    });

    this.enemyArr.forEach((enemy) => {
      enemy.moveEnemy(this.player);
    });


    // draw elements
    this.drawBackground();
    this.player.drawPlayer();
    this.attacksArr.forEach((attack) => {
      attack.drawAttack();
    });
    this.enemyArr.forEach((enemy) => {
      enemy.drawEnemy();
    });

    this.drawData();
    this.increaseLevel();
    this.removeDedEnemies();
    this.collisionWithPlayer();
    this.collisionWithAttack();

    // loop game
    if ( this.gameIsActive ) {
      requestAnimationFrame(this.gameLoop);
      this.counter++;
    }
  };
}
