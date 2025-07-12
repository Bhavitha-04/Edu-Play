const puzzlePieces = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function createPuzzleBoard() {
    const board = document.getElementById('puzzle-board');
    puzzlePieces.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.textContent = piece;
        pieceElement.className = 'puzzle-piece';
        pieceElement.addEventListener('click', () => movePiece(pieceElement));
        board.appendChild(pieceElement);
    });
}

function movePiece(piece) {
    // Logic to move puzzle pieces will go here.
    // For simplicity, we're just changing background color on click
    piece.style.backgroundColor = '#c8a2c8';
}

createPuzzleBoard();
