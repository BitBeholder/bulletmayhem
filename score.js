class Score {
  constructor() {
      this.currentScore = 0;
      this.bestScore = 0;
  }

  updateCurrentScore() {
      // Increment the current score when a progression round is completed
      this.currentScore += 1;
  }

  updateBestScore() {
      // Update the best score if the current score is higher
      if (this.currentScore > this.bestScore) {
          this.bestScore = this.currentScore;
      }
  }

  displayScores(ctx) {
      // Draw the current and best scores on the canvas
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(`Current Level: ${this.currentScore}`, 20, 40);
      ctx.fillText(`Best Score: ${this.bestScore}`, 20, 70);
  }

  drawsScoreBoard() {

  }
}

export default Score;
