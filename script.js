let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

const players = ['X', 'O'];
const player = document.querySelector('.player')
let playerIndex = 0;
let currentPlayer = players[playerIndex];
player.textContent = `${currentPlayer} is playing.`
let gameOver = false;

const cells = document.querySelectorAll('.cell')
cells.forEach((e, index) => {
    e.addEventListener('click', () => {
        move(index);
        checkResult(players[(playerIndex + 1) % players.length]);
    })
})

function move(index) {
    let col = index % 3;
    let row = (index - col) / 3
    if (board[row][col] === '' && gameOver === false) {
        board[row][col] = currentPlayer
        playerIndex = (playerIndex + 1) % players.length;
        currentPlayer = players[playerIndex]
        player.textContent = `${currentPlayer} is playing.`
        renderMove()
    }

}

function renderMove() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === 'X') {
                cells[(row * 3) + col].textContent = 'X';
            } else if (board[row][col] === 'O') {
                cells[(row * 3) + col].textContent = 'O';
            }
            else{
                cells[(row * 3) + col].textContent = '';
            }
        }
    }
}

const result = document.querySelector('.result');

function checkResult(player) {

    //rows check
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            gameConclusion(player)
            return
        }
    }
    //column check
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            gameConclusion(player)
            return
        }
    }
    //diagonal check
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        gameConclusion(player)
        return
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        gameConclusion(player)
        return
    }
    //tie check
    function isTie(board) {
        return board.some(subArr => subArr.includes(''));
    }
    if (isTie(board) === false) {
        gameConclusion(0)
        return
    }
}

const btn = document.querySelector('.new-game')
function gameConclusion(winner) {
    btn.style.display = 'block';
    gameOver = true;
    if (winner === 0) {
        result.textContent = `It's a tie`;
    } else {
        result.textContent = `${winner} wins`;
    }
}

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    renderMove()
    playerIndex = 0;
    currentPlayer = players[playerIndex];
    console.log(currentPlayer)
    player.textContent = `${currentPlayer} is playing.`
    result.textContent = '';
    gameOver = false;
    console.log(board)
})