'use strict'
const store = require('./../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const onSignUpSuccess = responseData => {
  successMessage('Signed up successfully!')
  $('#message').css('color', 'green')
}

const onSignUpFailure = () => {
  failureMessage('Sign up failed')
  $('#message').css('color', 'red')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  successMessage('Signed in successfully')
  $('#message').css('color', 'green')
}

const onSignInFailure = function () {
  failureMessage('Sign in failed')
  $('#message').css('color', 'red')
}

const onChangePasswordSuccess = function () {
  successMessage('Changed password successfully!')
  $('#message').css('color', 'green')
}

const onChangePasswordFailure = function () {
  failureMessage('change password failed')
  $('#message').css('color', 'red')
}

const onSignOutSuccess = function () {
  successMessage('Signed out successfully!')
  $('#message').css('color', 'green')
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
