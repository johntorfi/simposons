const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    checkWin();
  } else {
    unflipCards();
  }
}

function disableCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach(card => {
    const randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
}

function checkWin() {
  matchedCards += 2;
  if (matchedCards === cards.length) {
    setTimeout(() => {
      showCongratulations();
    }, 500);
  }
}

function showCongratulations() {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const messageText = document.createElement('h2');
  messageText.textContent = 'Well Done!';

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Play Again';
  restartButton.addEventListener('click', restartGame);

  messageContainer.appendChild(messageText);
  messageContainer.appendChild(restartButton);

  setTimeout(() => {
    document.body.appendChild(messageContainer);
  }, 500);
}

function restartGame() {
  const messageContainer = document.querySelector('.message-container');
  messageContainer.remove();

  matchedCards = 0;
  shuffleCards();
  cards.forEach(card => {
    card.classList.remove('flip', 'matched');
    card.addEventListener('click', flipCard);
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

shuffleCards();
