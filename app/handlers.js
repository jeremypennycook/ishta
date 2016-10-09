module.exports = function(deps) {
  var sendMessage = deps.sendMessage;
  var fbToken = deps.fbToken;

  return {
    // Handler for post messages takes a request and a response object.
    handleMessagePost: function(req, res) {
      messaging_events = req.body.entry[0].messaging
      for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender;
        var unicornTest = /fuck/;
        var salutationTest = /hi/;

        if (event.message && !event.message.is_echo && event.message.text) {
          text = event.message.text
          if (salutationTest.test(text)) {
            openConvo(sender)
            continue
          } else if (text === 'Basim') {
            happyBirthdayBasim(sender)
            continue
          } else if (unicornTest.test(text)) {
            rainbowUnicorn(sender)
            continue
          }
          sendTextMessage(sender, text.substring(0, 200))
        }
      }
      res.sendStatus(200)
    }
  };

  function sendTextMessage(sender, text) {
    sendMessage(sender, { text: text });
  };

  function openConvo(sender) {
    var openingLines = ["hey", "hello", "how are you?", "hi"]
    var chooseOpeningLine = openingLines[Math.floor(Math.random() * openingLines.length)]

    var messageData = { "text": chooseOpeningLine };

    sendMessage(sender, { text: chooseOpeningLine });
  }

  function happyBirthdayBasim(sender) {
    var messageData = {
      "attachment": {
        "type": "image",
        "payload": {
          "url":"http://i.giphy.com/26tPd6sq9pSCwrlCg.gif"
        }
      }
    };

    sendMessage(sender, messageData);
  };

  function rainbowUnicorn(sender) {
    var messageData = {
      "attachment": {
        "type": "image",
        "payload": {
          "url":"http://i.imgur.com/soPydKo.gif"
        }
      }
    };

    sendMessage(sender, messageData);
  }

  function sendGenericMessage(sender) {
    var messageData = {
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
              "url": "https://www.messenger.com",
              "title": "web url"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          }, {
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
    }

    sendMessage(sender, messageData);
  }
};
