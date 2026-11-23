// Urdu text helpers: normalization, diacritics, detection and counting.
// All Unicode characters are written as \u escapes so the source is unambiguous.

// Arabic code points that are often typed instead of their Urdu forms
// (on Arabic keyboards, or in text copied from Arabic sources).
const NORMALIZE_MAP = {
  'ي': 'ی', // Arabic yeh            -> Urdu yeh
  'ى': 'ی', // alef maksura          -> Urdu yeh
  'ك': 'ک', // Arabic kaf            -> keheh (Urdu kaf)
  'ۀ': 'ۂ', // heh with yeh above    -> heh goal with hamza above
};
const NORMALIZE_CHARS = /[يىكۀ]/g;

// Zabar, zer, pesh, tanween, shadd, sukun, khari zabar and Quranic marks.
// U+0654 (hamza above) is kept because it is part of letters such as U+06C2.
const DIACRITICS = /[ً-ٕٓ-ٰٟۖ-ۭ]/g;
const TATWEEL = /ـ/g;
const ARABIC_SCRIPT = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const ARABIC_SCRIPT_G = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g;
const LATIN_G = /[A-Za-z]/g;
// Urdu full stop, comma, question mark, semicolon + common Latin punctuation.
const PUNCTUATION_G = /[۔،؟؛!?.,:;"'()[\]{}«»]/g;

/** Removes aerab (zabar, zer, pesh, shadd, etc.). */
export function removeDiacritics(input) {
  return String(input ?? '').replace(DIACRITICS, '');
}

/**
 * Cleans Urdu text so the same word is always stored and searched the same way:
 * Arabic yeh/kaf become Urdu yeh/kaf, tatweel is removed, spaces are collapsed,
 * and (by default) diacritics are removed.
 * @param {string} input
 * @param {object} [options]
 * @param {boolean} [options.diacritics=false]  true = keep diacritics
 */
export function normalizeUrdu(input, { diacritics = false } = {}) {
  let s = String(input ?? '').normalize('NFC');
  s = s.replace(NORMALIZE_CHARS, (c) => NORMALIZE_MAP[c]);
  s = s.replace(TATWEEL, '');
  if (!diacritics) s = removeDiacritics(s);
  return s.replace(/[ \t ]+/g, ' ').trim();
}

/** Returns true if the text contains any Urdu/Arabic-script letters. */
export function hasUrdu(input) {
  return ARABIC_SCRIPT.test(String(input ?? ''));
}

/** Returns true if the text is mostly Urdu script (more Urdu letters than Latin ones). */
export function isUrdu(input) {
  const s = String(input ?? '');
  const urdu = (s.match(ARABIC_SCRIPT_G) || []).length;
  const latin = (s.match(LATIN_G) || []).length;
  return urdu > 0 && urdu > latin;
}

/** Counts words in Urdu (or mixed) text. */
export function countUrduWords(input) {
  const s = normalizeUrdu(input).replace(PUNCTUATION_G, ' ').trim();
  return s ? s.split(/\s+/).length : 0;
}

/** Converts English punctuation to Urdu: ? , ; and sentence-ending full stops. */
export function toUrduPunctuation(input) {
  return String(input ?? '')
    .replace(/\?/g, '؟')
    .replace(/,/g, '،')
    .replace(/;/g, '؛')
    .replace(/\.(?!\d)/g, '۔');
}
