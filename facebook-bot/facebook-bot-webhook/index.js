'use strict'

const Promise = require('bluebird')
const request = require('request-promise')

function sendGenericMessage(recipientId) {
  const messageData = {
    /*
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "First card",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        },{
          "title": "Second card",
          "subtitle": "Element #2 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
          "buttons": [{
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for second element in a generic bubble",
          }],
        }]
      }
    }
    */
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'Hi I\'m a bot! Do you like me?',
          buttons: [{
            type: 'postback',
            title: 'Yes',
            payload: 'like'
          }, {
            type: 'postback',
            title: 'No',
            payload: 'dislike'
          }]
        }]
      }
    }
  }
  return request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:process.env.FACEBOOK_BOT_PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id:recipientId},
      message: messageData,
    }
  })
}

function sendTextMessage(recipientId, text) {
  return request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:process.env.FACEBOOK_BOT_PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id:recipientId},
      message: {text:text}
    }
  })
}

function receivePostback(event) {
  if (event.postback.payload == 'like') {
    return sendTextMessage(event.sender.id, "^_^ I'm very happy to hear that!")
  } else {
    return sendTextMessage(event.sender.id, "Too bad :-(")
  }
}

function receiveMessage(event) {
  console.log('Processing event:', event)
  if (event.sender && event.sender.id && event.message && event.message.text) {
    // Handle message
    //return sendTextMessage(event.sender.id, 'Hi! Why do you say ' + event.message.text + '?')
    return sendGenericMessage(event.sender.id)
  }
}

function receiveMessages(entries) {
  let promise = Promise.resolve()
  entries.map(entry => {
    const messaging = entry.messaging || []
    messaging.map(event => {
      promise = promise.then(() => {
        if (event.postback) {
          return receivePostback(event)
        } else {
          return receiveMessage(event)
        }
      })
    })
  })
  return promise
  .then(() => {
    return {}
  })
  .then(null, (err) => {
    console.log('Error handling messages:', err)
    return {}
  })
}

module.exports.respond = function(event) {
  return receiveMessages(event.entry || [])
}
