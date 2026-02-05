/**
 * HMRC Guidance URL Mappings
 * Maps tax topics to official HMRC guidance URLs
 */

export interface Citation {
  title: string;
  url: string;
  section?: string;
}

export const HMRC_CITATIONS: Record<string, Citation> = {
  // Income Tax
  income_tax_rates: {
    title: "Income Tax rates and allowances",
    url: "https://www.gov.uk/income-tax-rates",
  },
  personal_allowance: {
    title: "Personal Allowances",
    url: "https://www.gov.uk/income-tax-rates/income-tax-rates",
  },
  self_assessment: {
    title: "Self Assessment tax returns",
    url: "https://www.gov.uk/self-assessment-tax-returns",
  },

  // National Insurance
  ni_rates: {
    title: "National Insurance rates",
    url: "https://www.gov.uk/national-insurance-rates-letters",
  },
  ni_self_employed: {
    title: "National Insurance for the self-employed",
    url: "https://www.gov.uk/self-employed-national-insurance-rates",
  },

  // Dividends
  dividend_tax: {
    title: "Tax on dividends",
    url: "https://www.gov.uk/tax-on-dividends",
  },

  // Corporation Tax
  corporation_tax: {
    title: "Corporation Tax rates",
    url: "https://www.gov.uk/corporation-tax-rates",
  },
  corporation_tax_calc: {
    title: "Work out your Corporation Tax",
    url: "https://www.gov.uk/guidance/corporation-tax-calculating-and-paying",
  },

  // VAT
  vat_registration: {
    title: "VAT registration threshold",
    url: "https://www.gov.uk/vat-registration/when-to-register",
  },
  vat_flat_rate: {
    title: "VAT Flat Rate Scheme",
    url: "https://www.gov.uk/vat-flat-rate-scheme",
  },
  vat_returns: {
    title: "How to complete your VAT Return",
    url: "https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012",
  },

  // Expenses
  allowable_expenses: {
    title: "Expenses if you're self-employed",
    url: "https://www.gov.uk/expenses-if-youre-self-employed",
  },
  simplified_expenses: {
    title: "Simplified expenses",
    url: "https://www.gov.uk/simpler-income-tax-simplified-expenses",
  },
  business_travel: {
    title: "Travel and subsistence",
    url: "https://www.gov.uk/expenses-if-youre-self-employed/travel",
  },
  use_of_home: {
    title: "Business use of home",
    url: "https://www.gov.uk/simpler-income-tax-simplified-expenses/working-from-home",
  },

  // Mileage
  mileage_rates: {
    title: "Approved mileage rates",
    url: "https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances/travel-mileage-and-fuel-rates-and-allowances",
  },

  // Capital Allowances
  capital_allowances: {
    title: "Capital allowances",
    url: "https://www.gov.uk/capital-allowances",
  },
  annual_investment_allowance: {
    title: "Annual Investment Allowance",
    url: "https://www.gov.uk/capital-allowances/annual-investment-allowance",
  },

  // Employment
  employment_allowance: {
    title: "Employment Allowance",
    url: "https://www.gov.uk/claim-employment-allowance",
  },
  ir35: {
    title: "Off-payroll working (IR35)",
    url: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35",
  },

  // Pension
  pension_tax_relief: {
    title: "Tax on your pension contributions",
    url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief",
  },

  // MTD
  mtd: {
    title: "Making Tax Digital",
    url: "https://www.gov.uk/government/collections/making-tax-digital",
  },
  mtd_itsa: {
    title: "Making Tax Digital for Income Tax",
    url: "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax",
  },
};

export function getCitationsForTopic(topics: string[]): Citation[] {
  return topics
    .map((topic) => HMRC_CITATIONS[topic])
    .filter(Boolean);
}
