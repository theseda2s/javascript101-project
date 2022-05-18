'use strict';

const CARROT_SIZE = 80;
const gameButton = document.querySelector('.game__button');
const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();
const stopButton = document.querySelector('.stop__button');
const gameTimer = document.querySelector('.game__timer');
const popup = document.querySelector('.pop-up');

function initGame() {
  addItem('carrot', 5, './img/carrot.png');
  addItem('bug', 5, './img/bug.png');
  field.style.display = 'none';
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

initGame();

function playGame() {
  field.style.display = 'block';

  let time = 10;
  let min = '';
  let sec = '';
  const timer = setInterval(() => {
    min = parseInt(time / 60);
    sec = time % 60;
    gameTimer.innerHTML = `${min}:${sec}`;
    time--;
    if (time < 0) {
      clearInterval(timer);
      gameButton.style.opacity = '0';
      popup.setAttribute('class', 'pop-up');
      const message = document.querySelector('.pop-up__message');
      message.innerHTML = `You Lost 😢`;
    }
  }, 1000);
}

gameButton.addEventListener('click', () => {
  gameButton.innerHTML = `<i class="fas fa-stop"></i>`;
  gameButton.setAttribute('class', 'stop__button');
  playGame();
});

function replay() {
  popup.setAttribute('class', 'pop-up pop-up--hide');
  gameButton.style.opacity = '1';
  field.innerHTML = '';
  initGame();
  playGame();
}

const refresh = document.querySelector('.pop-up__refresh');
refresh.addEventListener('click', () => {
  replay();
});

field.addEventListener('click', (event) => {
  if (event.target.className === 'carrot') {
    event.target.remove();
  } else if (event.target.className === 'bug') {
    // 타이머 멈추고 you lost
  }
});
