// Numbers and amounts in Urdu words, using the South Asian system
// (سو، ہزار، لاکھ، کروڑ، ارب، کھرب).
// Urdu numbers from 1 to 99 are irregular, so each one is listed.

import { toUrduDigits } from './digits.js';

export const URDU_NUMBERS = [
  'صفر', 'ایک', 'دو', 'تین', 'چار', 'پانچ', 'چھ', 'سات', 'آٹھ', 'نو',
  'دس', 'گیارہ', 'بارہ', 'تیرہ', 'چودہ', 'پندرہ', 'سولہ', 'سترہ', 'اٹھارہ', 'انیس',
  'بیس', 'اکیس', 'بائیس', 'تئیس', 'چوبیس', 'پچیس', 'چھبیس', 'ستائیس', 'اٹھائیس', 'انتیس',
  'تیس', 'اکتیس', 'بتیس', 'تینتیس', 'چونتیس', 'پینتیس', 'چھتیس', 'سینتیس', 'اڑتیس', 'انتالیس',
  'چالیس', 'اکتالیس', 'بیالیس', 'تینتالیس', 'چوالیس', 'پینتالیس', 'چھیالیس', 'سینتالیس', 'اڑتالیس', 'انچاس',
  'پچاس', 'اکیاون', 'باون', 'ترپن', 'چوون', 'پچپن', 'چھپن', 'ستاون', 'اٹھاون', 'انسٹھ',
  'ساٹھ', 'اکسٹھ', 'باسٹھ', 'تریسٹھ', 'چونسٹھ', 'پینسٹھ', 'چھیاسٹھ', 'سڑسٹھ', 'اڑسٹھ', 'انہتر',
  'ستر', 'اکہتر', 'بہتر', 'تہتر', 'چوہتر', 'پچہتر', 'چھہتر', 'ستتر', 'اٹھہتر', 'اناسی',
  'اسی', 'اکیاسی', 'بیاسی', 'تراسی', 'چوراسی', 'پچاسی', 'چھیاسی', 'ستاسی', 'اٹھاسی', 'نواسی',
  'نوے', 'اکانوے', 'بانوے', 'ترانوے', 'چورانوے', 'پچانوے', 'چھیانوے', 'ستانوے', 'اٹھانوے', 'ننانوے',
];

const SCALES = [
  [1e11, 'کھرب'],
  [1e9, 'ارب'],
  [1e7, 'کروڑ'],
  [1e5, 'لاکھ'],
  [1e3, 'ہزار'],
];

function belowThousand(n) {
  const parts = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) parts.push(`${URDU_NUMBERS[h]} سو`);
  if (r) parts.push(URDU_NUMBERS[r]);
  return parts.join(' ');
}

/**
 * Converts a whole number to Urdu words.
 * 150250 → "ایک لاکھ پچاس ہزار دو سو پچاس"
 */
export function numberToUrduWords(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  let n = Math.floor(Math.abs(num));
  if (n > Number.MAX_SAFE_INTEGER) throw new RangeError('Number too large');
  if (n === 0) return URDU_NUMBERS[0];

  const parts = [];
  for (const [size, name] of SCALES) {
    const count = Math.floor(n / size);
    if (count) {
      // Above 99 کھرب, the count itself is spelled out recursively.
      const words = count < 100 ? URDU_NUMBERS[count] : numberToUrduWords(count);
      parts.push(`${words} ${name}`);
      n %= size;
    }
  }
  if (n) parts.push(belowThousand(n));
  return (num < 0 ? 'منفی ' : '') + parts.join(' ');
}

/**
 * Converts an amount to Urdu words for cheques and invoices.
 * 150250.5 → "ایک لاکھ پچاس ہزار دو سو پچاس روپے اور پچاس پیسے"
 * @param {number} value
 * @param {object} [options]
 * @param {boolean} [options.only=false]  Append "صرف" at the end
 */
export function amountToUrduWords(value, { only = false } = {}) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  const totalPaisa = Math.round(Math.abs(num) * 100);
  const rupees = Math.floor(totalPaisa / 100);
  const paisa = totalPaisa % 100;

  let words = `${numberToUrduWords(rupees)} ${rupees === 1 ? 'روپیہ' : 'روپے'}`;
  if (paisa) words += ` اور ${URDU_NUMBERS[paisa]} ${paisa === 1 ? 'پیسہ' : 'پیسے'}`;
  if (num < 0) words = `منفی ${words}`;
  return only ? `${words} صرف` : words;
}

/**
 * Formats a number with lakh/crore grouping and Urdu digits:
 * 1500000 → "۱۵,۰۰,۰۰۰"
 */
export function formatUrduNumber(value, { digits = 'urdu' } = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const [int, dec] = Math.abs(n).toString().split('.');
  let grouped = int;
  if (int.length > 3) {
    grouped = `${int.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${int.slice(-3)}`;
  }
  const out = `${n < 0 ? '-' : ''}${grouped}${dec ? '.' + dec : ''}`;
  return digits === 'urdu' ? toUrduDigits(out) : out;
}
