var Translate = function(translations, defaultLocale) {
  this.translations = translations || {};
  this.defaultLocale = defaultLocale || "";
};

Translate.prototype.pattern = /%\{(.+?)\}/g;
Translate.prototype.separator = ".";

function translationWasNotFound(string) {
  return string === null || string === undefined;
}

function addDynamicContent(string, pattern, hash) {
  return string.replace(pattern, function(_, capture) {
    return hash[capture];
  });
}

Translate.prototype.lookup = function(path, options) {
  var hash = options || {};
  var separator = this.separator;

  var buff = path.split(separator).reduce(function(trans, key) {
    var match = trans[key];

    if (translationWasNotFound(match)) {
      throw new Error("Unknown translation: " + path + ", " + key);
    } else {
      return trans[key];
    }
  }, this.translations);

  return addDynamicContent(buff, this.pattern, hash);
};

Translate.prototype.localize = function(path, locale, options) {
  if (locale === null || !(typeof locale === "string")) {
    throw new Error("Must request a locale");
  }

  var requestedKey = `${locale}.${path}`;
  var fallbackKey = `${this.defaultLocale}.${path}`;
  var hash = options || {};
  var separator = this.separator;

  var localizedString = requestedKey.split(separator).reduce((trans, key) => {
    if (trans == null || trans == undefined) {
      return null;
    }
    return trans[key];
  }, this.translations);

  if (translationWasNotFound(localizedString)) {
    return this.lookup(fallbackKey, hash);
  }

  return addDynamicContent(localizedString, this.pattern, hash);
};

module.exports = Translate;
