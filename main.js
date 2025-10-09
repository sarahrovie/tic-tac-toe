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
// function createPlayer(symbol) {
//   let value = 0;

//   const checkSymbol = () => {
//     if (symbol === 'X') {
//       value = 1;
//     }
//   };

//   return {};
// }

function playRound() {
  const board = Gameboard.getBoard();

  const setToken = (row, column, token) => {
    if (board[row][column] === 0) {
      board[row][column] = token;
      console.log(board);
    } else {
      console.log('Pick another cell!');
    }
  };

  return { setToken };
}

// Create function to control state of the game
function gameController() {
  let players = [];

  const playerOne = createPlayer('one', 'X');
  const playerTwo = createPlayer('two', 'O');

  players.push(playerOne, playerTwo);

  console.log(players);
}

gameController();
