'use strict'
const store = require('./../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('form').trigger('reset')
}

const onSignUpSuccess = responseData => {
  successMessage('Signed up successfully!')
  $('#message').css('color', 'green')
  $('#sign-up').addClass('hide')
}

const onSignUpFailure = () => {
  failureMessage('Sign up failed')
  $('#message').css('color', 'red')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  $('#start-game').show()
  $('.box').show()
  $('#get').show()

  successMessage('Signed in successfully')
  $('#message').css('color', 'green')
  $('#sign-up').addClass('hide')
  $('#sign-in').addClass('hide')
}

const onSignInFailure = function () {
  failureMessage('Sign in failed')
  $('#message').css('color', 'red')
}

const onChangePasswordSuccess = function () {
  successMessage('Changed password successfully!')
  $('#message').css('color', 'green')
  $('#message').addClass('hide')
}

const onChangePasswordFailure = function () {
  failureMessage('change password failed')
  $('#message').css('color', 'red')
}

const onSignOutSuccess = responseData => {
  successMessage('Signed out successfully!')
  $('#message').css('color', 'green')
  $('#sign-up').addClass('hide')
  $('#sign-in').addClass('hide')
}

const onSignOutFailure = function () {
  failureMessage('Sign out failed')
  $('#message').css('color', 'red')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
