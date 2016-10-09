// Global vars
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var util = require('util')
var app = express()
var token = process.env.FB_TOKEN
var verifyToken = process.env.FB_VERIFY_TOKEN

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot from the future')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
}) 

// Facebook verification
app.get('/webhook', function (req, res) {
    console.log("*************** REQUEST BODY GET *******************")
    console.log(util.inspect(req.body, {
        showHidden: true,
        depth: null
    })) 
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

    if (req.query['hub.verify_token'] === verifyToken) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// old webhook
app.post('/webhook', function (req, res) {
    console.log("*************** REQUEST BODY POST ******************")
    console.log(util.inspect(req.body, {
        showHidden: true,
        depth: null
    })) 
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        var unicornTest = /fuck/
        var salutationTest = /hi/

        /* if (event.message.attachments[0].payload.coordinates.lat && event.message.attachments[0].payload.coordinates.long) {
            lat = event.message.attachments[0].payload.coordinates.lat
            lng = event.message.attachments[0].payload.coordinates.long
            reverseLookup(sender, lat, lng)
            continue
        } else */ if (event.message && event.message.text) {
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
            // horriblePoke(sender, text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

/*
// new webhook
app.post('/webhook', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        text = event.message.text
        console.log("**************************************************")
        console.log(event)
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        if (event.message && event.message.text) {
            textPreprocessing(sender, text)
        }
    }
    res.sendStatus(200)
})

function textPreprocessing(sender, text) {
    lowerText = text.toLowerCase()
    var unicornTest = /fuck/
    if (lowerText == 'Generic') {
        sendGenericMessage(sender)
    } else if (unicornTest.test(lowerText)) {
        rainbowUnicorn(sender)
    }
    sendTextMessage(sender, text.substring(0, 200))
}  */


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

var horribleTimeout;

function horriblePoke(sender, text) {
    if (horribleTimeout) {
        clearInterval(horribleTimeout)
    }
    horribleTimeout = setInterval(sendTextMessage.bind(this, sender, text), 5 * 1000)
}

function openConvo(sender) {
    openingLines = ["hey", "hello", "how are you?", "hi"]
    var chooseOpeningLine = openingLines[Math.floor(Math.random() * openingLines.length)]
    messageData = {
        "text":chooseOpeningLine
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function happyBirthdayBasim(sender) {
    messageData = {
    	"attachment": {
            "type": "image",
            "payload": {
                "url":"http://i.giphy.com/26tPd6sq9pSCwrlCg.gif"
            }
        }
    }
	request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function rainbowUnicorn(sender) {
    messageData = {
        "attachment": {
            "type": "image",
            "payload": {
                "url":"http://i.imgur.com/soPydKo.gif"
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    messageData = {
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
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}