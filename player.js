class Player {
    constructor(x, y, width, height, color, speed, canvasWidth) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.dx = 0;
        this.canvasWidth = canvasWidth;
    }

    // Controller for player movement
    move(direction) {
       if (direction === 'left')
        this.dx = -this.speed;
       else if (direction === 'right')
        this.dx = +this.speed;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collisioncheck() {
        if  (this.x < 0) {
        this.x = 0;
        }
        else if (this.x + this.width > this.canvasWidth) {
        this.x = this.canvasWidth - this.width;
        }
    }

    playerupdate() {
        this.collisioncheck();
        this.x += this.dx;
    }
}
export default Player;