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

const playGame = (function () {
  const board = Gameboard.getBoard();

  const setToken = (row, column, token) => {
    board[row][column] = token;
  };

  return { setToken };
})();

playGame.setToken(0, 0, 'x');
playGame.setToken(0, 1, 'o');
console.log(Gameboard.getBoard());
