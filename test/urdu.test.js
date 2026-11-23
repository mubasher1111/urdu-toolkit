import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  numberToUrduWords, amountToUrduWords, formatUrduNumber, URDU_NUMBERS,
  toUrduDigits, toEnglishDigits, parseUrduNumber,
  normalizeUrdu, removeDiacritics, hasUrdu, isUrdu, countUrduWords, toUrduPunctuation,
  formatUrduDate, formatHijriDate, getHijriDate,
  romanToUrdu, transliterateWord, isKnownRomanWord,
} from '../src/index.js';

test('numbers: table has 0-99 with no gaps or duplicates', () => {
  assert.equal(URDU_NUMBERS.length, 100);
  assert.equal(new Set(URDU_NUMBERS).size, 100);
  assert.ok(URDU_NUMBERS.every((w) => w && hasUrdu(w)));
});

test('numbers: words', () => {
  assert.equal(numberToUrduWords(0), 'صفر');
  assert.equal(numberToUrduWords(7), 'سات');
  assert.equal(numberToUrduWords(49), 'انچاس');
  assert.equal(numberToUrduWords(99), 'ننانوے');
  assert.equal(numberToUrduWords(100), 'ایک سو');
  assert.equal(numberToUrduWords(1000), 'ایک ہزار');
  assert.equal(numberToUrduWords(150250), 'ایک لاکھ پچاس ہزار دو سو پچاس');
  assert.equal(numberToUrduWords(123456789), 'بارہ کروڑ چونتیس لاکھ چھپن ہزار سات سو نواسی');
  assert.equal(numberToUrduWords(1_000_000_000), 'ایک ارب');
  assert.equal(numberToUrduWords(250_000_000_000), 'دو کھرب پچاس ارب');
  assert.equal(numberToUrduWords(-5), 'منفی پانچ');
  assert.equal(numberToUrduWords('abc'), null);
});

test('numbers: amounts', () => {
  assert.equal(amountToUrduWords(1), 'ایک روپیہ');
  assert.equal(amountToUrduWords(500), 'پانچ سو روپے');
  assert.equal(amountToUrduWords(150250.5), 'ایک لاکھ پچاس ہزار دو سو پچاس روپے اور پچاس پیسے');
  assert.equal(amountToUrduWords(2500000, { only: true }), 'پچیس لاکھ روپے صرف');
});

test('numbers: lakh/crore grouping', () => {
  assert.equal(formatUrduNumber(1500000), '۱۵,۰۰,۰۰۰');
  assert.equal(formatUrduNumber(123456789, { digits: 'english' }), '12,34,56,789');
  assert.equal(formatUrduNumber(999), '۹۹۹');
});

test('digits', () => {
  assert.equal(toUrduDigits('Order 2026'), 'Order ۲۰۲۶');
  assert.equal(toUrduDigits('٤٥٦'), '۴۵۶'); // Arabic-Indic -> Urdu
  assert.equal(toEnglishDigits('۲۰۲۶'), '2026');
  assert.equal(toEnglishDigits('٢٠٢٦'), '2026');
  assert.equal(parseUrduNumber('۱۵,۰۰,۰۰۰'), 1500000);
  assert.equal(parseUrduNumber('۳٫۵'), 3.5);
  assert.ok(Number.isNaN(parseUrduNumber('abc')));
  assert.equal(toUrduDigits(null), '');
});

test('text: normalize Arabic letters to Urdu', () => {
  const out = normalizeUrdu('كيا  حال'); // Arabic kaf + Arabic yeh
  assert.equal(out, 'کیا حال');
  assert.equal(normalizeUrdu('مـــحـمد'), 'محمد'); // tatweel
  assert.equal(normalizeUrdu('مُحَمَّد'), 'محمد');
  assert.equal(normalizeUrdu('مُحَمَّد', { diacritics: true }), 'مُحَمَّد');
});

test('text: diacritics, detection, counting, punctuation', () => {
  assert.equal(removeDiacritics('پاکِستان'), 'پاکستان');
  assert.equal(hasUrdu('hello دنیا'), true);
  assert.equal(hasUrdu('hello'), false);
  assert.equal(isUrdu('آپ کیسے ہیں'), true);
  assert.equal(isUrdu('hello world ہے'), false);
  assert.equal(countUrduWords('آپ کیسے ہیں؟ میں ٹھیک ہوں۔'), 6);
  assert.equal(countUrduWords(''), 0);
  assert.equal(toUrduPunctuation('kya haal hai? theek, shukriya.'), 'kya haal hai؟ theek، shukriya۔');
  assert.equal(toUrduPunctuation('price 3.5'), 'price 3.5');
});

test('dates: Gregorian in Urdu', () => {
  const d = new Date(2026, 10, 24); // 24 Nov 2026, a Tuesday
  assert.equal(formatUrduDate(d), 'منگل، ۲۴ نومبر ۲۰۲۶');
  assert.equal(formatUrduDate(d, { weekday: false, digits: 'english' }), '24 نومبر 2026');
  assert.equal(formatUrduDate(new Date(2026, 7, 14), { weekday: false }), '۱۴ اگست ۲۰۲۶');
  assert.throws(() => formatUrduDate('not a date'), TypeError);
});

test('dates: Hijri', () => {
  // 1 Ramadan 1447 AH (Umm al-Qura) = 18 February 2026
  const h = getHijriDate(new Date(2026, 1, 18));
  assert.deepEqual(h, { day: 1, month: 9, monthName: 'رمضان', year: 1447 });
  assert.equal(formatHijriDate(new Date(2026, 1, 18)), '۱ رمضان ۱۴۴۷ ہجری');
  assert.equal(formatHijriDate(new Date(2026, 1, 18), { digits: 'english', suffix: false }), '1 رمضان 1447');
});

test('roman: dictionary sentences', () => {
  assert.equal(romanToUrdu('aap kaise hain?'), 'آپ کیسے ہیں؟');
  assert.equal(romanToUrdu('mujhe ye samajh nahi aa raha'), 'مجھے یہ سمجھ نہیں آ رہا');
  assert.equal(romanToUrdu('Assalam o alaikum bhai, order kab tak milega?'), 'السلام و علیکم بھائی، آرڈر کب تک ملے گا؟');
  assert.equal(romanToUrdu('mera naam Ali hai aur main Lahore se hoon.'), 'میرا نام علی ہے اور میں لاہور سے ہوں۔');
});

test('roman: future tense and rules', () => {
  assert.equal(romanToUrdu('karega karenge dekhega jayegi batayega'), 'کرے گا کریں گے دیکھے گا جائے گی بتائے گا');
  assert.equal(transliterateWord('kamra'), 'کمرا');
  assert.equal(transliterateWord('behtar'), 'بہتر');
  assert.equal(transliterateWord('insaan'), 'انسان');
  assert.equal(transliterateWord('khush'), 'خش');
});

test('roman: options', () => {
  assert.equal(romanToUrdu('zexcart zabardast', { dictionary: { zexcart: 'زیکس کارٹ', zabardast: 'زبردست' } }), 'زیکس کارٹ زبردست');
  assert.equal(romanToUrdu('kya?', { punctuation: false }), 'کیا?');
  assert.equal(romanToUrdu('price 3.5 rupay'), 'پرائس 3.5 روپے'.replace('پرائس', transliterateWord('price')));
  assert.equal(romanToUrdu('آپ already اردو'), 'آپ ' + transliterateWord('already') + ' اردو');
  assert.equal(isKnownRomanWord('Kaise'), true);
  assert.equal(isKnownRomanWord('qwerty'), false);
});
