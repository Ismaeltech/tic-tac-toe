const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const switchPlayer = function () {
  if (store.currentPlayer === 'X') {
    store.currentPlayer = 'O'
  } else if (store.currentPlayer === 'O') {
    store.currentPlayer = 'X'
  }
}
// when a user clicks a square an x or o should appear

const boardClick = function (event) {
  if ($(event.target).text() === '' && store.winner === false) {
    $(event.target).text(store.currentPlayer)
    // first update API with the current player and the spot they choose
    api.updateGame(store.currentPlayer, event.target.id)
      .then((response) => {
        switchPlayer()
        ui.onUpdateGameSuccess(response)
        findWinner()
      })
      .catch(ui.onUpdateGameFailure)
  }
}

const onNewGame = function (event) {
  store.currentPlayer = 'X'
  store.winner = false
  store.message = ''
  event.preventDefault()
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
}
// to check winning combinations
const findWinner = function (gameboard) {
  if ((gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X') ||
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
  }
}

module.exports = {
  onNewGame,
  boardClick,
  switchPlayer,
  findWinner
}
