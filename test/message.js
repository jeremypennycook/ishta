var should = require('should');
var sinon = require('sinon');

var messageModule = require('../app/message');

describe('Message', function() {
  describe('#send', function() {
    it('sends post messages to the correct url', function() {
      var requestSpy = sinon.stub().returns(Promise.resolve(null));
      var Message = messageModule({
        request: requestSpy,
        fbToken: '123abc'
      });

      Message.send({ id: 1 }, { text: "Hi" });

      should(requestSpy.callCount).be.exactly(1);
      should(requestSpy.firstCall.args[0]).have.propertyByPath('method').eql('POST');
      should(requestSpy.firstCall.args[0]).have.propertyByPath('url')
        .eql('https://graph.facebook.com/v2.6/me/messages');
    });

    it('uses the provided token', function() {
      var requestSpy = sinon.stub().returns(Promise.resolve(null));
      var Message = messageModule({
        request: requestSpy,
        fbToken: '123abc'
      });

      Message.send({ id: 1 }, { text: "Hi" });

      should(requestSpy.callCount).be.exactly(1);
      should(requestSpy.firstCall.args[0]).have.propertyByPath('qs', 'access_token').eql('123abc');
    });

    it('sends the message body exactly', function() {
      var requestSpy = sinon.stub().returns(Promise.resolve(null));
      var Message = messageModule({
        request: requestSpy,
        fbToken: '123abc'
      });
      var messageBody = { text: "Hi", wat: 'floop' };

      Message.send({ id: 1 }, messageBody);

      should(requestSpy.callCount).be.exactly(1);
      should(requestSpy.firstCall.args[0]).have.propertyByPath('json', 'message').deepEqual(messageBody);
    });

    it('sends the recipient as provided', function() {
      var requestSpy = sinon.stub().returns(Promise.resolve(null));
      var Message = messageModule({
        request: requestSpy,
        fbToken: '123abc'
      });

      Message.send({ id: 2 }, { stuff: 'abc' });

      should(requestSpy.callCount).be.exactly(1);
      should(requestSpy.firstCall.args[0]).have.propertyByPath('json', 'recipient').deepEqual({ id: 2 });
    });
  });
});
