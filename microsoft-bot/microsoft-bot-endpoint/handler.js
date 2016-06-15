'use strict'

// Require Logic
const action = require('./index')

// Lambda Handler
module.exports.handler = function(event, context) {
  return action.respond(event)
  .then(function (response) {
    return context.succeed(response)
  })
  .then(null, function (err) {
    return context.fail(err)
  })
}
