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
function createPlayer(symbol) {
  const playerSymbol = symbol;

  const getMark = () => playerSymbol;

  return { getMark };
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

  // Check for ties
  if (checkBoard.checkTie(board) && gameOver === false) {
    console.log("It's a tie!");
  }

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

  const getState = () => gameOver;

  return { getState };
}

// Create function that plays a round the game
const playRound = (function () {
  const board = Gameboard.getBoard();
  let lastMark;

  const setMark = (row, column) => {
    lastMark === 'O' || !lastMark ? (mark = 'X') : (mark = 'O');

    if (board[row][column] === 0) {
      board[row][column] = mark;
      lastMark = mark;
      const checkGame = gameState(board);

      if (checkGame.getState()) {
        console.log('Game over!');
      }
    } else {
      console.log('Player already picked that square!');
    }
  };
  return { setMark, lastMark };
})();

// Create function to control state of the game
function gameController() {
  renderDom.renderBoard();

  const playerOne = createPlayer('X');
  const playerTwo = createPlayer('O');
}

const renderDom = (function () {
  const board = Gameboard.getBoard();
  const gridDiv = document.querySelector('#grid');

  const renderBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('grid-cell');
        gridDiv.appendChild(cellDiv);

        cellDiv.addEventListener('click', () => {
          playRound.setMark(i, j);
          cellDiv.innerHTML = board[i][j];
        });
      }
    }
  };

  return { renderBoard };
})();

gameController();
