# Contributing

Shukriya for helping make Urdu better on the internet!

## Easiest contribution: Roman Urdu words

Open [`src/dictionary.js`](src/dictionary.js) and add words in this format:

```js
'اردو لفظ': 'spelling1 spelling2 spelling3',
```

List every spelling people actually type. For example, `'کیسے': 'kaise kese kaisay kesy'`. If the word is already there, just add the missing spelling to its list.

Please check the Urdu spelling in a good dictionary (for example [urduencyclopedia.org](https://urduencyclopedia.org) or the Urdu Lughat by the Urdu Dictionary Board).

## Prompts

Add a prompt to [`prompts/README.md`](prompts/README.md) if you have tested it with at least one AI assistant and it gives good Urdu output.

## Code

```bash
npm test
```

- Keep the package **zero-dependency**.
- Add a test for every new function or fix.
- If you change a public function, update `index.d.ts` and the README.
- Write Urdu characters in **code** as `\u` escapes when a character could be confused with an Arabic look-alike (ی/ي, ک/ك).
