class Attack {
  constructor(player) {
    this.player = player;
    this.x = this.player.x;
    this.y = this.player.y + player.height / 3;
    this.orientation = this.player.orientation;
    this.width = 25;
    this.height = 25;
    this.initial_x = this.x;
    this.attack_length = 100;
    this.isActive = true;
    this.isDed = false;
    this.lastAttack = 15;

    this.img = new Image();
    this.img.src = "./images/attack_ball.png";
    this.attack_left = "./images/attack_left.png";
    this.attack_right = "./images/attack_right.png";

    this.audio_attack = new Audio();
    this.audio_attack.src = "./music/BubbleShoot.wav";
    this.playSound();

    if (this.orientation === "left") {
      this.player.img.src = this.attack_left;
    } else {
      this.player.img.src = this.attack_right;
    }
  }

  playSound = () => {
    /*
     * Sound to play when a new attack its generated.
     * */
    this.audio_attack.volume = 0.1;
    this.audio_attack.play().then(() => {
      return true;
    });
  };

  drawAttack = () => {
    /*
     * Will Draw the attack and move depending on the player's orientation
     * this.orientation is fetched from Player class in constructor.
     * After draw, it will move as stated on the function moveAttack.
     * */
    if (this.orientation === "left") {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(
        this.img,
        this.x + this.player.width / 2,
        this.y,
        this.width,
        this.height
      );
    }
  };

  moveAttack = () => {
    /*
     * Attack will move in the direction stated inside the property this.orientation
     * At beginning we declare a variable called max_length that will be used as
     * the coordinate x that the bubble must reach, if that distance will collide with the walls
     * we set up it with a max number that will make it fit with the wall's limit.
     *
     * this.isActive is what the code use for check if the attack can hit an enemy or not, its active while
     * the bubble is moving at X axis and inactive when moving at Y axis.
     * */
    if (this.lastAttack > 0) {
      this.lastAttack--;
    }

    let max_length;
    if (this.orientation === "left") {
      max_length = this.initial_x - this.attack_length;
      // Ball will collide with the wall
      if (max_length < 51) {
        max_length = 51;
      }
      if (this.x > max_length) this.x = this.x - 1;
      else {
        this.isActive = false;
        this.y = this.y - 1;
      }
    } else {
      max_length = this.initial_x + this.attack_length;
      // Ball will collide with the wall
      if (max_length > 700) {
        max_length = 700;
      }
      if (this.x < max_length) this.x = this.x + 1;
      else {
        this.isActive = false;
        this.y = this.y - 1;
      }
    }
  };
}
