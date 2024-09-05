const cardsArray = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🥭', '🥭', '🍑', '🍑'];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');

// Shuffle the cards
function shuffleCards() {
  cardsArray.sort(() => 0.5 - Math.random());
}

// Create the cards dynamically
function createBoard() {
  shuffleCards();
  gameBoard.innerHTML = ''; // Clear the board
  cardsArray.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // Prevent double-click on the same card

  this.classList.remove('hidden');
  this.textContent = this.dataset.emoji;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

// Check if two flipped cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

// Unflip the cards if they don't match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
}

// Reset the board for the next round
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Restart the game
function restartGame() {
  createBoard();
}

// Start the game
createBoard();
