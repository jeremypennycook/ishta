'use strict';

var should = require('should');
var sinon = require('sinon');

var handlersModule = require('../app/handlers');
var messageFixtures = require('./fixtures/example-messages');

describe('Handlers', function() {
  describe('#handleMessagePost', function() {
    it('echos unknown text messages back at the user', function() {
      var sendMessageSpy = sinon.spy();
      var sendStatusSpy = sinon.spy();

      var Handlers = handlersModule({
        sendMessage: sendMessageSpy,
        fbToken: '123abc'
      });

      Handlers.handleMessagePost({ body: messageFixtures.text }, { sendStatus: sendStatusSpy });

      should(sendStatusSpy.callCount).be.exactly(1);
      should(sendStatusSpy.firstCall.args[0]).be.exactly(200);

      should(sendMessageSpy.callCount).be.exactly(1);
      should(sendMessageSpy.firstCall.args).be.deepEqual([
        { id: '1114769218609918' },
        { text: 'hello' }
      ]);
    });

    it('responds to the message "fuck" with a unicorn', function() {
      var sendMessageSpy = sinon.spy();
      var sendStatusSpy = sinon.spy();

      var Handlers = handlersModule({
        sendMessage: sendMessageSpy,
        fbToken: '123abc'
      });

      Handlers.handleMessagePost({ body: messageFixtures.fuckText }, { sendStatus: sendStatusSpy });

      should(sendStatusSpy.callCount).be.exactly(1);
      should(sendStatusSpy.firstCall.args[0]).be.exactly(200);

      should(sendMessageSpy.callCount).be.exactly(1);
      should(sendMessageSpy.firstCall.args).be.deepEqual([
        { id: '1114769218609918' },
        {
          'attachment': {
            'type': 'image',
            'payload': {
              'url': 'http://i.imgur.com/soPydKo.gif'
            }
          }
        }
      ]);
    });

    it('Doesn\'t respond to read, echo or delivery notices', function() {
      var sendMessageSpy = sinon.spy();
      var sendStatusSpy = sinon.spy();

      var Handlers = handlersModule({
        sendMessage: sendMessageSpy,
        fbToken: '123abc'
      });

      Handlers.handleMessagePost({ body: messageFixtures.readNotice }, { sendStatus: sendStatusSpy });
      Handlers.handleMessagePost({ body: messageFixtures.echo }, { sendStatus: sendStatusSpy });
      Handlers.handleMessagePost({ body: messageFixtures.deliveryNotice }, { sendStatus: sendStatusSpy });

      should(sendStatusSpy.callCount).be.exactly(3);
      should(sendStatusSpy.firstCall.args[0]).be.exactly(200);
      should(sendStatusSpy.secondCall.args[0]).be.exactly(200);
      should(sendStatusSpy.thirdCall.args[0]).be.exactly(200);

      should(sendMessageSpy.callCount).be.exactly(0);
    });
  });
});
