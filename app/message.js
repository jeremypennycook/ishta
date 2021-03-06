'use strict';
module.exports = function(deps) {
  var request = deps.request;
  var fbToken = deps.fbToken;

  return {
    send: function(recipient, messageData) {
      var requestOptions = {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { 'access_token': fbToken },
        method: 'POST',
        json: {
          recipient: recipient,
          message: messageData
        }
      };

      request(requestOptions, function(error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  };
};
