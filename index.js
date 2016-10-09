// Global vars
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var util = require('util');

var token = process.env.FB_TOKEN;
var verifyToken = process.env.FB_VERIFY_TOKEN;

var Message = require('./app/handlers')({
  request: request,
  fbToken: token
});

var Handlers = require('./app/handlers')({
  sendMessage: Message.send,
  fbToken: token
});

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('Hello world, I am a chat bot from the future');
});

// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});

// Facebook verification
app.get('/webhook', function (req, res) {
  console.log("*************** REQUEST BODY GET *******************");
  console.log(util.inspect(req.body, {
    showHidden: true,
    depth: null
  }));
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

  if (req.query['hub.verify_token'] === verifyToken) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

// old webhook
app.post('/webhook', function (req, res) {
  console.log("*************** REQUEST BODY POST ******************");
  console.log(util.inspect(req.body, {
    showHidden: true,
    depth: null
  }));
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

  Handlers.handleMessagePost(req, res);
});
