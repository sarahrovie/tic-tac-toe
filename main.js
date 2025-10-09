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
function createPlayer(name, symbol) {
  const playerName = 'Player ' + name;
  const playerSymbol = symbol;

  const getSymbol = () => playerSymbol;

  return { playerName, getSymbol };
}

const checkWin = (function () {
  // Check if a row has the same elements
  const checkRow = (row) => row.every((v) => v === row[0]);

  return { checkRow };
})();

function gameState(board) {
  let gameOver = false;

  for (let i = 0; i < 3; i++) {
    if (!board[i].includes(0)) {
      gameOver = checkWin.checkRow(board[i]);
    }

    if (gameOver === true) {
      console.log('Game over!');
      break;
    }
  }

  const getState = () => gameOver;

  return { getState };
}

// Create function that plays a round the game
const playRound = (function () {
  const board = Gameboard.getBoard();

  const setSymbol = (row, column, symbol) => {
    if (board[row][column] === 0) {
      board[row][column] = symbol;
    } else {
      console.log('Player already picked that square!');
    }
  };

  return { setSymbol };
})();

// Create function to control state of the game
function gameController() {
  let players = [];
  const board = Gameboard.getBoard();

  const playerOne = createPlayer('one', 'X');
  const playerOneSymbol = playerOne.getSymbol();

  const playerTwo = createPlayer('two', 'O');
  const playerTwoSymbol = playerTwo.getSymbol();

  players.push(playerOne, playerTwo);

  playRound.setSymbol(1, 1, playerTwoSymbol);
  playRound.setSymbol(1, 2, playerOneSymbol);
  playRound.setSymbol(1, 0, playerTwoSymbol);
  playRound.setSymbol(2, 1, playerTwoSymbol);
  playRound.setSymbol(2, 2, playerTwoSymbol);
  playRound.setSymbol(2, 0, playerTwoSymbol);

  console.log(board);
  const checkGame = gameState(board);
}

gameController();
