// Urdu uses the Extended Arabic-Indic digits ۰۱۲۳۴۵۶۷۸۹ (U+06F0–U+06F9).
// Arabic text uses ٠١٢٣٤٥٦٧٨٩ (U+0660–U+0669), which look different for 4, 5, 6 and 7.

const URDU_ZERO = 0x06f0;
const ARABIC_ZERO = 0x0660;

/** "Order 2026" → "Order ۲۰۲۶" */
export function toUrduDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9٠-٩]/g, (d) => {
    const code = d.charCodeAt(0);
    const value = code >= ARABIC_ZERO ? code - ARABIC_ZERO : code - 48;
    return String.fromCharCode(URDU_ZERO + value);
  });
}

/** "۲۰۲۶" or "٢٠٢٦" → "2026" */
export function toEnglishDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[۰-۹٠-٩]/g, (d) => {
    const code = d.charCodeAt(0);
    return String(code >= URDU_ZERO ? code - URDU_ZERO : code - ARABIC_ZERO);
  });
}

/** Parses a number written with Urdu, Arabic or English digits. Returns NaN if invalid. */
export function parseUrduNumber(input) {
  const s = toEnglishDigits(input).replace(/[,،\s]/g, '').replace('٫', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
  return Number(s);
}
