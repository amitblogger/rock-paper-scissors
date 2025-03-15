const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');
const compChoiceEl = document.getElementById('comp-choice');
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const totalGamesEl = document.getElementById('total-games');
const userWinsEl = document.getElementById('user-wins');
const winRateEl = document.getElementById('win-rate');
const streakEl = document.getElementById('streak');
const resetBtn = document.getElementById('reset');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');
const nameInput = document.getElementById('name-input');
const gameContent = document.getElementById('game-content');
const playerNameInput = document.getElementById('player-name');
const submitNameBtn = document.getElementById('submit-name');
const playerLabel = document.getElementById('player-label');

let userScore = 0;
let compScore = 0;
let totalGames = 0;
let userWins = 0;
let streak = 0;
let playerName = 'You';

submitNameBtn.addEventListener('click', () => {
    const inputName = playerNameInput.value.trim();
    if (inputName) {
        playerName = inputName;
        playerLabel.textContent = playerName;
        nameInput.style.display = 'none';
        gameContent.style.display = 'block';
        resultText.textContent = `Ready, ${playerName}? Make your move!`;
    } else {
        alert('Please enter a name to start!');
    }
});

playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitNameBtn.click();
    }
});

const computerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
};

const getEmoji = (choice) => {
    switch (choice) {
        case 'rock': return '✊';
        case 'paper': return '✋';
        case 'scissors': return '✌️';
        default: return '';
    }
};

const updateStats = () => {
    totalGames++;
    totalGamesEl.textContent = totalGames;
    userWinsEl.textContent = userWins;
    const winRate = totalGames === 0 ? 0 : ((userWins / totalGames) * 100).toFixed(1);
    winRateEl.textContent = `${winRate}%`;
    streakEl.textContent = streak;
};

const playGame = (userChoice) => {
    const compChoice = computerChoice();
    compChoiceEl.textContent = `Computer chose: ${getEmoji(compChoice)}`;

    if (userChoice === compChoice) {
        resultText.textContent = `It's a tie! Both chose ${userChoice}`;
        resultText.style.background = '#48dbfb';
        tieSound.play();
        streak = 0;
    } else if (
        (userChoice === 'rock' && compChoice === 'scissors') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissors' && compChoice === 'paper')
    ) {
        resultText.textContent = `${playerName} wins! ${userChoice} beats ${compChoice}`;
        resultText.style.background = '#10ac84';
        userScore++;
        userWins++;
        streak++;
        userScoreEl.textContent = userScore;
        winSound.play();
    } else {
        resultText.textContent = `${playerName} loses! ${compChoice} beats ${userChoice}`;
        resultText.style.background = '#ee5253';
        compScore++;
        compScoreEl.textContent = compScore;
        loseSound.play();
        streak = 0;
    }
    
    updateStats();
    animateChoice(userChoice);
};

const animateChoice = (choiceId) => {
    const choice = document.getElementById(choiceId);
    choice.classList.add('pulse');
    setTimeout(() => choice.classList.remove('pulse'), 300);
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        playGame(userChoice);
    });
});

resetBtn.addEventListener('click', () => {
    userScore = 0;
    compScore = 0;
    totalGames = 0;
    userWins = 0;
    streak = 0;
    userScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    totalGamesEl.textContent = '0';
    userWinsEl.textContent = '0';
    winRateEl.textContent = '0%';
    streakEl.textContent = '0';
    resultText.textContent = `Ready, ${playerName}? Make your move!`;
    resultText.style.background = '#48dbfb';
    compChoiceEl.textContent = '';
});

// Add pulse animation to CSS dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    .pulse {
        animation: pulse 0.3s ease;
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`, styleSheet.cssRules.length);
