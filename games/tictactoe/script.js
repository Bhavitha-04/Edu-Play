/*let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    if (checkWinner()) {
      alert(`${currentPlayer} Wins!`);
      resetGame();
    } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let pattern of winPatterns) {
    if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  let cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.textContent = '';
  }
  currentPlayer = 'X';
}*/
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        message.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        highlightWinningCells();
    } else if (gameState.every(cell => cell !== '')) {
        message.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        );
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            document.querySelector(`[data-index='${a}']`).classList.add('winning-cell');
            document.querySelector(`[data-index='${b}']`).classList.add('winning-cell');
            document.querySelector(`[data-index='${c}']`).classList.add('winning-cell');
        }
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = Array(9).fill('');
    message.textContent = `Player ${currentPlayer}'s Turn`;
    board.innerHTML = '';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Initialize
createBoard();
message.textContent = `Player ${currentPlayer}'s Turn`;
restartButton.addEventListener('click', restartGame);

