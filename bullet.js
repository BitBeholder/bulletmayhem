class Bullet {
  constructor (x, y, width, height, color, speed,) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = Math.random()*2+2;;
  }

  // Update bullet position
  update() {
      this.y += this.speed;
  }

  // Draw the bullet on the canvas

  draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
  }
}
export default Bullet;