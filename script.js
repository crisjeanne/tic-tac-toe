let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

const players = ['X', 'O'];
const player = document.querySelector('.player')
const x = document.querySelector('.x')
const o = document.querySelector('.o')

let currentPlayer;
let playerIndex;

x.addEventListener('click', () => {
    playerIndex = 0;
    currentPlayer = players[playerIndex]
    x.style.display = 'none';
    o.style.display = 'none'
    player.textContent = `${currentPlayer} is playing.`
    console.log(currentPlayer)
})
o.addEventListener('click', () => {
    playerIndex = 1;
    currentPlayer = players[playerIndex]
    x.style.display = 'none';
    o.style.display = 'none'
    player.textContent = `${currentPlayer} is playing.`
    console.log(currentPlayer)
})


const cells = document.querySelectorAll('.cell')
const result = document.querySelector('.result');
const prevBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
const resetBtn = document.querySelector('.new-game')

let stack = [];
let stackLength = stack.length;
let gameOver = false;

cells.forEach((e, index) => {
    e.addEventListener('click', () => {
        if (currentPlayer === undefined) {
            return
        }
        move(index);
        checkResult(players[(playerIndex + 1) % players.length]);
    })
})

function recordMove(player, row, col) {
    stack.push({ player, row, col })
}

function move(index) {
    let col = index % 3;
    let row = (index - col) / 3
    if (board[row][col] === '' && gameOver === false) {
        board[row][col] = currentPlayer

        recordMove(currentPlayer, row, col)

        playerIndex = (playerIndex + 1) % players.length;
        currentPlayer = players[playerIndex]
        player.textContent = `${currentPlayer} is playing.`

        renderMove()
    }
}

function renderMove() {
    if (gameOver === true) {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
        for (let i = 0; i < stackLength; i++) {
            const { player, row, col } = stack[i];
            board[row][col] = player;
        }

        for (let i = 0; i < cells.length; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            cells[i].textContent = board[row][col];
        }

    } else {
        for (let i = 0; i < cells.length; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            cells[i].textContent = board[row][col];
        }
        stackLength = stack.length
    }
}

function checkResult(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player ||
            board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            gameConclusion(player);
            return;
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player ||
        board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        gameConclusion(player);
        return;
    }
    if (!board.some(subArr => subArr.includes(''))) {
        gameConclusion(0);
        return;
    }
}

function gameConclusion(winner) {
    resetBtn.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    gameOver = true;
    if (winner === 0) {
        result.textContent = `It's a tie`;
    } else {
        result.textContent = `${winner} wins`;
    }
    player.textContent = `Game Over!`
}

resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    x.style.display = 'block';
    o.style.display = 'block'
    gameOver = false;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    stack = [];
    renderMove()
    playerIndex = undefined
    currentPlayer = players[playerIndex];
    player.textContent = `Choose Player:`
    result.textContent = '';
})
prevBtn.addEventListener('click', () => {
    if (stackLength > 0) {
        nextBtn.disabled = false
        stackLength -= 1
        renderMove()
    }
    if (stackLength < 1) {
        prevBtn.disabled = true
    }

})
nextBtn.addEventListener('click', () => {
    if (stackLength < stack.length) {
        prevBtn.disabled = false
        stackLength += 1
        renderMove()
    }
    if (stackLength === stack.length) {
        nextBtn.disabled = true
    }
})

