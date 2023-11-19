import Enemy from './enemy.js';
import Player from './player.js';


document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    

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
 let enemyamount = 20;
 let player = new Player(canvas.width / 2 - 25, canvas.height / 1.2, 50, 50, '#006475', 3, canvas.width, canvas.height)

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


function checkCollision(player, bullet) {
    return player.x < bullet.x + bullet.width &&
           player.x + player.width > bullet.x &&
           player.y < bullet.y + bullet.height &&
           player.y + player.height > bullet.y;
}

function resetGame() {
    // Reset player position
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height / 1.2; // Or any starting position you prefer

    enemies.forEach(enemy => {
        enemy.bullets = [];
    });
    // Restart the game loop
    update();
}

  // Update the canvas and player position
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.playerupdate();
    player.draw(ctx);
    let collisionDetected = false;
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw(ctx);
        enemies[i].updateAndDrawBullets(ctx);
        enemies[i].bullets.forEach(bullet => {
            if (checkCollision(player, bullet)) {
                collisionDetected = true;
            }
        });
    }
    if (collisionDetected) {
        resetGame();
        return;
    }
    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'd') {
        player.move('right');
    } else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'a') {
        player.move('left');
    } if (e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'w') {
        player.move('up');
    } else if (e.key === 'ArrowDown' || e.key === 'Down' || e.key === 's') {
        player.move('down');
    }
}

function keyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft' ||
        e.key === 'd' || e.key === 'a') {
        player.dx = 0;
    }
    if (e.key === 'Up' || e.key === 'ArrowUp' || e.key === 'Down' || e.key === 'ArrowDown' ||
        e.key === 'w' || e.key === 's') {
        player.dy = 0;
    }
}

// Set up event listeners for key presses
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update(); // Start the loop

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-render or adjust game elements as needed
    // For example, you might need to update positions or redraw objects
});
});