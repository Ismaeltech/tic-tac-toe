'use strict'
const store = require('../store.js')

const onNewGameSuccess = function (data) {
  $('#message').html('Started New Game! X Goes First')
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

const onGameRecordSuccess = function (data) {
  $('.game-total').html(data.games.length)
}

const onGameRecordFailure = function (data) {
  $('.game-total').html('Could not retrieve total games. Please try again')
}
module.exports = {
  onNewGameSuccess,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onGameRecordSuccess,
  onGameRecordFailure
}
