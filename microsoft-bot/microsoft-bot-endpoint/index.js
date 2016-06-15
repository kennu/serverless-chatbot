'use strict'

const Promise = require('bluebird')
const request = require('request-promise')
const AWS = require('aws-sdk')
const simpledb = new AWS.SimpleDB()
Promise.promisifyAll(simpledb)

/**
 * Create an immediate reply.
 */
function createReply(message) {
  return {
    from: message.to,
    to: message.from,
    text: 'well hello there',
    language: 'en',
  }
}

module.exports.respond = function(event) {
  console.log('EVENT:', JSON.stringify(event))
  const reply = createReply(event.message)
  return Promise.resolve(reply)
}
