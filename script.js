document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Set the movable square properties
  const player = {
      width: 50,
      height: 50,
      x: canvas.width / 2 - 25, // Center the square
      y: canvas.height - 50, // Place it at the bottom of the canvas
      speed: 5,
      dx: 0 // This will change based on input
  };

  // Draw the movable square
  function drawPlayer() {
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  // Update the canvas and player position
  function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer();

      // Move the player square
      player.x += player.dx;

      // Check for boundary collision
      if (player.x < 0) {
          player.x = 0;
      }
      if (player.x + player.width > canvas.width) {
          player.x = canvas.width - player.width;
      }

      requestAnimationFrame(update);
  }

  // Controller for player movement
  function moveRight() {
      player.dx = player.speed;
  }

  function moveLeft() {
      player.dx = -player.speed;
  }

  function keyDown(e) {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
          moveRight();
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
          moveLeft();
      }
  }

  function keyUp(e) {
      if (
          e.key == 'Right' ||
          e.key == 'ArrowRight' ||
          e.key == 'Left' ||
          e.key == 'ArrowLeft'
      ) {
          player.dx = 0;
      }
  }

  // Set up event listeners for key presses
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  update(); // Start the loop
});
