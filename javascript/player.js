class Player {
  constructor() {
    this.x = 60;
    this.y = 520;

    this.sizeMultiplier = 3;

    this.width = 16 * this.sizeMultiplier;
    this.height = 16 * this.sizeMultiplier;

    this.movSpeed = 9;
    this.jumpPow = 150;
    this.gravityPow = 3;

    this.img = new Image();
    this.image_right = "./images/player_mov_right.png";
    this.image_left = "./images/player_mov_left.png";
    this.image_jump_left = "./images/player_jump_left.png";
    this.image_jump_right = "./images/player_jump_right.png";
    this.image_walk_left = "./images/player_walk_left.png";
    this.image_walk_right = "./images/player_walk_right.png";
    this.img.src = this.image_right;

    this.falling = false;

    this.jump_music = new Audio();
    this.collision_music = new Audio();
    this.jump_music.src = "./music/BubbleSalto.wav";
    this.collision_music.src = "./music/BubblePlayerHit.wav";

    this.orientation = "right";

    this.lives = 3;
  }

  // Methods from the player
  play_collission = () => {
    /*
     * Music when enemy hits the player
     * */
    this.collision_music.volume = 0.1;
    this.collision_music.play().then(() => {
      return true;
    });
  };

  playSound = () => {
    /*
     * Music when player jumps
     * */
    this.jump_music.volume = 0.1;
    this.jump_music.play().then(() => {
      return true;
    });
  };

  drawPlayer = () => {
    /*
     * Draw the player when the game starts
     * */
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  drawJump = () => {
    /*
     * Draw the player while its jumping or falling, it checks the image that is being used
     * and depending on the used one, it will use one orientation or another.
     * */
    if (
      this.getImageUsed(this.img.src) === this.getImageUsed(this.image_right)
    ) {
      // Jumping at right
      this.img.src = this.image_jump_right;
      this.orientation = "right";
    } else if (
      this.getImageUsed(this.img.src) === this.getImageUsed(this.image_left)
    ) {
      // Jumping at left
      this.img.src = this.image_jump_left;
      this.orientation = "left";
    }
  };

  // Handling Movement
  moveLeft = () => {
    /*
     * This function will move the player in the X axis, considering the wall limits in
     * that direction (51 while you move to left).
     * It will also change the image for bring an animation as if the player is "walking"
     * */
    if (this.x > 51) {
      this.x = this.x - this.movSpeed;
      if (
        this.getImageUsed(this.img.src) !== this.getImageUsed(this.image_left)
      ) {
        this.img.src = this.image_left;
        this.orientation = "left";
      }
      if (this.orientation === "left") {
        if (this.x % 5 <= 5 / 2) {
          this.img.src = this.image_left;
        } else {
          this.img.src = this.image_walk_left;
        }
      }
    }
  };

  moveRight = () => {
    /*
     * This function will move the player in the X axis, considering the wall limits in
     * that direction (747 while you move to right).
     * It will also change the image for bring an animation as if the player is "walking"
     * */
    if (this.x < 747 - this.width) {
      this.x = this.x + this.movSpeed;
      if (
        this.getImageUsed(this.img.src) !== this.getImageUsed(this.image_right)
      ) {
        this.img.src = this.image_right;
        this.orientation = "right";
      }
      if (this.orientation === "right") {
        if (this.x % 5 <= 5 / 2) {
          this.img.src = this.image_right;
        } else {
          this.img.src = this.image_walk_right;
        }
      }
    }
  };

  jump = () => {
    /*
     * Play the jump sound, and calculate the position that will reach if we jump,
     * considering the ceiling at 27px on Y axis.
     * */
    this.playSound();
    if (this.y - this.jumpPow < 27) {
      this.y = 27;
    } else {
      this.y = this.y - this.jumpPow;
    }
    this.drawJump();
  };

  gravity = () => {
    /* floor data:
     * -------------------
     * |                 |
     * |    ----------   |  154
     * |                 |
     * |    ----------   |  278
     * |                 |
     * |    ----------   |  404
     * |                 |
     * -------------------
     *   176^     623^
     *
     * Above we can see a map with the coordinates where the user must stop falling.
     * We consider a big hole where if the player is positioned there, it must fall,
     * later we 3 different platforms where the player can walk and also the main floor.
     * */
    let onHole = this.x < 176 - this.width / 2 || this.x > 623 - this.width / 2;
    let onFloorZero = this.y < canvas.height - (this.height + 28);
    let onFloorOne = this.y < 406 && this.y > 400;
    let onFloorTwo = this.y < 280 && this.y > 275;
    let onFloorTree = this.y < 156 && this.y > 150;

    if (
      onFloorZero &&
      (!onFloorOne || onHole) &&
      (!onFloorTwo || onHole) &&
      (!onFloorTree || onHole)
    ) {
      this.falling = true;
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
      this.falling = false;
    }
  };

  getImageUsed = (imageToCheck) => {
    /*
     * Function for extract the string sent.
     * */
    let splited_src = imageToCheck.split("/");
    return splited_src[splited_src.length - 1];
  };
}
