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

// Create cell with corresponding symbol value
// function Cell() {
//   let value = 0;

//   const setValue = (symbol) => {
//     symbol === 'X' ? (value = 1) : (value = 2);
//   };

//   return {};
// }

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

  console.log(board);

  return { setSymbol };
})();

// Create function to control state of the game
function gameController() {
  let players = [];

  const playerOne = createPlayer('one', 'X');
  const playerTwo = createPlayer('two', 'O');

  players.push(playerOne, playerTwo);

  playRound.setSymbol(1, 1, playerTwo.getSymbol());
  playRound.setSymbol(1, 2, playerOne.getSymbol());

  console.log(players);
}

gameController();
