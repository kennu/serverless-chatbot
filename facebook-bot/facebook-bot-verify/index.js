'use strict'

const Promise = require('bluebird')

function verify(verifyToken, challenge) {
  console.log('Verifying token', verifyToken, 'challenge', challenge)
  if (verifyToken == process.env.FACEBOOK_BOT_VERIFY_TOKEN) {
    return Promise.resolve({response:challenge})
  } else {
    return Promise.reject(new Error('400 Bad Token'))
  }
}

module.exports.respond = function(event) {
  return verify(event.verifyToken, event.challenge)
}
