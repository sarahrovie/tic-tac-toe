// Store gameboard as an array inside of gameboard object
const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create 2d array with 3 arrays for rows and 3 columns of elements
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = 0;
    }
  }

  const getBoard = () => board;

  return { getBoard };
})();

// Create player object with corresponding symbol
function createPlayer(symbol, name) {
  let score = 0;

  const getScore = () => score;
  const increaseScore = () => score++;

  return { name, symbol, getScore, increaseScore };
}

const checkBoard = (function () {
  // Check if there's a tie
  const checkTie = (board) => board.every((row) => !row.includes(0));
  // Check if a row has a match
  const checkRow = (row) => row.every((v) => v === row[0]);
  // Check if a column has a match
  const checkColumn = (row1, row2, j) => row1[j] === row2[j];
  // Check if a diagonal line has a match
  const checkDiag = (firstRow, middleRow, lastRow) => {
    if (firstRow[0] === middleRow[1] && firstRow[0] !== 0) {
      return firstRow[0] === lastRow[2];
    } else if (firstRow[2] === middleRow[1] && firstRow[2] !== 0) {
      return firstRow[2] === lastRow[0];
    }
  };

  return { checkTie, checkRow, checkColumn, checkDiag };
})();

function gameState(board) {
  let gameOver = false;
  let tie = false;
  let result = '';

  // Check for row match on every row
  for (let i = 0; i < 3; i++) {
    if (gameOver) {
      break;
    }

    if (!board[i].includes(0)) {
      gameOver = checkBoard.checkRow(board[i]);
    }
  }

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameOver) {
        break;
      }

      // Check for diagonal match
      if (board[i][j] !== 0) {
        gameOver = checkBoard.checkDiag(
          board[0],
          board[1],
          board[board.length - 1]
        );

        // Check for column match
        if (checkBoard.checkColumn(board[i], board[i + 1], j)) {
          gameOver = checkBoard.checkColumn(board[i], board[i + 2], j);
        }
      }
    }
  }

  // Check for ties
  if (checkBoard.checkTie(board) && gameOver === false) {
    tie = true;
    gameOver = true;
  }

  const getState = () => gameOver;
  const getResult = () => {
    if (tie) {
      result = 'Tie';
    } else if (!tie && gameOver) {
      result = 'Game Over';
    }
    return result;
  };

  return { getState, getResult };
}

// Create function that starts game and stores players scores and names
const startGame = (function () {
  let players = [];
  let gameStart = false;

  const createPlayers = () => {
    let playerOneValue = document.getElementById('player1').value;
    let playerTwoValue = document.getElementById('player2').value;

    const playerOne = createPlayer(
      'X',
      playerOneValue === '' ? 'Player 1' : playerOneValue
    );
    const playerTwo = createPlayer(
      'O',
      playerTwoValue === '' ? 'Player 2' : playerTwoValue
    );

    players.push(playerOne, playerTwo);
    gameStart = true;
  };

  const getGameStart = () => gameStart;

  return { createPlayers, players, getGameStart };
})();

// Create function that plays a round the game
const playRound = (function () {
  const board = Gameboard.getBoard();
  let lastSymbol;
  let winner = '';

  // Checks for a winner each round
  const checkForWin = () => {
    const checkGame = gameState(board);

    if (checkGame.getState()) {
      result = checkGame.getResult();

      if (result === 'Tie') {
        winner = 'Draw!';
      } else {
        winner = lastSymbol;
        players = startGame.players;

        const winnerPlayer = players.find((player) => player.symbol === winner);
        winnerPlayer.increaseScore();
        winner = `Winner: ${winnerPlayer.name}!`;
      }
    }
  };

  const setSymbol = (row, column) => {
    lastSymbol === 'O' || !lastSymbol ? (symbol = 'X') : (symbol = 'O');

    if (board[row][column] === 0) {
      board[row][column] = symbol;
      lastSymbol = symbol;

      checkForWin();
    }
  };

  const endRound = () => {
    winner = '';
  };

  const getResult = () => result;
  const getWinner = () => winner;
  const getError = () => error;

  return { setSymbol, getResult, getWinner, endRound, getError };
})();

// Create function to control state of the game
function gameController() {
  renderDom.renderBoard();

  const startBtn = document.querySelector('#start-btn');
  const errorP = document.querySelector('#error');

  startBtn.addEventListener('click', () => {
    if (errorP.textContent !== '') {
      errorP.textContent = '';
    }

    startGame.createPlayers();
    startBtn.style.visibility = 'hidden';
    renderDom.renderPlayers();
  });
}

const renderDom = (function () {
  const board = Gameboard.getBoard();

  const gridDiv = document.querySelector('#grid');
  const winner = document.querySelector('#winner');
  const errorP = document.querySelector('#error');

  // Render overlay with retry button to restart game
  const renderOverlay = () => {
    const overlayDiv = document.createElement('div');
    overlayDiv.setAttribute('id', 'overlay');

    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('class', 'btn');
    resetBtn.textContent = 'Try again?';
    overlayDiv.appendChild(resetBtn);

    resetBtn.addEventListener('click', () => {
      resetGame();

      renderBoard();
      playRound.endRound();
      winner.innerHTML = '';
    });

    overlayDiv.style.display = 'flex';
    gridDiv.appendChild(overlayDiv);
  };

  const renderError = (errorMessage) => {
    errorP.textContent = errorMessage;
  };

  // Render result message
  const renderResults = () => {
    winnerMessage = playRound.getWinner();

    winner.innerHTML = winnerMessage;
  };

  // Render each player score
  const renderPlayers = () => {
    const players = startGame.players;

    if (players) {
      const playerOne = players[0];
      const playerTwo = players[1];

      inputP1 = document.querySelector('#player1');
      scoreP1 = document.querySelector('#player1-score');

      inputP2 = document.querySelector('#player2');
      scoreP2 = document.querySelector('#player2-score');

      inputP1.readOnly = true;
      inputP2.readOnly = true;

      scoreP1.innerHTML = `${playerOne.getScore()}`;
      scoreP2.innerHTML = `${playerTwo.getScore()}`;
    }
  };

  const renderBoard = () => {
    const player1Svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="x">
      <title>close</title>
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
    `;
    const player2Svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>
    `;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('grid-cell');
        gridDiv.appendChild(cellDiv);

        cellDiv.addEventListener('click', () => {
          if (startGame.getGameStart() && cellDiv.innerHTML === '') {
            errorP.textContent = '';

            playRound.setSymbol(i, j);

            if (board[i][j] === 'X') {
              cellDiv.innerHTML += player1Svg;
            } else if (board[i][j] === 'O') {
              cellDiv.innerHTML += player2Svg;
            }

            if (playRound.getWinner()) {
              renderResults();
              renderOverlay();
            }
            renderPlayers();
          } else if (!startGame.getGameStart()) {
            renderError('Click "start" to play!');
          } else if (cellDiv.innerHTML !== '') {
            renderError('Pick another square!');
          }
        });
      }
    }
  };

  return { renderBoard, renderPlayers };
})();

const resetGame = () => {
  const board = Gameboard.getBoard();
  const gridDiv = document.querySelector('#grid');

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }

  gridDiv.innerHTML = '';
};

gameController();
