var Translate = function(translations) {
  this.translations = translations || {};
};

Translate.prototype.pattern   = /%\{(.+?)\}/g;
Translate.prototype.separator = '.';

Translate.prototype.lookup = function(path, options) {
  var hash      = options || {};
  var separator = this.separator;

  var buff = path.split(separator).reduce(function(trans, key) {
    var match = trans[key];

    if (!match) {
      throw new Error('Unknown translation: ' + path + ', ' + key);
    } else {
      return trans[key];
    }
  }, this.translations);

  return buff.replace(this.pattern, function(match, capture) {
    return hash[capture];
  });
}

module.exports = Translate;
