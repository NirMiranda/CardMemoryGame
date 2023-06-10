let playerName;
let cardCount;
let startTime;
let timerInterval;

function startGame() {
  const playerNameInput = document.getElementById('playerName');
  playerName = playerNameInput.value.trim();

  if (playerName === '') {
    alert('Please enter your name.');
    return;
  }

  const cardCountInput = document.getElementById('cardCount');
  cardCount = parseInt(cardCountInput.value);

  if (isNaN(cardCount) || cardCount < 4 || cardCount > 60 || cardCount % 2 != 0) {
    alert('Please enter a valid EVEN number between 4 and 30.');
    return;
  }

  const memoryGame = document.querySelector('.memory-game');

  // Remove the menu
  const menu = document.getElementById('menu');
  menu.parentNode.removeChild(menu);

  // Display player name
  const playerNameDisplay = document.createElement('div');
  playerNameDisplay.textContent = `Player: ${playerName}`;
  playerNameDisplay.classList.add('player-name');
  memoryGame.parentNode.insertBefore(playerNameDisplay, memoryGame);

  // Create timer display
  const timerDisplay = document.createElement('div');
  timerDisplay.id = 'timer';
  memoryGame.parentNode.insertBefore(timerDisplay, memoryGame);

  // Start the timer
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
  calculateGridSize();

  // ...

  // Set the grid layout
  setGridLayout();

  // Calculate the number of rows and columns
  // const screenWidth = window.innerWidth;
  // let numRows, numCols;

  // if (screenWidth >= 1200) {
  //   numRows = Math.ceil(cardCount / 6);
  //   numCols = 6;
  // } else if (screenWidth >= 992) {
  //   numRows = Math.ceil(cardCount / 5);
  //   numCols = 5;
  // } else if (screenWidth >= 768) {
  //   numRows = Math.ceil(cardCount / 4);
  //   numCols = 4;
  // } else {
  //   numRows = Math.ceil(cardCount / 3);
  //   numCols = 3;
  // }
  // window.addEventListener('resize', startGame);

  // Generate the cards

  const frameworks = [
    'butterfly',
    'cat',
    'crab',
    'dog',
    'dogo-argentino',
    'duck',
    'giraffe',
    'lamb',
    'lion',
    'mouse',
    'panda',
    'raccoon',
    'starfish',
    'tiger',
    'turtle',
    'butterfly',
    'bee',
    'armadillo',
    'pigeon',
    'shark',
    'fish',
    'jellyfish',
    'spoonbill',
    'goat',
    'camel',
    'cow',
    'penguin',
    'fly',
    'snake',
    'hippo',
    'rhino'
  ];

  const selectedFrameworks = frameworks.slice(0, Math.floor(cardCount / 2));
  const cards = selectedFrameworks.flatMap((framework) => [
    createMemoryCard(framework),
    createMemoryCard(framework)
  ]);

  shuffle(cards);

  // Set the grid layout
  memoryGame.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  memoryGame.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

  cards.forEach((card) => {
    memoryGame.appendChild(card);
  });

  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${(seconds % 60)
      .toString()
      .padStart(2, '0')}`;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time: ${formattedTime}`;
  }
  

function createMemoryCard(framework) {
  const memoryCard = document.createElement('div');
  memoryCard.classList.add('memory-card');
  memoryCard.dataset.framework = framework;

  const frontFace = document.createElement('img');
  frontFace.classList.add('front-face');
  frontFace.src = `../img/${framework}.png`;
  frontFace.alt = framework;
  memoryCard.appendChild(frontFace);

  const backFace = document.createElement('img');
  backFace.classList.add('back-face');
  backFace.src = '../img/question-mark.png';
  backFace.alt = 'CardBack';
  memoryCard.appendChild(backFace);

  return memoryCard;
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card flipped
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('match');
  secondCard.classList.add('match');

  checkGameCompletion();
  resetBoard();
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

function resetGame() {
    location.reload();
  }
  
  function checkGameCompletion() {
    const matchedCards = document.querySelectorAll('.memory-card.match');
  if (matchedCards.length === cardCount) {
    clearInterval(timerInterval); // Stop the timer
      const memoryGame = document.querySelector('.memory-game');
  
      setTimeout(() => {
        memoryGame.style.display = 'none';
  
        const container = document.getElementById('container');
  
        const congratsText = document.createElement('div');
        congratsText.classList.add('congrats-text');
        congratsText.textContent = 'Congratulations, you have finished the game!';
  
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play again';
        playAgainButton.classList.add('play-again-button'); // Add class for styling
        playAgainButton.addEventListener('click', resetGame);
  
        container.appendChild(congratsText);
        container.appendChild(playAgainButton);
      }, 1200);
    }

  }
  function calculateGridSize() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 1200) {
      numRows = Math.ceil(cardCount / 10);
      numCols = 10;
    } else if (screenWidth >= 992) {
      numRows = Math.ceil(cardCount / 8);
      numCols = 8;
    } else if (screenWidth >= 768) {
      numRows = Math.ceil(cardCount / 6);
      numCols = 6;
    } else {
      numRows = Math.ceil(cardCount / 5);
      numCols = 5;
    }
  }
  
  function setGridLayout() {
    const memoryGame = document.querySelector('.memory-game');
    memoryGame.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    memoryGame.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  }
  
  window.addEventListener('resize', () => {
    calculateGridSize();
    setGridLayout();
  });
  