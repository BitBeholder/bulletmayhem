import Enemy from './enemy.js';
import Player from './player.js';
import Score from './score.js';

const score = new Score();

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playMusicButton = document.getElementById('playMusicButton');
    const volumeControl = document.getElementById('volumeControl');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function toggleMusic() {
        // Check if the music is currently playing
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log("Background music started.");
            }).catch(error => {
                console.error("Error playing background music:", error);
            });
        } else {
            backgroundMusic.pause();
            console.log("Background music paused.");
        }
    }
    
    // Attach the toggleMusic function to the play music button
    playMusicButton.addEventListener('click', toggleMusic);

    volumeControl.addEventListener('input', function() {
        backgroundMusic.volume = this.value;
    });
    

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
let progress = 0;

let player = new Player(canvas.width / 2 - 25, canvas.height / 1.2, 35, 35, '#006475', 3, canvas.width, canvas.height)


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

const progressBar = {
    width: 500,
    height: 15,
    color: 'red',
    duration: 10
 }

let scoreIncremented = false;

function updateTimerDisplay() {
    progress = (elapsedTime % progressBar.duration) / progressBar.duration;
    const barWidth = 500; // Adjust the width of the progress bar as needed
    const barHeight = 15; // Set the height relative to the window height
    const startX = window.innerWidth * 0.02; // Set the horizontal position as a percentage of the window width
    const startY = window.innerHeight - 60; // Position it at the bottom of the canvas

    ctx.fillStyle = 'rgba(255, 0, 0, 0.25)';
    ctx.fillRect(startX, startY, progressBar.width - 50, barHeight);

    ctx.fillStyle = progressBar.color;
    ctx.fillRect(startX, startY, progress * barWidth, barHeight);

    if (progress >= 0.9 && !scoreIncremented) {
        // Progress reached 90% or more, increment the current score
        score.updateCurrentScore();
        scoreIncremented = true;
    }

    if (progress < 0.9) {
        // Reset the scoreIncremented flag when progress goes below 90%
        scoreIncremented = false;
    }
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

    enemies = [];
    // Restart the game loop
    enemiesAdded = false;
    
    score.updateBestScore();
    score.currentScore = 0;

    update();
}

let playerScore = 0;

let enemiesAdded = false; // Add this variable outside the function

function addMoreEnemies() {
    if (progress === 0 && !enemiesAdded) {
        // Calculate how many additional enemies to create
        const additionalEnemies = 3;

        for (let i = 0; i < additionalEnemies; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * 70;
            let width = 50;
            let height = 50;
            let color = colors[Math.floor(Math.random() * colors.length)];
            let randomspeed = Math.random() * 3 + 1;
            let enemy = new Enemy(x, y, width, height, color, randomspeed, canvas.width);
            enemies.push(enemy);
        }

        enemiesAdded = true; // Set the flag to true once enemies are added

    } else if (progress > 0.8) {
        enemiesAdded = false; // Reset the flag when progress goes below 0.5
    }
}

  // Update the canvas and player position
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateTimerDisplay();
    addMoreEnemies();
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

    if (keys.a.pressed && (lastKey === 'a' || lastKey === 'w' || lastKey === 's')) {
        player.move('left');
    } else if (keys.d.pressed && (lastKey === 'd' || lastKey === 'w' || lastKey === 's')) {
        player.move('right');
    }

    // Handle vertical movement
    if (keys.w.pressed && (lastKey === 'w' || lastKey === 'a' || lastKey === 'd')) {
        player.move('up');
    } else if (keys.s.pressed && (lastKey === 's' || lastKey === 'a' || lastKey === 'd')) {
        player.move('down');
    }
    
    if (collisionDetected) {
        resetGame();
        return;
    }
    score.displayScores(ctx, playerScore);

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





// MOBILE PHONE:


canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);
canvas.addEventListener('touchend', handleTouchEnd, false);

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

function handleTouchStart(event) {
    event.preventDefault();
    let touchPos = getTouchPos(canvas, event);
    // You might want to initiate player movement here
}

function handleTouchMove(event) {
    event.preventDefault();
    let touchPos = getTouchPos(canvas, event);
    // Move your player to touchPos.x and touchPos.y
    player.x = touchPos.x;
    player.y = touchPos.y;
}

function handleTouchEnd(event) {
    event.preventDefault();
    // You might want to stop player movement here
}



});

