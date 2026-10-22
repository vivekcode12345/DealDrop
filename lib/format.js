// Display-only money formatting.
//
// Stored product prices are inconsistent: `currency` may be an ISO code
// ("INR", "USD") or a symbol ("₹", "$"), and the amount may be a number or
// a numeric string. This module normalises all of that into one consistent
// display string without touching the stored data.
//
// The helper is pure and deterministic: the locale is always passed
// explicitly so the server and the client produce byte-identical output.

const CURRENCY_ALIASES = {
  "₹": "INR",
  rs: "INR",
  "rs.": "INR",
  r: "INR",
  inr: "INR",
  $: "USD",
  usd: "USD",
  "€": "EUR",
  eur: "EUR",
  "£": "GBP",
  gbp: "GBP",
};

// Locales used for grouping/symbol rendering. Always explicit so that the
// server render and the client hydration output match.
const LOCALE_BY_CURRENCY = {
  INR: "en-IN",
};

const DEFAULT_LOCALE = "en-US";

function isValidISOCode(code) {
  try {
    // Throws RangeError for codes Intl does not recognise.
    new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: code,
    }).format(1);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve any supported currency representation to an ISO 4217 code.
 * Returns null when the currency cannot be resolved.
 */
export function normalizeCurrency(currency) {
  if (currency === null || currency === undefined) return null;

  const raw = String(currency).trim();
  if (!raw) return null;

  const alias = CURRENCY_ALIASES[raw.toLowerCase()];
  if (alias) return alias;

  const code = raw.toUpperCase();
  if (/^[A-Z]{3}$/.test(code) && isValidISOCode(code)) return code;

  return null;
}

/**
 * Format an amount as money.
 *
 * @param {number|string} amount  Price value.
 * @param {string} [currency]     Currency code or symbol.
 * @returns {string}               Formatted price, e.g. "₹28,499" or "$203.18".
 */
export function formatMoney(amount, currency) {
  const numeric =
    typeof amount === "number" ? amount : parseFloat(String(amount ?? ""));

  const rawCurrency =
    currency === null || currency === undefined
      ? ""
      : String(currency).trim();

  if (!Number.isFinite(numeric)) {
    return rawCurrency ? `${rawCurrency} —` : "—";
  }

  const code = normalizeCurrency(rawCurrency);
  const isWhole = Number.isInteger(numeric);
  const fractionDigits = isWhole ? 0 : 2;

  // Fallback locale: infer from the raw currency string when it cannot be
  // resolved to an ISO code (e.g. an unknown symbol).
  const locale =
    (code && LOCALE_BY_CURRENCY[code]) ||
    (/[₹]|inr|^rs\.?$/i.test(rawCurrency) ? "en-IN" : DEFAULT_LOCALE);

  if (!code) {
    const grouped = new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(numeric);

    return rawCurrency ? `${rawCurrency} ${grouped}` : grouped;
  }

  // "symbol" (not "narrowSymbol"): narrowSymbol collapses CLP, CAD, AUD,
  // SGD, HKD, TWD and MXN all to a bare "$", which is ambiguous. "symbol"
  // keeps the familiar ₹/$/€/£ glyphs for the common currencies while
  // disambiguating the ones that share a symbol (CA$, A$, HK$, NT$, MX$).
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    currencyDisplay: "symbol",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(numeric);
}
