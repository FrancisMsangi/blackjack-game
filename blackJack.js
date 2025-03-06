// BlackJack Game
// Author: Francis Michael Msangi

// Constants
const suites = ['hearts', 'diamonds', 'clubs', 'spades'];
const cards = ['ace_of_', '2_of_', '3_of_', '4_of_', '5_of_', '6_of_', '7_of_', '8_of_', '9_of_', '10_of_', 'jack_of_', 'queen_of_', 'king_of_'];

// Variables
let deck = [];
let dealtCard = [];
let dealtCardValue = [];
let score = 0;
let scorePlayer = 0;
let scoreComputer = 0;
let dealtCardPlayer = [];
let dealtCardComputer = [];
let askPlayer = 0; // Tracks the number of times the player has clicked "Deal Card"

// DOM Elements
const startGame = document.getElementById('startButton');
const continuePlayer = document.getElementById('dealButton');
const stopPlayer = document.getElementById('stopButton');
const playerScoreDisplay = document.getElementById('scorePlayer');
const computerScoreDisplay = document.getElementById('scoreComputer');
const dealtCardDisplay = document.getElementById('dealtCards');
const playerCardsDisplay = document.getElementById('playerCards');
const computerCardsDisplay = document.getElementById('computerCards');
const winnerDisplay = document.getElementById('winner');

// Event Listeners
startGame.addEventListener('click', startGameHandler);
continuePlayer.addEventListener('click', dealCardHandler);
stopPlayer.addEventListener('click', stopGameHandler);

// Function to shuffle a deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to create a deck of cards
function createDeck(suites, cards) {
  const deck = [];
  for (const suit of suites) {
    for (const card of cards) {
      deck.push(`${card}${suit}`);
    }
  }
  return deck;
}

// Function to get the value of a card
function getCardValue(card) {
  if (card.includes('ace')) return 1;
  if (card.includes('2')) return 2;
  if (card.includes('3')) return 3;
  if (card.includes('4')) return 4;
  if (card.includes('5')) return 5;
  if (card.includes('6')) return 6;
  if (card.includes('7')) return 7;
  if (card.includes('8')) return 8;
  if (card.includes('9')) return 9;
  return 10; // For 10, jack, queen, king
}

// Function to calculate the total score of dealt cards
function calculateScore(cards) {
  return cards.reduce((total, card) => total + getCardValue(card), 0);
}

// Function to display cards
function displayCards(cards, displayElement) {
  displayElement.innerHTML = '';
  cards.forEach(card => {
    const img = document.createElement('img');
    img.src = `img/${card}.png`;
    img.alt = card;
    img.classList.add('imagePlayedCard');
    displayElement.appendChild(img);
  });
}

// Function to reset the game
function resetGame() {
  dealtCard = [];
  dealtCardPlayer = [];
  dealtCardComputer = [];
  scorePlayer = 0;
  scoreComputer = 0;
  askPlayer = 0;
  dealtCardDisplay.innerHTML = '';
  playerCardsDisplay.innerHTML = '';
  computerCardsDisplay.innerHTML = '';
  playerScoreDisplay.textContent = 'Your score is:';
  computerScoreDisplay.textContent = 'Dealer score is:';
  winnerDisplay.textContent = '';
  continuePlayer.disabled = false;
  stopPlayer.disabled = false;
  startGame.disabled = false;
}

// Function to handle the start game button
function startGameHandler() {
  resetGame();
  deck = createDeck(suites, cards);
  shuffleDeck(deck);
}

// Function to handle the deal card button
function dealCardHandler() {
  if (deck.length === 0) return;

  askPlayer++;

  if (askPlayer === 1) {
    // Deal two cards to the player on the first click
    const firstCard = deck.pop();
    const secondCard = deck.pop();
    dealtCardPlayer.push(firstCard, secondCard);
    scorePlayer = calculateScore(dealtCardPlayer);
    playerScoreDisplay.textContent = `Your score is: ${scorePlayer}`;
    displayCards(dealtCardPlayer, playerCardsDisplay);
  } else {
    // Deal one card on subsequent clicks
    const card = deck.pop();
    dealtCardPlayer.push(card);
    scorePlayer = calculateScore(dealtCardPlayer);
    playerScoreDisplay.textContent = `Your score is: ${scorePlayer}`;
    displayCards(dealtCardPlayer, playerCardsDisplay);
  }

  // Check if player busts
  if (scorePlayer > 21) {
    winnerDisplay.textContent = 'Burst! You lost, Dealer Wins!';
    continuePlayer.disabled = true;
    stopPlayer.disabled = true;
  }
}

// Function to handle the stop button
function stopGameHandler() {
  continuePlayer.disabled = true;
  stopPlayer.disabled = true;

  // Computer's turn
  while (scoreComputer < 21 && scoreComputer < scorePlayer) {
    const card = deck.pop();
    dealtCardComputer.push(card);
    scoreComputer = calculateScore(dealtCardComputer);
  }

  computerScoreDisplay.textContent = `Dealer score is: ${scoreComputer}`;
  displayCards(dealtCardComputer, computerCardsDisplay);

  // Determine the winner
  if (scoreComputer > 21 || scorePlayer > scoreComputer) {
    winnerDisplay.textContent = 'You Win!';
  } else if (scoreComputer > scorePlayer) {
    winnerDisplay.textContent = 'Dealer Wins!';
  } else {
    winnerDisplay.textContent = 'It\'s a tie!';
  }
}