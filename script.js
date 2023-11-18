import Enemy from './enemy.js';
import Player from './player.js';

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

 let enemies = [];
 let colors = [
    "#FF5733", // Vivid Tangelo
    "#7D3C98", // Rich Purple
    "#F4D03F", // Indocile Yellow
    "#1ABC9C", // Strong Cyan
    "#3498DB", // Royal Blue
    "#F1948A", // Charming Pink
    "#27AE60", // Fresh Green
    "#9B59B6", // Amiable Violet
    "#E74C3C", // Lively Red
    "#34495E"  // Dark Slate Grey
];
 let enemyamount = 7;
 let player = new Player(canvas.width / 2 - 25, 700, 50, 50, '#006475', 2.5, 800)
 

 for (let i = 0; i < enemyamount; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * 70;
    let width = 50;
    let height = 50;
    let color = colors[Math.floor(Math.random() * colors.length)];
    let randomspeed = Math.random()*3+1;
    let enemy = new Enemy(x, y, width, height, color, randomspeed, canvas.width)
    enemies.push(enemy);
 }

  

  // Update the canvas and player position
  function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player.playerupdate();
      player.draw(ctx);
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw(ctx);
        enemies[i].updateAndDrawBullets(ctx);
      }

      requestAnimationFrame(update);
  }

  function keyDown(e) {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
          player.move('right');
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          player.move('left');
      }
  }

  function keyUp(e) {
      if (e.key == 'Right' ||
          e.key == 'ArrowRight' ||
          e.key == 'Left' ||
          e.key == 'ArrowLeft') 
          {
          player.dx = 0;
      }
  }

  // Set up event listeners for key presses
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  update(); // Start the loop
});