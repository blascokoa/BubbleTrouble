class Attack {
  constructor(player) {
    this.player = player;
    this.x = this.player.x;
    this.y = this.player.y + player.height / 2;
    this.orientation = this.player.orientation;

    this.width = 25;
    this.height = 25;

    this.initial_x = this.x;

    this.attack_length = 100;
    this.isActive = true;
    this.isDed = false;

    this.img = new Image();
    this.img.src = "./images/attack_ball.png";
    this.attack_left = "./images/attack_left.png";
    this.attack_right = "./images/attack_right.png";

    this.audio_attack = new Audio();
    this.audio_attack.src = "./music/BubbleShoot.wav";
    this.playSound()

    if ( this.orientation === "left" ) {
      this.player.img.src = this.attack_left;
    } else {
      this.player.img.src = this.attack_right;
    }
  }

  playSound = () => {
    this.audio_attack.volume = 0.1
    this.audio_attack.play().then(() => {
      return true;
    });
  }

  drawAttack = () => {
    if ( this.orientation === "left" ) {
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
    let max_length;
    if ( this.orientation === "left" ) {
      max_length = this.initial_x - this.attack_length;
      if ( max_length < 51 ) {
        max_length = 51;
      }
      if ( this.x > max_length ) this.x = this.x - 1;
      else {
        this.isActive = false;
        this.y = this.y - 1;
      }
    } else {
      max_length = this.initial_x + this.attack_length;
      if ( max_length > 700 ) {
        max_length = 700;
      }
      if ( this.x < max_length ) this.x = this.x + 1;
      else {
        this.isActive = false;
        this.y = this.y - 1;
      }
    }
  };
}
