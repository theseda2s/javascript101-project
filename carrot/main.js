'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 20;

const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();
const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameButton.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', onFieldClick);

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  playSound(bgSound);
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  stopSound(bgSound);
  playSound(alertSound);
  stopGameTimer();
  hideGameButton();
  showPopUpMsg('Replay❓');
}

function finishGame(win) {
  started = false;
  hideGameButton();
  stopGameTimer;
  stopSound(bgSound);
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  showPopUpMsg(win ? 'You Won! 🎉' : 'You Lost! 😢');
}

function showStopButton() {
  const icon = gameButton.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameButton.style.visibility = 'visible';
}

function hideGameButton() {
  gameButton.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }

    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpMsg(msg) {
  popUpMessage.innerHTML = msg;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function onFieldClick(event) {
  if (!started) return;
  const target = event.target;
  if (target.matches('.carrot')) {
    playSound(carrotSound);
    event.target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
      stopSound(bgSound);
      playSound(winSound);
      return;
    }
  } else if (target.matches('.bug')) {
    stopSound(bgSound);
    playSound(bugSound);
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, './img/carrot.png');
  addItem('bug', BUG_COUNT, './img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = filedRect.width - CARROT_SIZE;
  const y2 = filedRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
