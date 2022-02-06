class Player {
    constructor() {
        this.x = 60
        this.y = 520

        this.sizeMultiplier = 3;

        this.width = 16 * this.sizeMultiplier;
        this.height = 16 * this.sizeMultiplier;

        this.movSpeed = 5;
        this.jumpPow = 105;
        this.gravityPow = 2;

        this.img = new Image();
        this.image_right = "./images/player_mov_right.png"
        this.image_left = "./images/player_mov_left.png"
        this.image_jump_left = "./images/player_jump_left.png"
        this.image_jump_right = "./images/player_jump_right.png"
        this.image_walk_left = "./images/player_walk_left.png"
        this.image_walk_right = "./images/player_walk_right.png"
        this.img.src =  this.image_right

        this.orientation = "right";
    }

    // Methods from the player

    drawPlayer = () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    // Handling Movement
    moveLeft = () =>{
        this.x = this.x - this.movSpeed;
        if (this.img.src !== this.image_left){
            if (this.x % 3 === 0){
                this.img.src = this.image_left
                this.orientation = "left"
            }else{
                this.img.src = this.image_walk_left
                this.orientation = "left"
            }

        }

    }
    moveRight = () =>{
        this.x = this.x + this.movSpeed;
        if (this.img.src !== this.image_right){
            if (this.x % 3 === 0){
                this.img.src = this.image_right
                this.orientation = "right"
            }else{
                this.img.src = this.image_walk_right
                this.orientation = "right"
            }
        }

    }
    jump = () => {
        this.y = this.y - this.jumpPow;
        if (this.img.src === this.image_right){
            this.img.src = this.image_jump_right
            this.orientation = "right"
        }else if (this.img.src === this.image_left){
            this.img.src = this.image_jump_left
            this.orientation = "left"
        }
    }
    gravity = () => {

        if (this.y < (canvas.height - (this.height + 28))){
            this.y = this.y + this.gravityPow;
            if (this.getImageUsed(this.img.src) === this.getImageUsed(this.image_right)){
                this.img.src = this.image_jump_right
                this.orientation = "right"
            }else if (this.getImageUsed(this.img.src) === this.getImageUsed(this.image_left)){
                this.img.src = this.image_jump_left
                this.orientation = "left"
            }

        }else {
            if (this.getImageUsed(this.img.src) === this.getImageUsed(this.image_jump_right)){
                this.img.src = this.image_right
                this.orientation = "right"
            }else if (this.getImageUsed(this.img.src) === this.getImageUsed(this.image_jump_left)){
                this.img.src = this.image_left
                this.orientation = "left"
            }
        }
    }

    getImageUsed = (imageToCheck) => {
        let splited_src = imageToCheck.split("/")
        return splited_src[splited_src.length - 1]
    }
}