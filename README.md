# Trnslt

An awful mangling of the word translate, but a useful utility for managing app
translations.

## Installation

Install via npm:

```bash
npm install trnslt --save
```

## Usage

The primary, maybe only, use case for `trnslt` is for in-app string translation.

```javascript
var Translate = require('trnslt');

var translations = {
  en: {
    titles: {
      index: 'Translation Rocks',
      about: 'About Us'
    },
    greetings: {
      welcome: 'Hello there %{name}!'
    }
  },
  de: {
    titles: {
      index: 'Übersetzung ist Groß',
      about: 'Über Uns'
    },
    greetings: {
      welcome: 'Hallo es %{name}!'
    }
  }
};

var t = new Translate(translations);

t.lookup('en.titles.index');                      // 'Translation Rocks'
t.lookup('en.greetings.welcome', name: 'Parker'); // 'Hello there Parker'
t.lookup('de.greetings.welcome', name: 'Parker'); // 'Hallo es Parker!'
t.lookup('en.whatever'); // Error('Unknown translation: en.whatever, whatever')
```

## License

See LICENSE.txt
