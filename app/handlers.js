'use strict';
module.exports = function(deps) {
  var sendMessage = deps.sendMessage;

  return {
    // Handler for post messages takes a request and a response object.
    handleMessagePost: function(req, res) {
      var messagingEvents = req.body.entry[0].messaging;
      for (var i = 0; i < messagingEvents.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender;
        var unicornTest = /fuck/;
        var salutationTest = /hi/;

        if (event.message && !event.message.is_echo && event.message.text) {
          var text = event.message.text;
          if (salutationTest.test(text)) {
            openConvo(sender);
            continue;
          } else if (text === 'Basim') {
            happyBirthdayBasim(sender);
            continue;
          } else if (unicornTest.test(text)) {
            rainbowUnicorn(sender);
            continue;
          }
          sendTextMessage(sender, text.substring(0, 200));
        }
      }
      res.sendStatus(200);
    }
  };

  function sendTextMessage(sender, text) {
    sendMessage(sender, { text: text });
  }

  function openConvo(sender) {
    var openingLines = ['hey', 'hello', 'how are you?', 'hi'];
    var chooseOpeningLine = openingLines[Math.floor(Math.random() * openingLines.length)];

    sendMessage(sender, { text: chooseOpeningLine });
  }

  function happyBirthdayBasim(sender) {
    var messageData = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': 'http://i.giphy.com/26tPd6sq9pSCwrlCg.gif'
        }
      }
    };

    sendMessage(sender, messageData);
  }

  function rainbowUnicorn(sender) {
    var messageData = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': 'http://i.imgur.com/soPydKo.gif'
        }
      }
    };

    sendMessage(sender, messageData);
  }
};
