const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const switchPlayer = function () {
  if (store.currentPlayer === 'X') {
    $('#game-notification').text('Player Os Turn')
    store.currentPlayer = 'O'
  } else if (store.currentPlayer === 'O') {
    $('#game-notification').text('Player Xs Turn')
    store.currentPlayer = 'X'
  }
}

let newGameStarted = false
const boardClick = function (event) {
  if (!newGameStarted) {
    return
  }
  // if winner or board is full, do not allow anymore clicks.
  if ($(event.target).text() === '' && store.winner === false) {
    $(event.target).text(store.currentPlayer)

    api.updateGame(store.currentPlayer, event.target.id, gameOver)
      // if updating game is successful
      .then((response) => {
        // switch player
        switchPlayer()
        // save the game board from the API to store
        ui.onUpdateGameSuccess(response)
        // check for the winner
        findWinner()
      })
      .catch(ui.onUpdateGameFailure)
    store.game.cells[event.target.id] = store.currentPlayer
  }
}

const onNewGame = function (event) {
  event.preventDefault()
  newGameStarted = true
  store.currentPlayer = 'X'
  store.winner = false
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
  $('.box').html('')
}

const onGameRecords = function (event) {
  event.preventDefault()
  api.getGame()
    .then(ui.onGameRecordSuccess)
    .catch(ui.onGameRecordFailure)
}

// to check winning combinations
const findWinner = function (gameboard) {
  if ((store.game.cells[0] === 'X' && store.game.cells[1] === 'X' && store.game.cells[2] === 'X') ||
        (store.game.cells[3] === 'X' && store.game.cells[4] === 'X' && store.game.cells[5] === 'X') ||
        (store.game.cells[6] === 'X' && store.game.cells[7] === 'X' && store.game.cells[8] === 'X') ||
        (store.game.cells[0] === 'X' && store.game.cells[3] === 'X' && store.game.cells[6] === 'X') ||
        (store.game.cells[1] === 'X' && store.game.cells[4] === 'X' && store.game.cells[7] === 'X') ||
        (store.game.cells[2] === 'X' && store.game.cells[5] === 'X' && store.game.cells[8] === 'X') ||
        (store.game.cells[0] === 'X' && store.game.cells[4] === 'X' && store.game.cells[8] === 'X') ||
        (store.game.cells[2] === 'X' && store.game.cells[4] === 'X' && store.game.cells[6] === 'X')) {
    store.winner = true
    store.message = 'Player X Wins!'
  } else if ((store.game.cells[0] === 'O' && store.game.cells[1] === 'O' && store.game.cells[2] === 'O') ||
        (store.game.cells[3] === 'O' && store.game.cells[4] === 'O' && store.game.cells[5] === 'O') ||
        (store.game.cells[6] === 'O' && store.game.cells[7] === 'O' && store.game.cells[8] === 'O') ||
        (store.game.cells[0] === 'O' && store.game.cells[3] === 'O' && store.game.cells[6] === 'O') ||
        (store.game.cells[1] === 'O' && store.game.cells[4] === 'O' && store.game.cells[7] === 'O') ||
        (store.game.cells[2] === 'O' && store.game.cells[5] === 'O' && store.game.cells[8] === 'O') ||
        (store.game.cells[0] === 'O' && store.game.cells[4] === 'O' && store.game.cells[8] === 'O') ||
        (store.game.cells[2] === 'O' && store.game.cells[4] === 'O' && store.game.cells[6] === 'O')) {
    store.winner = true
    store.message = 'Player O Wins!'
  } else if (store.game.cells[0] !== '' && store.game.cells[1] !== '' && store.game.cells[2] !== '' &&
        store.game.cells[3] !== '' && store.game.cells[4] !== '' && store.game.cells[5] !== '' &&
        store.game.cells[6] !== '' && store.game.cells[7] !== '' && store.game.cells[8] !== '') {
    store.winner = true
    store.message = 'Game Is Tied!'
  }
  if (store.winner === true) {
    $('#message').text(store.message)
    $('#game-notification').html('Game Over')
  }
}

const gameOver = function () {
  if (store.winner) {
    store.game.over = true
  } else {
    store.game.over = false
  }
  return gameOver
}

module.exports = {
  onNewGame,
  boardClick,
  switchPlayer,
  findWinner,
  onGameRecords
}
