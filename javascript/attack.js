class Attack {
    constructor(player){
        this.player = player
        this.x = this.player.x
        this.y = this.player.y + (player.height / 2)
        this.orientation = this.player.orientation;

        this.width = 25;
        this.height = 25;

        this.initial_x = this.x
        this.initial_y = this.y

        this.attack_lenght = 100
        this.active = true

        this.img = new Image();
        this.img.src = "./images/attack_ball.png"
        this.attack_left = "./images/attack_left.png"
        this.attack_right = "./images/attack_right.png"

        if (this.orientation === "left"){
            this.player.img.src = this.attack_left
        }else{
            this.player.img.src = this.attack_right
        }

    }

    drawAttack = () => {
        if (this.orientation === "left"){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }else{
            ctx.drawImage(this.img, this.x+this.player.width/2, this.y, this.width, this.height)
        }

    }

    moveAttack = () => {
        if (this.orientation === "left"){
            if(this.x > (this.initial_x - this.attack_lenght))
                this.x = this.x - 1
            else{
                this.active = false
                this.y = this.y - 1
            }
        }else {
            if(this.x < (this.initial_x + this.attack_lenght))
                this.x = this.x + 1
            else{
                this.active = false
                this.y = this.y - 1
            }
        }


    }

}