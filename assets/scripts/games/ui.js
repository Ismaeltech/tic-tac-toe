'use strict'
const store = require('../store.js')

const onNewGameSuccess = function (data) {
  $('#message').html('Started New Game')
  $('#message').addClass('success-message')
  $('#message').removeClass('error-message')
  store.game = data.game
}

const onUpdateGameSuccess = function (data) {
  $('#message').html('Started New Game')
  $('#message').addClass('success-message')
  $('#message').removeClass('error-message')
  store.game = data.game
}

const onUpdateGameFailure = function (data) {
  $('#message').html('Something went Wrong, please try again')
  $('#message').removeClass('success-message')
  $('#message').addClass('error-message')
  // store.game = data.game
}

module.exports = {
  onNewGameSuccess,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
