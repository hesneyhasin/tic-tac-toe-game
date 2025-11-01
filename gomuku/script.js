const BOARD_SIZE = 10;
let board = [];
let currentPlayer = 'black';
let gameActive = true;
let player1Wins = 0;
let player2Wins = 0;

const gameBoard = document.getElementById('gameBoard');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const playerIndicator = document.getElementById('playerIndicator');
const messageDisplay = document.getElementById('message');
const playButton = document.getElementById('playButton');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

function initBoard() {
    gameBoard.innerHTML = '';
    board = [];
    currentPlayer = 'black';
    gameActive = true;
    messageDisplay.textContent = '';
    updateCurrentPlayer();

    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = null;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (!gameActive) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (board[row][col] !== null) return;

    board[row][col] = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin(row, col)) {
        gameActive = false;
        const winner = currentPlayer === 'black' ? 'Player 1 (Black)' : 'Player 2 (White)';
        messageDisplay.textContent = `${winner} wins! 🎉`;
        
        if (currentPlayer === 'black') {
            player1Wins++;
            player1ScoreDisplay.textContent = player1Wins;
        } else {
            player2Wins++;
            player2ScoreDisplay.textContent = player2Wins;
        }
        return;
    }

    if (isBoardFull()) {
        gameActive = false;
        messageDisplay.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updateCurrentPlayer();
}

function updateCurrentPlayer() {
    currentPlayerDisplay.textContent = currentPlayer === 'black' ? 'Black' : 'White';
    playerIndicator.className = `player-indicator ${currentPlayer}`;
}

function checkWin(row, col) {
    const directions = [
        [[0, 1], [0, -1]],   // horizontal
        [[1, 0], [-1, 0]],   // vertical
        [[1, 1], [-1, -1]],  // diagonal \
        [[1, -1], [-1, 1]]   // diagonal /
    ];

    for (let direction of directions) {
        let count = 1;
        for (let [dx, dy] of direction) {
            let newRow = row + dx;
            let newCol = col + dy;
            while (
                newRow >= 0 && newRow < BOARD_SIZE &&
                newCol >= 0 && newCol < BOARD_SIZE &&
                board[newRow][newCol] === currentPlayer
            ) {
                count++;
                newRow += dx;
                newCol += dy;
            }
        }
        if (count >= 5) return true;
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === null) return false;
        }
    }
    return true;
}

playButton.addEventListener('click', initBoard);

initBoard();
