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
var Translate = require("trnslt");

var translations = {
  en: {
    titles: {
      index: "Translation Rocks",
      about: "About Us"
    },
    greetings: {
      welcome: "Hello there %{name}!"
    }
  },
  de: {
    titles: {
      index: "Übersetzung ist Groß",
      about: "Über Uns"
    },
    greetings: {
      welcome: "Hallo es %{name}!"
    }
  }
};

var t = new Translate(translations);

t.lookup("en.titles.index"); // 'Translation Rocks'
t.lookup("en.greetings.welcome", (name: "Parker")); // 'Hello there Parker'
t.lookup("de.greetings.welcome", (name: "Parker")); // 'Hallo es Parker!'
t.lookup("en.whatever"); // Error('Unknown translation: en.whatever, whatever')
```

### Localize

You can also initialize Translate with a default language, and use the `localize` method to fallback on this localization if your requested one failed.

```javascript
const translations = {
  en: {
    coffee: {
      cold: "Iced Coffee",
      hot: "Hot Coffee",
      unique: "%{description} Coffee"
    }
  },
  ja: {
    coffee: {
      cold: "アイス コーヒー",
      unique: "%{description} コーヒー"
    }
  }
};

const t = new Translate(languageMap, "en");

t.localize("coffee.cold", "ja"); // 'アイス コーヒー'
t.localize("coffee.hot", "ja"); // 'Hot Coffee'
t.localize("coffee.unique", "ja", { description: "すごい" }); // 'すごい  コーヒー'
t.localize("coffee.cold", "en"); // 'Iced Coffee'
t.localize("coffee.unique", { description: "すごい" }); // Error('Must request a locale')
t.localize("coffee.cold"); // Error('Must request a locale')
t.localiez("tea.hot", "ja"); // Error('Unknown translation: ja.tea.hot, tea')
```

## License

See LICENSE.txt
