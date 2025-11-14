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
      result = 'Tie!';
    } else if (!tie && gameOver) {
      result = 'Game over!';
    }
    return result;
  };

  return { getState, getResult };
}

// Create function that starts game and stores players scores and names
function startGame() {
  let playerOneValue = document.getElementById('player1').value;
  let playerTwoValue = document.getElementById('player2').value;
  let players = [];

  const playerOne = createPlayer(
    'X',
    !playerOneValue ? 'Player 1' : playerOneValue
  );
  const playerTwo = createPlayer(
    'O',
    !playerTwoValue ? 'Player 2' : playerTwoValue
  );

  players.push(playerOne, playerTwo);

  return { players };
}

// Create function that plays a round the game
const playRound = (function () {
  const board = Gameboard.getBoard();
  let lastSymbol;
  let result = '';
  let winner = '';

  // Checks for a winner each round
  const checkForWin = () => {
    const checkGame = gameState(board);

    if (checkGame.getState()) {
      result = checkGame.getResult();

      if (result === 'Tie!') {
        winner = 'Both players win :)';
      } else {
        winner = lastSymbol;
        players = startGame.players;

        const winnerPlayer = players.find((player) => player.symbol === winner);
        winnerPlayer.increaseScore();
        winner = `Player ${winnerPlayer.name} wins`;
      }
    }
  };

  const setSymbol = (row, column) => {
    lastSymbol === 'O' || !lastSymbol ? (symbol = 'X') : (symbol = 'O');

    if (board[row][column] === 0) {
      board[row][column] = symbol;
      lastSymbol = symbol;

      checkForWin();
    } else {
      alert('Player already picked that square!');
    }
  };

  const endRound = () => {
    result = '';
    winner = '';
  };

  const getResult = () => result;
  const getWinner = () => winner;

  return { setSymbol, getResult, getWinner, endRound };
})();

// Create function to control state of the game
function gameController() {
  // window.addEventListener('DOMContentLoaded', ()=> {})
  const startBtn = document.querySelector('#start-btn');

  startBtn.addEventListener('click', (e) => {
    const gameStart = startGame();
    console.log(gameStart.players);
  });
  // renderDom.renderBoard();
  // renderDom.renderScore();

  // console.log(startGame.players);
}

const renderDom = (function () {
  const board = Gameboard.getBoard();

  const gridDiv = document.createElement('div');
  const result = document.querySelector('#result');
  const winner = document.querySelector('#winner');

  // Render overlay with retry button to restart game
  const renderOverlay = () => {
    const overlayDiv = document.createElement('div');
    overlayDiv.setAttribute('id', 'overlay');

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Retry?';
    overlayDiv.appendChild(resetBtn);

    resetBtn.addEventListener('click', () => {
      resetGame();

      renderBoard();
      playRound.endRound();
      result.innerHTML = '';
      winner.innerHTML = '';
    });

    overlayDiv.style.display = 'flex';
    gridDiv.appendChild(overlayDiv);
  };

  // Render result message and winner
  const renderResults = () => {
    resultMessage = playRound.getResult();
    winnerMessage = playRound.getWinner();

    result.innerHTML = resultMessage;
    winner.innerHTML = winnerMessage;
  };

  // Render each player score
  const renderScore = () => {
    const players = startGame.players;

    if (players) {
      const playerOne = players[0];
      const playerTwo = players[1];
      score.innerHTML = `${playerOne.name}: ${playerOne.getScore()} - 
      ${playerTwo.name}: ${playerTwo.getScore()}`;
    }

    // players.forEach((player) => {
    //   score.innerHTML += `${player.name}: ${player.getScore()} `;
    // });
  };

  const renderBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('grid-cell');
        gridDiv.appendChild(cellDiv);

        cellDiv.addEventListener('click', () => {
          playRound.setSymbol(i, j);
          cellDiv.innerHTML = board[i][j];

          if (playRound.getResult() && playRound.getWinner()) {
            renderResults();
            renderOverlay();
          }
          renderScore();
        });
      }
    }
  };

  return { renderBoard, renderScore };
})();

const resetGame = () => {
  const board = Gameboard.getBoard();
  const gridDiv = document.querySelector('#grid');
  const overlayDiv = document.querySelector('#overlay');

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }

  gridDiv.innerHTML = '';
};

gameController();
