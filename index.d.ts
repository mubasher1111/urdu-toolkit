// Type definitions for urdu-toolkit

// ---------- Numbers ----------
export const URDU_NUMBERS: readonly string[];
export function numberToUrduWords(value: number | string): string | null;
export function amountToUrduWords(value: number, options?: { only?: boolean }): string | null;
export function formatUrduNumber(value: number, options?: { digits?: 'urdu' | 'english' }): string | null;

// ---------- Digits ----------
export function toUrduDigits(input: string | number): string;
export function toEnglishDigits(input: string | number): string;
export function parseUrduNumber(input: string): number;

// ---------- Text ----------
export function normalizeUrdu(input: string, options?: { diacritics?: boolean }): string;
export function removeDiacritics(input: string): string;
export function hasUrdu(input: string): boolean;
export function isUrdu(input: string): boolean;
export function countUrduWords(input: string): number;
export function toUrduPunctuation(input: string): string;

// ---------- Dates ----------
export const URDU_MONTHS: readonly string[];
export const URDU_WEEKDAYS: readonly string[];
export const HIJRI_MONTHS: readonly string[];
export interface HijriDate { day: number; month: number; monthName: string; year: number; }
export function formatUrduDate(
  input?: Date | string | number,
  options?: { weekday?: boolean; digits?: 'urdu' | 'english' },
): string;
export function getHijriDate(input?: Date | string | number): HijriDate;
export function formatHijriDate(
  input?: Date | string | number,
  options?: { digits?: 'urdu' | 'english'; suffix?: boolean },
): string;

// ---------- Roman Urdu ----------
export function romanToUrdu(
  text: string,
  options?: { dictionary?: Record<string, string>; punctuation?: boolean },
): string;
export function transliterateWord(word: string): string;
export function isKnownRomanWord(word: string): boolean;
