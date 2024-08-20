// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning conditions: 8 possible ways to win in a 3x3 grid
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
    if (gameActive) {
        aiMove();
    }
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#e74c3c' : '#2980b9'; // X is red, O is blue
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        statusText.style.color = currentPlayer === 'X' ? '#e74c3c' : '#2980b9'; // Winning color
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = `It's a draw!`;
        statusText.style.color = '#f39c12'; // Draw color
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    statusText.style.color = currentPlayer === 'X' ? '#e74c3c' : '#2980b9'; // Update turn color
}

function aiMove() {
    let availableCells = [];

    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            availableCells.push(i);
        }
    }

    if (availableCells.length === 0) {
        return;
    }

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const aiCell = cells[randomIndex];
    updateCell(aiCell, randomIndex);
    checkResult();
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = "Player X's turn";
    statusText.style.color = '#e74c3c'; // Default to Player X's color
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#ecf0f1'; // Reset cell color
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
