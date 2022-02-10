class Enemy {
  constructor() {
    this.size_multiplier = 1.5;
    this.width = 32 * this.size_multiplier;
    this.height = 30 * this.size_multiplier;

    this.x = Math.floor(Math.random() * (676 - this.width)) + 61;
    this.y = Math.floor(Math.random() * (152 - this.height)) + 33;

    this.enemySpeed = 1;
    this.isDed = false;
    this.totallyDed = false;
    this.timeDed = 0;

    this.img = new Image();
    this.image_close_right = "./images/enemy_close_right.png";
    this.image_close_left = "./images/enemy_close_left.png";
    this.image_open_right = "./images/enemy_open_right.png";
    this.image_open_left = "./images/enemy_open_left.png";
    this.img.src = this.image_open_right;
  }

  drawEnemy = () => {
    /*
     * Draw the player when game request to spawn it, and change the image in case its dead.
     * */
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if ( this.isDed ) {
      this.drawDedEnemy();
    }
  };

  moveEnemy = (player) => {
    /*
    * Enemy will compare the position of the player and its current position for decide in which
    * direction it must move, enemy will only move if it's not dead.
    * */

    if ( !this.isDed ) {
      // Enemy move in the X axis
      if ( this.x < player.x ) {
        this.imageMovingEnemy("right")
        this.x = this.x + this.enemySpeed;
      } else if ( this.x > player.x ) {
        this.imageMovingEnemy("left")
        this.x = this.x - this.enemySpeed;
      }
      // Enemy move in the Y axis
      if ( this.y < player.y ) {
        this.y = this.y + this.enemySpeed;
      } else if ( this.y > player.y ) {
        this.y = this.y - this.enemySpeed;
      }
    }
  };

  imageMovingEnemy = (direction) => {
    /*
    * Depending on the orientation and the module calculated, the system will choose one
    * image or another, bringing to the enemy a smooth animation effect.
    * */
    if ( direction === "left" ) {
      if ( this.x % 10 >= 5 ) {
        this.img.src = this.image_close_left;
      } else {
        this.img.src = this.image_open_left;
      }
    } else if ( direction === "right" ) {
      if ( this.x % 10 < 5 ) {
        this.img.src = this.image_close_right;
      } else {
        this.img.src = this.image_open_right;
      }
    }
  }

  drawDedEnemy = () => {
    /*
    * Check the time that the enemy is already dead, if it surpasses 20,
    * change the state of the enemy for remove the pic from the screen.
    * */
    this.timeDed++;
    if ( this.timeDed > 20 ) {
      this.totallyDed = true;
    }
  };
}
