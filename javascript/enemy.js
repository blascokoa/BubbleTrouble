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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.isDed) {
      this.drawDedEnemy();
    }
  };

  moveEnemy = (player) => {
    if (!this.isDed) {
      if (this.x < player.x) {
        if (this.x % 10 < 5) {
          this.img.src = this.image_close_right;
        } else {
          this.img.src = this.image_open_right;
        }
        this.x = this.x + this.enemySpeed;
      } else if (this.x > player.x) {
        if (this.x % 10 >= 5) {
          this.img.src = this.image_close_left;
        } else {
          this.img.src = this.image_open_left;
        }
        this.x = this.x - this.enemySpeed;
      }

      if (this.y < player.y) {
        this.y = this.y + this.enemySpeed;
      } else if (this.y > player.y) {
        this.y = this.y - this.enemySpeed;
      }
    }
  };
  drawDedEnemy = () => {
    this.timeDed++;
    if (this.timeDed > 20) {
      this.totallyDed = true;
    }
  };
}
