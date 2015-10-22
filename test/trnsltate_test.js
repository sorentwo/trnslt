var expect    = require('chai').expect;
var Translate = require('../trnslt');

describe('Translate', function() {
  var t;

  beforeEach(function() {
    t = new Translate();
  });

  describe('#lookup', function() {
    it('translates basic keys', function() {
      t.translations = { 'simple': 'hello!' };

      expect(t.lookup('simple')).to.eq('hello!');
    });

    it('translates namespaced keys', function() {
      t.translations = {
        'simple': {
          'hello': {
            'world': 'trnslt'
          }
        }
      };

      expect(t.lookup('simple.hello.world')).to.eq('trnslt');
    });

    it('performs replacements on the final value', function() {
      t.translations = { 'simple': { 'path': 'Hello %{name}, the %{thing}' }};

      expect(t.lookup('simple.path', { name: 'trnslt', thing: 'framework' }))
        .to.eq('Hello trnslt, the framework');
    });

    it('throws an unknown key error with missing keys', function() {
      fn = function() { t.lookup('simple.path') };

      expect(fn).to.throw(/unknown translation/i);
    });

    it('does not throw an error with empty string keys', function() {
      t.translations = {
        'blank': ''
      };

      fn = function() { t.lookup('blank') };

      expect(fn).not.to.throw(/unknown translation/i);
    });
  });
});
