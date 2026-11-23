// Roman Urdu -> Urdu script.
//
// 1. Each word is looked up in a dictionary of common words (exact spelling).
// 2. Unknown words go through phonetic rules. Roman Urdu does not show which of
//    several Urdu letters is meant (t/ٹ, s/ص/ث, z/ذ/ض/ظ, h/ح...), so rule-based
//    output is a best guess. Pass your own words in `dictionary` to fix them.

import { ROMAN_DICTIONARY } from './dictionary.js';

// Longest patterns first. Two-letter aspirated consonants use do-chashmi he (ھ).
const CONSONANTS = [
  ['khh', 'کھ'], ['kh', 'خ'], ['gh', 'غ'], ['sh', 'ش'], ['chh', 'چھ'], ['ch', 'چ'],
  ['zh', 'ژ'], ['th', 'تھ'], ['ph', 'پھ'], ['bh', 'بھ'], ['dh', 'دھ'], ['jh', 'جھ'],
  ['rh', 'رھ'], ['tt', 'ٹ'], ['dd', 'ڈ'], ['rr', 'ڑ'],
  ['b', 'ب'], ['p', 'پ'], ['t', 'ت'], ['d', 'د'], ['r', 'ر'], ['z', 'ز'],
  ['s', 'س'], ['f', 'ف'], ['q', 'ق'], ['k', 'ک'], ['g', 'گ'], ['l', 'ل'],
  ['m', 'م'], ['n', 'ن'], ['w', 'و'], ['v', 'و'], ['h', 'ہ'], ['y', 'ی'],
  ['j', 'ج'], ['x', 'کس'], ['c', 'ک'],
];

const VOWELS = 'aeiou';

function vowelRun(word, i) {
  let j = i;
  while (j < word.length && VOWELS.includes(word[j])) j++;
  return word.slice(i, j);
}

function vowelToUrdu(run, position) {
  // position: 'start' | 'middle' | 'end'
  if (position === 'start') {
    if (run.startsWith('aa')) return 'آ';
    if (run === 'a' || run === 'u' || run === 'i') return 'ا';
    if (run === 'e' || run === 'ee' || run === 'ai') return 'ای';
    if (run === 'o' || run === 'oo' || run === 'au') return 'او';
    return 'ا';
  }
  if (position === 'end') {
    if (run === 'a' || run === 'aa') return 'ا';
    if (run === 'e' || run === 'ay' || run === 'ae') return 'ے';
    if (run === 'i' || run === 'ee' || run === 'ii') return 'ی';
    if (run === 'aai' || run === 'ai') return 'ائی'; // mehngai, safai, larai
    if (run === 'o' || run === 'u' || run === 'oo' || run === 'au') return 'و';
    if (run === 'ea' || run === 'ia') return 'یا';
    if (run === 'ao') return 'اؤ';
    return 'ے';
  }
  // middle
  if (run === 'a' || run === 'i' || run === 'u') return ''; // short vowels are not written
  if (run === 'aa') return 'ا';
  if (run === 'e' || run === 'ee' || run === 'ii' || run === 'ai' || run === 'ei') return 'ی';
  if (run === 'o' || run === 'oo' || run === 'au' || run === 'ou') return 'و';
  if (run === 'ia' || run === 'ya') return 'یا';
  if (run === 'ua') return 'وا';
  if (run === 'ae') return 'ئے';
  return 'ی';
}

const FUTURE = { ga: 'گا', gi: 'گی', ge: 'گے', gay: 'گے' };

/** Converts a single word with phonetic rules (dictionary words are not looked up here). */
export function transliterateWord(word) {
  const w = word.toLowerCase();

  // Future tense is written as two words: "milega" -> ملے گا, "karenge" -> کریں گے,
  // "jayegi" -> جائے گی. The stem is looked up in the dictionary first.
  const stem = (s) => ROMAN_DICTIONARY.get(s) ?? transliterateWord(s);
  let m = w.match(/^([a-z]*[^aeiouy])enge$/);
  if (m) return `${stem(m[1])}یں گے`;
  m = w.match(/^([a-z]+?)a+y?e(ga|gi|ge|gay)$/);
  if (m && !'aeiou'.includes(m[1].slice(-1))) return `${transliterateWord(m[1])}ائے ${FUTURE[m[2]]}`;
  m = w.match(/^([a-z]*[^aeiouy])e(ga|gi|ge|gay)$/);
  if (m && m[1].length > 1) return `${stem(m[1])}ے ${FUTURE[m[2]]}`;

  let out = '';
  let i = 0;
  while (i < w.length) {
    const ch = w[i];
    if (VOWELS.includes(ch)) {
      const run = vowelRun(w, i);
      const end = i + run.length >= w.length;
      const pos = i === 0 ? 'start' : end ? 'end' : 'middle';
      if (pos === 'middle' && run === 'e' && w[i + 1] === 'h') {
        // "eh" before a consonant is a short vowel: mehnat, pehla, behtar
        i += 1;
        continue;
      }
      out += vowelToUrdu(run, pos);
      i += run.length;
      // Final "n" after a long vowel is a nasal noon ghunna: "batain" -> بتیں
      if (!end && w[i] === 'n' && i === w.length - 1 && ((run.length > 1 && run !== 'aa') || 'eo'.includes(run))) {
        out += 'ں';
        i += 1;
      }
      continue;
    }
    const match = CONSONANTS.find(([roman]) => w.startsWith(roman, i));
    if (match) {
      out += match[1];
      i += match[0].length;
    } else {
      out += ch; // digits or other characters pass through
      i += 1;
    }
  }
  return out;
}

/**
 * Converts Roman Urdu text to Urdu script.
 *   romanToUrdu('aap kaise hain?') → 'آپ کیسے ہیں؟'
 * @param {string} text
 * @param {object} [options]
 * @param {Record<string,string>} [options.dictionary]  Extra words: { roman: 'اردو' }
 * @param {boolean} [options.punctuation=true]          Convert ? , . to ؟ ، ۔
 */
export function romanToUrdu(text, { dictionary = {}, punctuation = true } = {}) {
  const extra = new Map(Object.entries(dictionary).map(([k, v]) => [k.toLowerCase(), v]));
  const converted = String(text ?? '').replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, (word) => {
    const key = word.toLowerCase().replace(/'/g, '');
    return extra.get(key) ?? ROMAN_DICTIONARY.get(key) ?? transliterateWord(key);
  });
  if (!punctuation) return converted;
  return converted
    .replace(/\?/g, '؟')
    .replace(/,/g, '،')
    .replace(/\.(?!\d)/g, '۔');
}

/** Returns true if a Roman Urdu word is in the built-in dictionary. */
export function isKnownRomanWord(word) {
  return ROMAN_DICTIONARY.has(String(word).toLowerCase());
}
