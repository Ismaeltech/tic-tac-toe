const store = require('../store.js')
const config = require('../config.js')

const newGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const getGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = function (currentPlayer, index) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data:
      {
        'game': {
          'cell': {
            'index': index,
            'value': currentPlayer
          },
          'over': false
        }
      }
  })
}

module.exports = {
  updateGame,
  getGame,
  newGame
}
