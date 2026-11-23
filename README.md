# اردو urdu-toolkit

**Urdu for developers, in one zero-dependency package.**
Roman Urdu → Urdu converter · numbers and amounts in Urdu words · Urdu digits · Urdu and Hijri dates · Urdu text cleanup · Urdu AI prompts library.

> Urdu is spoken by more than 230 million people, but there are very few open-source tools for it. This package fills that gap.

[![Tests](https://github.com/mubasher1111/urdu-toolkit/actions/workflows/test.yml/badge.svg)](https://github.com/mubasher1111/urdu-toolkit/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/urdu-toolkit)](https://www.npmjs.com/package/urdu-toolkit)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

📖 **[Read the full guide](https://zexcart.site/urdu-toolkit/)** · 🧮 **[Try it online](https://zexcart.site/urdu-toolkit/#urdu-tools)** · 🤖 **[Urdu AI prompts](prompts/README.md)**

---

```js
romanToUrdu('aap ka order kal tak pohanch jayega');
// 'آپ کا آرڈر کل تک پوہنچ جائے گا'

amountToUrduWords(150250.5);
// 'ایک لاکھ پچاس ہزار دو سو پچاس روپے اور پچاس پیسے'

formatUrduDate(new Date());      // 'منگل، ۲۴ نومبر ۲۰۲۶'
formatHijriDate(new Date());     // '۱۴ جمادی الثانی ۱۴۴۸ ہجری'
toUrduDigits('Order #2026');     // 'Order #۲۰۲۶'
```

## Features

| Module | What it does |
|---|---|
| **Roman Urdu → Urdu** | Converts "aap kaise hain?" to "آپ کیسے ہیں؟" using a dictionary of 600+ spellings of 350+ common words, plus phonetic rules. Handles the future tense ("milega" → ملے گا) and Urdu punctuation |
| **Numbers in words** | All 100 irregular Urdu numbers (ایک to ننانوے), with سو، ہزار، لاکھ، کروڑ، ارب، کھرب |
| **Amounts in words** | Cheque and invoice style: "پچیس لاکھ روپے صرف" |
| **Digits** | `2026` ↔ `۲۰۲۶`. Also reads Arabic digits (٢٠٢٦) and parses Urdu numbers |
| **Dates** | Urdu month and weekday names, plus the Islamic (Hijri) date with Urdu month names |
| **Text cleanup** | Turns Arabic ي/ك into Urdu ی/ک, removes aerab and tatweel, detects Urdu text, counts words |
| **AI prompts** | [16 tested prompts](prompts/README.md) for using Claude, ChatGPT and Gemini in Urdu |

✅ Zero dependencies · ✅ Node.js, browsers, React, Next.js · ✅ TypeScript types · ✅ Fully tested

## Install

```bash
npm install urdu-toolkit
```

Or from a CDN, with nothing to install:

```html
<script type="module">
  import { romanToUrdu } from 'https://cdn.jsdelivr.net/npm/urdu-toolkit/+esm';
  document.body.dir = 'rtl';
  document.body.textContent = romanToUrdu('khush aamdeed');
</script>
```

---

## API

### Roman Urdu → Urdu

```js
import { romanToUrdu } from 'urdu-toolkit';

romanToUrdu('Assalam o alaikum bhai, order kab tak milega?');
// 'السلام و علیکم بھائی، آرڈر کب تک ملے گا؟'

// Add your own words (brand names, people, products)
romanToUrdu('zexcart zabardast hai', {
  dictionary: { zexcart: 'زیکس کارٹ', zabardast: 'زبردست' },
});
// 'زیکس کارٹ زبردست ہے'

romanToUrdu('kya?', { punctuation: false }); // 'کیا?'
```

**How it works:** each word is first looked up in a dictionary of common Roman Urdu spellings ("kaise", "kese", "kesy" → کیسے). Unknown words are converted with phonetic rules.

> ⚠️ **Rule-based output is a best guess.** Roman Urdu does not show which Urdu letter is meant. "s" can be س، ص or ث, and "z" can be ز، ذ، ض or ظ. Common words are always right; rare words may need a fix. Use the `dictionary` option for words you use often, and please [contribute missing words](CONTRIBUTING.md).

### Numbers and amounts

```js
numberToUrduWords(49);           // 'انچاس'
numberToUrduWords(123456789);    // 'بارہ کروڑ چونتیس لاکھ چھپن ہزار سات سو نواسی'
amountToUrduWords(1);            // 'ایک روپیہ'
amountToUrduWords(2500000, { only: true }); // 'پچیس لاکھ روپے صرف'
formatUrduNumber(1500000);       // '۱۵,۰۰,۰۰۰'
```

### Digits

```js
toUrduDigits('Call 0300-1234567');  // 'Call ۰۳۰۰-۱۲۳۴۵۶۷'
toEnglishDigits('۲۰۲۶');            // '2026'
parseUrduNumber('۱۵,۰۰,۰۰۰');       // 1500000
```

### Dates

```js
formatUrduDate(new Date(2026, 10, 24));                        // 'منگل، ۲۴ نومبر ۲۰۲۶'
formatUrduDate(date, { weekday: false, digits: 'english' });   // '24 نومبر 2026'

getHijriDate(new Date(2026, 1, 18));
// { day: 1, month: 9, monthName: 'رمضان', year: 1447 }
formatHijriDate(new Date(2026, 1, 18));                        // '۱ رمضان ۱۴۴۷ ہجری'
```

> The Hijri date uses the Umm al-Qura calendar. Pakistan follows local moon sighting (Ruet-e-Hilal), so the official date can differ by one day.

### Text

```js
normalizeUrdu('كيا حال ہے');      // Arabic ك/ي → Urdu ک/ی: 'کیا حال ہے'
removeDiacritics('مُحَمَّد');       // 'محمد'
isUrdu('آپ کیسے ہیں');            // true
countUrduWords('آپ کیسے ہیں؟');   // 3
toUrduPunctuation('theek hai?');  // 'theek hai؟'
```

`normalizeUrdu` is useful before saving or searching text. The same word can be typed with Arabic or Urdu letters, which look identical on screen but don't match in a database search.

---

## Urdu AI prompts library

The [prompts folder](prompts/README.md) has 16 ready-to-use prompts for Claude, ChatGPT and Gemini: WhatsApp replies to customers, complaints, product descriptions, translations, formal applications (darkhwast), study help, budgets and more. There are also tips for writing your own Urdu prompts.

## Use cases

- **Chat and support apps:** let users type Roman Urdu and show it in Urdu script
- **Invoices and cheques:** amount in Urdu words
- **News, religious and school apps:** Urdu and Hijri dates
- **Search:** normalize Urdu text so "کیا" typed with Arabic letters still matches
- **Forms:** accept numbers typed with Urdu digits

## Roadmap

- [ ] Bigger Roman Urdu dictionary (community help welcome!)
- [ ] Urdu → Roman Urdu
- [ ] Ordinal numbers (پہلا، دوسرا، تیسرا)
- [ ] Time in Urdu ("ساڑھے تین بجے")
- [ ] Python version

## Contributing

The most useful contribution is **Roman Urdu words**: add the spellings people actually type to [`src/dictionary.js`](src/dictionary.js). See [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
git clone https://github.com/mubasher1111/urdu-toolkit.git
cd urdu-toolkit
npm test
```

## License

[MIT](LICENSE). Free for personal and commercial use.

Made by [ZexCart](https://zexcart.site). More free tools: [zexcart.site/dev-tools](https://zexcart.site/dev-tools/). See also [pakistan-toolkit](https://github.com/mubasher1111/pakistan-toolkit) for CNIC, IBAN and FBR tax.

If this helps you, please ⭐ **star the repo** so more Urdu developers can find it.
