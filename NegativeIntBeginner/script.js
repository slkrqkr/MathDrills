'use strict';

let sideMessage = document.querySelector('.message').textContent;
console.log(sideMessage);

let firstNumber = Number(document.getElementById('firstNumber').innerHTML);
let secondNumber = Number(document.getElementById('secondNumber').innerHTML);
let currentScore = Number(document.getElementById('score').innerHTML);
let newGuess = 1;
let streakCount = 0;
let highScore = 0;
let multiplier = 1;
let livesRemaining = 3;

function setHighScore(newHigh) {
  document.querySelector('.highscore').textContent = newHigh;
}

function setSideMessage(newMessage) {
  document.querySelector('.message').textContent = newMessage;
}

function fetchHighScore() {
  if (typeof Storage !== 'undefined') {
    if (localStorage.highestScore) {
      highScore = Number(localStorage.highestScore);
      setHighScore(highScore);
      console.log('There is a high score and it is: ' + highScore);
    } else {
      setHighScore(0);
      console.log('NO HIGH SCORE FOUND YET');
    }
  } else {
    document.querySelector('.highscore').textContent =
      "Sorry, your browser doesn't support web storage :(";
  }
}

fetchHighScore();

function increaseScore() {
  increaseStreak();
  currentScore += multiplier;
  document.querySelector('.score').textContent = currentScore;
  randomizeNumbers();
  console.log('Right Answer');
  console.log(currentScore);
}

function increaseStreak() {
  streakCount++;
  setSideMessage(`Nice work! Your current streak is ${streakCount}`);
  if (streakCount >= 20) {
    multiplier = 5;
    document.querySelector(
      '.streak-message'
    ).textContent = `x5 multiplier, setting records here!`;
    document.querySelector('.streak-message').style.color = 'aquamarine';
  } else if (streakCount >= 15) {
    multiplier = 4;
    document.querySelector(
      '.streak-message'
    ).textContent = `x4 multiplier, that's amazing!`;
    document.querySelector('.streak-message').style.color = 'red';
  } else if (streakCount >= 10) {
    multiplier = 3;
    document.querySelector(
      '.streak-message'
    ).textContent = `x3 multiplier, you're on fire!`;
    document.querySelector('.streak-message').style.color = 'yellow';
  } else if (streakCount >= 5) {
    multiplier = 2;
    document.querySelector('.streak-message').textContent = `x2 multiplier!`;
    document.querySelector('.streak-message').style.color = 'green';
  } else {
    multiplier = 1;
    document.querySelector('.streak-message').textContent = ``;

    document.querySelector('.streak-message').style.color = 'white';
  }
}

function decreaseLives() {
  streakCount = 0;
  multiplier = 1;
  setSideMessage(`Whoops, try again! Your current streak is ${streakCount}`);
  livesRemaining--;
  document.querySelector('.lives').textContent = livesRemaining;
  document.querySelector('.streak-message').textContent = ``;

  if (livesRemaining < 0) gameOver();
}

function gameOver() {
  // TODO the losing screen
  console.log(currentScore);
  console.log(highScore);
  document.querySelector('.check').disabled = true;
  document.querySelector('.guess').disabled = true;
  setSideMessage('Game Over! Click Reset to start again!');
  document.querySelector('body').style.backgroundColor = '#36486b';
  if (currentScore > highScore) {
    document.querySelector('.highscore').textContent = currentScore;
    localStorage.highestScore = currentScore;
    document.querySelector(
      '.streak-message'
    ).textContent = `NEW HIGH SCORE OF ${currentScore}!!`;
    document.querySelector('.streak-message').style.color = '#ff7b25';
  }
  console.log(currentScore);
  console.log(highScore);
}

function resetGame() {
  resetGuess();
  randomizeNumbers();
  fetchHighScore();
  livesRemaining = 3;
  document.querySelector('.lives').textContent = livesRemaining;
  multiplier = 1;
  currentScore = 0;
  document.getElementById('score').innerHTML = currentScore;
  streakCount = 0;
  document.querySelector('.streak-message').textContent = ``;
  setSideMessage('Start guessing...');
  document.querySelector('.check').disabled = false;
  document.querySelector('.guess').disabled = false;
  document.querySelector('body').style.backgroundColor = 'black';
}

function randomizeNumbers() {
  //increaseScore();
  const firstRand = parseInt(Math.random() * 12 - 6);
  const secondRand = parseInt(Math.random() * 12 - 6);
  if (firstRand == 0 && secondRand ==0){
    randomizeNumbers()
  };
  document.getElementById('firstNumber').innerHTML = firstRand;
  document.getElementById('secondNumber').innerHTML = secondRand;
  firstNumber = firstRand;
  secondNumber = secondRand;
}

randomizeNumbers();

function resetGuess() {
  newGuess = 0;
  document.getElementById('guess').value = '';
}

document.querySelector('.reset').addEventListener('click', function () {
  resetGame();
});

document.querySelector('.check').addEventListener('click', function () {
  newGuess = Number(document.querySelector('.guess').value);
  newGuess === firstNumber * secondNumber ? increaseScore() : decreaseLives();
  resetGuess();
});

document.querySelector('.guess').addEventListener('keyup', function () {
  if (event.keyCode === 13) {
    newGuess = Number(document.querySelector('.guess').value);
    newGuess === firstNumber * secondNumber ? increaseScore() : decreaseLives();
    resetGuess();
  }
});

document.querySelector('.deleteCookies').addEventListener('click', function () {
  highScore = 0;
  localStorage.removeItem('highestScore');
  console.log('localStorage Deleted!');
});
