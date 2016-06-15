'use strict'

const Promise = require('bluebird')

function receiveMessage(message) {
  return Promise.resolve({})
}

module.exports.respond = function(event) {
  return receiveMessage(event.message)
}
