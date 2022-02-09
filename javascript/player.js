class Player {
  constructor() {
    this.x = 60;
    this.y = 520;

    this.sizeMultiplier = 3;

    this.width = 16 * this.sizeMultiplier;
    this.height = 16 * this.sizeMultiplier;

    this.movSpeed = 5;
    this.jumpPow = 150;
    this.gravityPow = 2;

    this.img = new Image();
    this.image_right = "./images/player_mov_right.png";
    this.image_left = "./images/player_mov_left.png";
    this.image_jump_left = "./images/player_jump_left.png";
    this.image_jump_right = "./images/player_jump_right.png";
    this.image_walk_left = "./images/player_walk_left.png";
    this.image_walk_right = "./images/player_walk_right.png";
    this.img.src = this.image_right;

    this.failling = false;

    this.jump_music = new Audio();
    this.collision_music = new Audio();
    this.jump_music.src = "./music/BubbleSalto.wav";
    this.collision_music.src = "./music/BubblePlayerHit.wav";

    this.orientation = "right";

    this.lives = 3;
  }

  // Methods from the player
  play_collission = () => {
    this.collision_music.volume = 0.1;
    this.collision_music.play().then(() => {
      return true;
    });
  };

  playSound = () => {
    this.jump_music.volume = 0.1;
    this.jump_music.play().then(() => {
      return true;
    });
  };

  drawPlayer = () => {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  // Handling Movement
  moveLeft = () => {
    if (this.x > 51) {
      this.x = this.x - this.movSpeed;
      if (
        this.getImageUsed(this.img.src) !== this.getImageUsed(this.image_left)
      ) {
        this.img.src = this.image_left;
        this.orientation = "left";
      }
      if (this.orientation === "left") {
        if (this.x % 3 === 0) {
          this.img.src = this.image_left;
        } else {
          this.img.src = this.image_walk_left;
        }
      }
    }
  };
  moveRight = () => {
    if (this.x < 747 - this.width) {
      this.x = this.x + this.movSpeed;
      if (
        this.getImageUsed(this.img.src) !== this.getImageUsed(this.image_right)
      ) {
        this.img.src = this.image_right;
        this.orientation = "right";
      }
      if (this.orientation === "right") {
        if (this.x % 3 === 0) {
          this.img.src = this.image_right;
        } else {
          this.img.src = this.image_walk_right;
        }
      }
    }
  };
  jump = () => {
    this.playSound();
    if (!this.failling) {
      if (this.y - this.jumpPow < 27) {
        this.y = 27;
      } else {
        this.y = this.y - this.jumpPow;
      }
      if (
        this.getImageUsed(this.img.src) === this.getImageUsed(this.image_right)
      ) {
        this.img.src = this.image_jump_right;
        this.orientation = "right";
      } else if (
        this.getImageUsed(this.img.src) === this.getImageUsed(this.image_left)
      ) {
        this.img.src = this.image_jump_left;
        this.orientation = "left";
      }
    }
  };
  gravity = () => {
    /* floor data:
     * -------------------
     * |                 |
     * |    ----------   |  201
     * |                 |
     * |    ----------   |  325
     * |                 |
     * |    ----------   |  449 / 404
     * |                 |
     * -------------------
     *   176^     623^
     * */
    let onHole = this.x < 176 - this.width / 2 || this.x > 623 - this.width / 2;
    let onFloorZero = this.y < canvas.height - (this.height + 28); // && this.y > 410) // works
    let onFloorOne = this.y < 406 && this.y > 400;
    let onFloorTwo = this.y < 280 && this.y > 275;
    let onFloorTree = this.y < 156 && this.y > 150;

    if (
      onFloorZero &&
      (!onFloorOne || onHole) &&
      (!onFloorTwo || onHole) &&
      (!onFloorTree || onHole)
    ) {
      this.failling = true;
      this.y = this.y + this.gravityPow;
      if (
        this.getImageUsed(this.img.src) ===
          this.getImageUsed(this.image_right) ||
        this.getImageUsed(this.img.src) ===
          this.getImageUsed(this.image_walk_right)
      ) {
        this.img.src = this.image_jump_right;
      } else if (
        this.getImageUsed(this.img.src) ===
          this.getImageUsed(this.image_left) ||
        this.getImageUsed(this.img.src) ===
          this.getImageUsed(this.image_walk_left)
      ) {
        this.img.src = this.image_jump_left;
      }
    } else {
      this.failling = false;
    }
  };

  getImageUsed = (imageToCheck) => {
    let splited_src = imageToCheck.split("/");
    return splited_src[splited_src.length - 1];
  };
}
