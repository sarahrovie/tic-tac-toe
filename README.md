# Tic Tac Toe

This project consisted in recreating the classic game of Tic Tac Toe to be played in your browser! It was developed with HTML, CSS and Javascript, for the [The Odin Project](https://github.com/TheOdinProject)'s Javascript course.

## Process

The focus of this project was to create the logic of the game and the controls using mostly factory functions and the module pattern, with the main goal of having as little global code as possible. It was first developed to work on console, so that the game logic was working fully before moving on to creating the object that handles the display/DOM logic.

## Features

- A two-player game
- Players can input their names before playing
- Players' scores update at the end of each round
- Winner's name is displayed under gameboard at the end of each round
- Player's have the option to restart game

## Technologies

- HTML
- CSS
- JavaScript
- VSCode
- Git

## Code

- **Gameboard**: creates and stores gameboard array
- **createPlayer**: creates player object with name, symbol and score
- **checkBoard**: Module pattern with functions that check for ties, row, column or diagonal matches
- **gameState**: Checks board for state of game (win or tie)
- **startGame**: Starts game and stores current players names and scores
- **playRound**: Plays a round of the game, checking for a win each round
- **gameController**: Control that renders board and starts the game
- **renderDom**: Object that handles all DOM logic
- **resetGame**: Function that resets game after round ends
