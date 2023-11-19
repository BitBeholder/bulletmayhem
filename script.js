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

 const progressBar = {
    width: innerWidth,
    height: 20,
    color: 'lightgreen',
    duration: 30
 }

 const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    w: {
      pressed: false
    },
    s: {
      pressed: false
    }
}
 let lastKey

 let enemyamount = 0;
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

// Timer here:
let elapsedTime = 0;
let timerInterval;

function startGame() {
    elapsedTime = 0;
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    let progress = (elapsedTime % progressBar.duration) / progressBar.duration;

    ctx.fillStyle = progressBar.color;
    ctx.fillRect(0, 910, progress * progressBar.width, progressBar.height);
}

function checkCollision(player, bullet) {
    return player.x < bullet.x + bullet.width &&
           player.x + player.width > bullet.x &&
           player.y < bullet.y + bullet.height &&
           player.y + player.height > bullet.y;
}

function resetGame() {
    clearInterval(timerInterval);
    startGame();
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
    updateTimerDisplay();
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

    player.dx = 0
    player.dy = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.move('left');
    } else if (keys.d.pressed && lastKey === 'd') {
        player.move('right');
    }
    if (keys.w.pressed && lastKey === 'w') {
        player.move('up');
    } else if (keys.s.pressed && lastKey === 's') {
        player.move('down');
    }
    
    if (collisionDetected) {
        resetGame();
        return;
    }
    requestAnimationFrame(update);
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
    case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
    case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
    case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        }
})

startGame();
update(); // Start the loop

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-render or adjust game elements as needed
    // For example, you might need to update positions or redraw objects
});
});