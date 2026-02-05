/**
 * UK Tax Rates - 2025/26 Tax Year
 * SINGLE SOURCE OF TRUTH - update each April
 *
 * Last updated: April 2025
 * Next review: April 2026
 */

export const TAX_YEAR = "2025/26" as const;
export const TAX_YEAR_START = "2025-04-06" as const;
export const TAX_YEAR_END = "2026-04-05" as const;

// ============================================================
// INCOME TAX
// ============================================================
export const PERSONAL_ALLOWANCE = 12_570;
export const PERSONAL_ALLOWANCE_TAPER_THRESHOLD = 100_000;
// £1 reduction for every £2 over 100k

export const INCOME_TAX_BANDS = [
  { name: "Basic Rate", from: 0, to: 37_700, rate: 0.2 },
  { name: "Higher Rate", from: 37_700, to: 125_140, rate: 0.4 },
  { name: "Additional Rate", from: 125_140, to: Infinity, rate: 0.45 },
] as const;

// ============================================================
// NATIONAL INSURANCE (Class 1 - employed/director)
// ============================================================
export const NI_PRIMARY_THRESHOLD = 12_570; // per year
export const NI_UPPER_EARNINGS_LIMIT = 50_270;
export const NI_EMPLOYEE_RATE = 0.08; // 8% between thresholds
export const NI_EMPLOYEE_RATE_ABOVE_UEL = 0.02; // 2% above UEL

export const NI_EMPLOYER_THRESHOLD = 5_000; // per year (from April 2025)
export const NI_EMPLOYER_RATE = 0.15; // 15%

// ============================================================
// NATIONAL INSURANCE (Class 2 & 4 - self-employed)
// ============================================================
export const NI_CLASS2_RATE = 3.45; // per week (voluntary)
export const NI_CLASS2_THRESHOLD = 12_570; // small profits threshold
export const NI_CLASS4_LOWER_LIMIT = 12_570;
export const NI_CLASS4_UPPER_LIMIT = 50_270;
export const NI_CLASS4_RATE = 0.06; // 6%
export const NI_CLASS4_RATE_ABOVE = 0.02; // 2%

// ============================================================
// DIVIDENDS
// ============================================================
export const DIVIDEND_ALLOWANCE = 500;
export const DIVIDEND_BASIC_RATE = 0.0875; // 8.75%
export const DIVIDEND_HIGHER_RATE = 0.3375; // 33.75%
export const DIVIDEND_ADDITIONAL_RATE = 0.3938; // 39.35%

// ============================================================
// CORPORATION TAX
// ============================================================
export const CORP_TAX_SMALL_PROFITS_RATE = 0.19; // up to 50k
export const CORP_TAX_MAIN_RATE = 0.25; // 250k+
export const CORP_TAX_SMALL_PROFITS_LIMIT = 50_000;
export const CORP_TAX_UPPER_LIMIT = 250_000;
// Marginal relief between 50k and 250k

// ============================================================
// VAT
// ============================================================
export const VAT_REGISTRATION_THRESHOLD = 90_000; // from April 2024
export const VAT_DEREGISTRATION_THRESHOLD = 88_000;
export const VAT_STANDARD_RATE = 0.2;
export const VAT_REDUCED_RATE = 0.05;
export const VAT_FLAT_RATE_SCHEMES: Record<string, number> = {
  "Advertising": 0.11,
  "Computer and IT consultancy": 0.145,
  "Management consultancy": 0.14,
  "Pubs": 0.065,
  "Retailing (not food, confectionery, tobacco, newspapers or children's clothing)": 0.075,
  "Retailing (food, confectionery, tobacco, newspapers or children's clothing)": 0.04,
  "Real estate activity": 0.14,
  "Hairdressing or other beauty treatment services": 0.13,
  "Transport or storage": 0.1,
};

// ============================================================
// MILEAGE ALLOWANCE
// ============================================================
export const MILEAGE_RATE_FIRST_10K = 0.45; // per mile
export const MILEAGE_RATE_ABOVE_10K = 0.25;
export const MILEAGE_MOTORCYCLE = 0.24;
export const MILEAGE_BICYCLE = 0.20;

// ============================================================
// EMPLOYMENT ALLOWANCE
// ============================================================
export const EMPLOYMENT_ALLOWANCE = 10_500;

// ============================================================
// HOME OFFICE (SIMPLIFIED)
// ============================================================
export const HOME_OFFICE_FLAT_RATE_WEEKLY = 6; // £6/week
export const HOME_OFFICE_FLAT_RATE_MONTHLY = 26; // £26/month
export const HOME_OFFICE_HOURS_25_50 = 10; // £10/month
export const HOME_OFFICE_HOURS_51_100 = 18; // £18/month
export const HOME_OFFICE_HOURS_101_PLUS = 26; // £26/month

// ============================================================
// KEY DEADLINES
// ============================================================
export const KEY_DEADLINES = [
  { date: "2025-10-05", description: "Register for Self Assessment (new businesses)" },
  { date: "2025-10-31", description: "Paper Self Assessment tax return deadline" },
  { date: "2026-01-31", description: "Online Self Assessment + payment deadline (2024/25)" },
  { date: "2026-04-05", description: "End of 2025/26 tax year" },
  { date: "2026-07-31", description: "Second Payment on Account due" },
] as const;

// ============================================================
// ANNUAL INVESTMENT ALLOWANCE
// ============================================================
export const ANNUAL_INVESTMENT_ALLOWANCE = 1_000_000;

// ============================================================
// PENSION
// ============================================================
export const PENSION_ANNUAL_ALLOWANCE = 60_000;
export const PENSION_LIFETIME_ALLOWANCE = Infinity; // abolished from 2024/25
