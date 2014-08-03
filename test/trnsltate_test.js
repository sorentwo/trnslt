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

    it('uses options for replacement', function() {
      t.translations = { 'simple': '%{val}' };

      expect(t.lookup('simple', { val: 'trnslt' })).to.eq('trnslt');
    });

    it('throws an unknown key error', function() {
      fn = function() { t.lookup('simple.path') };

      expect(fn).to.throw(/unknown translation/i);
    });
  });
});
