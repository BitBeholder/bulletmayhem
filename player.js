class Player {
    constructor(x, y, width, height, color, speed, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    // Controller for player movement
    move(direction) {
        if (direction === 'left')
            this.dx = -this.speed;
        else if (direction === 'right')
            this.dx = +this.speed;
        if (direction === 'up')
            this.dy = -this.speed;
        else if (direction === 'down')
            this.dy = this.speed;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collisioncheck() {
        if (this.x < 50) {
            this.x = 50;
        } 
        else if (this.x + this.width > (this.canvasWidth - 50)) {
            this.x = this.canvasWidth - (this.width + 50);
        }
        if (this.y < 135) {
            this.y = 135;
        } else if (this.y + this.height > this.canvasHeight) {
            this.y = this.canvasHeight - this.height;
        }
    }
    
    
    playerupdate() {
        this.collisioncheck();
        if (this.dx !== 0 && this.dy !== 0) {
            // Normalize speed for diagonal movement
            const diagonalSpeedFactor = 1 / Math.sqrt(2);
            this.dx *= diagonalSpeedFactor;
            this.dy *= diagonalSpeedFactor;
        }

        // Update position
        this.x += this.dx;
        this.y += this.dy;
    }
}
export default Player;