var expect = require("chai").expect;
var Translate = require("../trnslt");

describe("Translate", function() {
  var t;

  const translations = {
    en: {
      coffee: {
        cold: "Iced Coffee",
        hot: "Hot Coffee",
        unique: "%{description} Coffee",
        beer: "Coffee %{type}"
      }
    },
    ja: {
      coffee: {
        cold: "アイス コーヒー",
        unique: "%{description} コーヒー"
      }
    }
  };

  beforeEach(function() {
    t = new Translate(translations, "en");
  });

  describe("#localize", function() {
    it("looks up based on provided locale code", function() {
      expect(t.localize("coffee.cold", "ja")).to.eq("アイス コーヒー");
      expect(t.localize("coffee.cold", "en")).to.eq("Iced Coffee");
    });

    it("falls back on default provided language if it does not find a match", function() {
      expect(t.localize("coffee.hot", "ja")).to.eq("Hot Coffee");
    });

    it("can support custom fields", function() {
      expect(
        t.localize("coffee.unique", "ja", { description: "すごい" })
      ).to.eq("すごい コーヒー");

      expect(t.localize("coffee.beer", "ja", { type: "Stout" })).to.eq(
        "Coffee Stout"
      );
    });

    it("throws an error if you do not specify a locale and pass custom fields", function() {
      fn = function() {
        t.localize("coffee.unique", { description: "すごい" });
      };

      expect(fn).to.throw(/Must request a locale/i);
    });

    it("throws error if you do not specify a locale", function() {
      fn = function() {
        t.localize("coffee.cold");
      };

      expect(fn).to.throw(/Must request a locale/i);
    });

    it("throws an unknown key error with missing keys", function() {
      fn = function() {
        t.localize("tea.hot", "ja");
      };

      expect(fn).to.throw(/unknown translation/i);
    });
  });
});
