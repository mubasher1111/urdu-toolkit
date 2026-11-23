// Dates in Urdu: Gregorian (عیسوی) and Islamic (ہجری) calendars.

import { toUrduDigits } from './digits.js';

export const URDU_MONTHS = [
  'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
  'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر',
];

/** Index 0 = Sunday, matching Date#getDay(). */
export const URDU_WEEKDAYS = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

export const HIJRI_MONTHS = [
  'محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی',
  'رجب', 'شعبان', 'رمضان', 'شوال', 'ذوالقعدہ', 'ذوالحجہ',
];

function toDate(input) {
  const d = input === undefined ? new Date() : input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) throw new TypeError('Invalid date');
  return d;
}

function digitsFn(digits) {
  return digits === 'english' ? (s) => String(s) : toUrduDigits;
}

/**
 * Formats a date in Urdu: "پیر، ۲۴ نومبر ۲۰۲۶"
 * Uses the date's local time zone.
 * @param {Date|string|number} [input]  Defaults to now
 * @param {object} [options]
 * @param {boolean} [options.weekday=true]
 * @param {'urdu'|'english'} [options.digits='urdu']
 */
export function formatUrduDate(input, { weekday = true, digits = 'urdu' } = {}) {
  const d = toDate(input);
  const fmt = digitsFn(digits);
  const body = `${fmt(d.getDate())} ${URDU_MONTHS[d.getMonth()]} ${fmt(d.getFullYear())}`;
  return weekday ? `${URDU_WEEKDAYS[d.getDay()]}، ${body}` : body;
}

/**
 * Returns the Islamic (Umm al-Qura) date parts for a Gregorian date.
 * Note: Pakistan follows local moon sighting, so the date announced by
 * the Ruet-e-Hilal committee can differ from this by a day.
 * @returns {{ day: number, month: number, monthName: string, year: number }}
 */
export function getHijriDate(input) {
  const d = toDate(input);
  const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
    day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).formatToParts(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())));
  const get = (type) => Number(parts.find((p) => p.type === type).value.replace(/\D/g, ''));
  const month = get('month');
  return { day: get('day'), month, monthName: HIJRI_MONTHS[month - 1], year: get('year') };
}

/**
 * Formats the Islamic date in Urdu: "۴ جمادی الثانی ۱۴۴۸ ہجری"
 * @param {Date|string|number} [input]
 * @param {object} [options]
 * @param {'urdu'|'english'} [options.digits='urdu']
 * @param {boolean} [options.suffix=true]  Append "ہجری"
 */
export function formatHijriDate(input, { digits = 'urdu', suffix = true } = {}) {
  const h = getHijriDate(input);
  const fmt = digitsFn(digits);
  return `${fmt(h.day)} ${h.monthName} ${fmt(h.year)}${suffix ? ' ہجری' : ''}`;
}
