import Bullet from './bullet.js';

class Enemy {
    constructor (x, y, width, height, color, speed, canvasWidth) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.dx = speed;
        this.canvasWidth = canvasWidth;
        this.bullets = []
        this.shootInterval = null;
        this.startShooting();
    }

    startShooting() {
        this.shootInterval = setInterval(() => {
            this.shoot();
        },  this.getRandomShootInterval());
    }

    getRandomShootInterval() {
        // Returns a random number between 1000 and 2000 (1-2 seconds)
        return Math.random() * (2000 - 700) + 700;
    }

    // Update enemy position
    update() {
        // If the enemy hits the right wall, reverse its direction
        if (this.x + this.width > this.canvasWidth) {
            this.dx = -this.speed;
        }
        // If the enemy hits the left wall, reverse its direction
        else if (this.x < 0) {
            this.dx = this.speed;
        }

        // Update the enemy's x position
        this.x += this.dx;
    }

    // Draw the enemy on the canvas

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    shoot() {
        const bullet = new Bullet(
            this.x + this.width / 2 - 2.5,
            this.y + this.height,
            10,
            10,
            'green',
            1
        );

        this.bullets.push(bullet);
    }

    updateAndDrawBullets(context) {
        // Update each bullet's position
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
    
            // Remove the bullet if it goes offscreen or hits the bottom of the map
            if (
                this.bullets[i].x < 0 ||
                this.bullets[i].x > this.canvasWidth ||
                this.bullets[i].y < 0 ||
                this.bullets[i].y > this.canvasHeight
            ) {
                this.bullets.splice(i, 1);
                // Decrement i so the next bullet isn't skipped
                i--;
            }
        }
    
        // Draw each bullet
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(context);
        }
    }

} 
export default Enemy;