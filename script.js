document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const messageElement = document.getElementById('message');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

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

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            updateScore(currentPlayer);
            gameActive = false;
        } else if (!board.includes('')) {
            messageElement.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const updateScore = (player) => {
        if (player === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        messageElement.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
