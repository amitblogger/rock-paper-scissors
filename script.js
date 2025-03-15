// Game Initialization
let userScore = 0;
let compScore = 0;
let totalUserScore = 0;
let totalCompScore = 0;
let playerName = 'Player';
const choices = ['rock', 'paper', 'scissors'];

// DOM Elements
const elements = {
  playerNameInput: document.getElementById('playerName'),
  playerNameDisplay: document.getElementById('player-name'),
  saveNameBtn: document.getElementById('saveName'),
  userScoreSpan: document.getElementById('user-score'),
  compScoreSpan: document.getElementById('comp-score'),
  totalUserScoreSpan: document.getElementById('total-user-score'),
  totalCompScoreSpan: document.getElementById('total-comp-score'),
  resultDiv: document.getElementById('result'),
  historyList: document.getElementById('history-list'),
  choiceBtns: document.querySelectorAll('.choice-btn'),
  resetBtn: document.getElementById('reset'),
  winSound: document.getElementById('win-sound'),
  loseSound: document.getElementById('lose-sound'),
  drawSound: document.getElementById('draw-sound')
};

// Player Name Handler
elements.saveNameBtn.addEventListener('click', () => {
  playerName = elements.playerNameInput.value.trim() || 'Player';
  elements.playerNameDisplay.textContent = playerName;
  elements.playerNameInput.value = '';
  localStorage.setItem('rpsPlayerName', playerName);
});

// Load Saved Name
window.addEventListener('load', () => {
  const savedName = localStorage.getItem('rpsPlayerName');
  if (savedName) {
    playerName = savedName;
    elements.playerNameDisplay.textContent = playerName;
  }
});

// Game Logic
const gameEngine = {
  determineWinner: (user, comp) => {
    if (user === comp) return 'draw';
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    return winConditions[user] === comp ? 'user' : 'comp';
  },

  updateScore: (winner) => {
    if (winner === 'user') {
      userScore++;
      totalUserScore++;
    } else if (winner === 'comp') {
      compScore++;
      totalCompScore++;
    }

    elements.userScoreSpan.textContent = userScore;
    elements.compScoreSpan.textContent = compScore;
    elements.totalUserScoreSpan.textContent = totalUserScore;
    elements.totalCompScoreSpan.textContent = totalCompScore;
  },

  showResult: (userChoice, compChoice, result) => {
    const resultMessages = {
      user: `${playerName} Wins! 🎉 ${userChoice} beats ${compChoice}`,
      comp: `Computer Wins! 😭 ${compChoice} beats ${userChoice}`,
      draw: `It's a Draw! 🤝 Both chose ${userChoice}`
    };

    elements.resultDiv.textContent = resultMessages[result];
    elements.resultDiv.style.color = result === 'user' ? '#2ecc71' :
      result === 'comp' ? '#e74c3c' : '#f1c40f';
  },

  addToHistory: (userChoice, compChoice, result) => {
    const historyItem = document.createElement('li');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <span style="color: ${result === 'user' ? '#2ecc71' : result === 'comp' ? '#e74c3c' : '#f1c40f'}">
        ${result === 'user' ? '🏆' : result === 'comp' ? '💀' : '🤝'} 
      </span>
      ${playerName}: ${userChoice} vs Computer: ${compChoice}
    `;
    elements.historyList.prepend(historyItem);

    // Limit history to 10 items
    if (elements.historyList.children.length > 10) {
      elements.historyList.removeChild(elements.historyList.lastChild);
    }
  },

  playSound: (result) => {
    if (result === 'user') elements.winSound.play();
    else if (result === 'comp') elements.loseSound.play();
    else elements.drawSound.play();
  },

  celebrateWin: () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
      shapes: ['circle', 'square']
    });
  }
};

// Event Listeners
elements.choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const userChoice = btn.dataset.choice;
    const compChoice = choices[Math.floor(Math.random() * 3)];
    const result = gameEngine.determineWinner(userChoice, compChoice);

    // Visual Feedback
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);

    // Update Game State
    gameEngine.updateScore(result);
    gameEngine.showResult(userChoice, compChoice, result);
    gameEngine.addToHistory(userChoice, compChoice, result);
    gameEngine.playSound(result);

    // Special Effects
    if (result === 'user') gameEngine.celebrateWin();
  });
});

// Reset Game
elements.resetBtn.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  totalUserScore = 0;
  totalCompScore = 0;
  elements.userScoreSpan.textContent = '0';
  elements.compScoreSpan.textContent = '0';
  elements.totalUserScoreSpan.textContent = '0';
  elements.totalCompScoreSpan.textContent = '0';
  elements.resultDiv.textContent = '';
  elements.historyList.innerHTML = '';
  localStorage.removeItem('rpsPlayerName');
  elements.playerNameDisplay.textContent = 'Player';
});
