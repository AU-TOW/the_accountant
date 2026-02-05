/**
 * Deterministic Tax Calculators
 * ALL tax arithmetic happens here — never in the LLM
 */

import * as rates from "../constants/tax-rates";

// ============================================================
// INCOME TAX
// ============================================================

export function calculateIncomeTax(taxableIncome: number): {
  tax: number;
  effectiveRate: number;
  breakdown: { band: string; income: number; tax: number; rate: number }[];
} {
  let personalAllowance = rates.PERSONAL_ALLOWANCE;

  // Taper personal allowance if income > 100k
  if (taxableIncome > rates.PERSONAL_ALLOWANCE_TAPER_THRESHOLD) {
    const reduction = Math.floor(
      (taxableIncome - rates.PERSONAL_ALLOWANCE_TAPER_THRESHOLD) / 2
    );
    personalAllowance = Math.max(0, personalAllowance - reduction);
  }

  const incomeAfterAllowance = Math.max(0, taxableIncome - personalAllowance);
  let remaining = incomeAfterAllowance;
  let totalTax = 0;
  const breakdown: { band: string; income: number; tax: number; rate: number }[] = [];

  for (const band of rates.INCOME_TAX_BANDS) {
    if (remaining <= 0) break;
    const bandWidth = band.to === Infinity ? remaining : band.to - band.from;
    const taxableInBand = Math.min(remaining, bandWidth);
    const taxInBand = taxableInBand * band.rate;

    if (taxableInBand > 0) {
      breakdown.push({
        band: band.name,
        income: Math.round(taxableInBand * 100) / 100,
        tax: Math.round(taxInBand * 100) / 100,
        rate: band.rate,
      });
    }

    totalTax += taxInBand;
    remaining -= taxableInBand;
  }

  return {
    tax: Math.round(totalTax * 100) / 100,
    effectiveRate: taxableIncome > 0 ? Math.round((totalTax / taxableIncome) * 10000) / 100 : 0,
    breakdown,
  };
}

// ============================================================
// NATIONAL INSURANCE (Employee / Director)
// ============================================================

export function calculateEmployeeNI(annualSalary: number): {
  employeeNI: number;
  employerNI: number;
} {
  let employeeNI = 0;
  if (annualSalary > rates.NI_PRIMARY_THRESHOLD) {
    const bandIncome = Math.min(
      annualSalary - rates.NI_PRIMARY_THRESHOLD,
      rates.NI_UPPER_EARNINGS_LIMIT - rates.NI_PRIMARY_THRESHOLD
    );
    employeeNI += bandIncome * rates.NI_EMPLOYEE_RATE;

    if (annualSalary > rates.NI_UPPER_EARNINGS_LIMIT) {
      employeeNI +=
        (annualSalary - rates.NI_UPPER_EARNINGS_LIMIT) *
        rates.NI_EMPLOYEE_RATE_ABOVE_UEL;
    }
  }

  let employerNI = 0;
  if (annualSalary > rates.NI_EMPLOYER_THRESHOLD) {
    employerNI =
      (annualSalary - rates.NI_EMPLOYER_THRESHOLD) * rates.NI_EMPLOYER_RATE;
  }

  return {
    employeeNI: Math.round(employeeNI * 100) / 100,
    employerNI: Math.round(employerNI * 100) / 100,
  };
}

// ============================================================
// NATIONAL INSURANCE (Self-Employed)
// ============================================================

export function calculateSelfEmployedNI(annualProfit: number): {
  class2: number;
  class4: number;
  total: number;
} {
  // Class 2 is now voluntary
  const class2 = 0;

  let class4 = 0;
  if (annualProfit > rates.NI_CLASS4_LOWER_LIMIT) {
    const lowerBand = Math.min(
      annualProfit - rates.NI_CLASS4_LOWER_LIMIT,
      rates.NI_CLASS4_UPPER_LIMIT - rates.NI_CLASS4_LOWER_LIMIT
    );
    class4 += lowerBand * rates.NI_CLASS4_RATE;

    if (annualProfit > rates.NI_CLASS4_UPPER_LIMIT) {
      class4 +=
        (annualProfit - rates.NI_CLASS4_UPPER_LIMIT) *
        rates.NI_CLASS4_RATE_ABOVE;
    }
  }

  return {
    class2: Math.round(class2 * 100) / 100,
    class4: Math.round(class4 * 100) / 100,
    total: Math.round((class2 + class4) * 100) / 100,
  };
}

// ============================================================
// DIVIDEND TAX
// ============================================================

export function calculateDividendTax(
  dividendAmount: number,
  otherTaxableIncome: number
): {
  tax: number;
  breakdown: { band: string; amount: number; tax: number; rate: number }[];
} {
  const taxableDividends = Math.max(0, dividendAmount - rates.DIVIDEND_ALLOWANCE);
  if (taxableDividends <= 0) return { tax: 0, breakdown: [] };

  // Determine which bands the dividends fall into
  const personalAllowance = otherTaxableIncome > rates.PERSONAL_ALLOWANCE_TAPER_THRESHOLD
    ? Math.max(0, rates.PERSONAL_ALLOWANCE - Math.floor((otherTaxableIncome - rates.PERSONAL_ALLOWANCE_TAPER_THRESHOLD) / 2))
    : rates.PERSONAL_ALLOWANCE;

  const incomeUsed = Math.max(0, otherTaxableIncome - personalAllowance);
  let remaining = taxableDividends;
  let totalTax = 0;
  const breakdown: { band: string; amount: number; tax: number; rate: number }[] = [];

  const divBands = [
    { name: "Basic Rate", from: 0, to: 37_700, rate: rates.DIVIDEND_BASIC_RATE },
    { name: "Higher Rate", from: 37_700, to: 125_140, rate: rates.DIVIDEND_HIGHER_RATE },
    { name: "Additional Rate", from: 125_140, to: Infinity, rate: rates.DIVIDEND_ADDITIONAL_RATE },
  ];

  for (const band of divBands) {
    if (remaining <= 0) break;
    const bandStart = Math.max(0, band.from - incomeUsed);
    const bandEnd = band.to === Infinity ? Infinity : Math.max(0, band.to - incomeUsed);
    const bandWidth = bandEnd - bandStart;

    if (bandWidth <= 0) continue;

    const taxableInBand = Math.min(remaining, bandWidth);
    const taxInBand = taxableInBand * band.rate;

    if (taxableInBand > 0) {
      breakdown.push({
        band: band.name,
        amount: Math.round(taxableInBand * 100) / 100,
        tax: Math.round(taxInBand * 100) / 100,
        rate: band.rate,
      });
    }

    totalTax += taxInBand;
    remaining -= taxableInBand;
  }

  return {
    tax: Math.round(totalTax * 100) / 100,
    breakdown,
  };
}

// ============================================================
// SALARY vs DIVIDEND OPTIMISER
// ============================================================

export function optimiseSalaryDividend(companyProfit: number): {
  optimalSalary: number;
  optimalDividend: number;
  totalTax: number;
  takeHome: number;
  comparisonAllSalary: {
    totalTax: number;
    takeHome: number;
  };
  saving: number;
} {
  // Optimal salary is typically at the NI primary threshold
  const optimalSalary = rates.PERSONAL_ALLOWANCE;

  // Corporation tax on remaining profit
  const profitAfterSalary = companyProfit - optimalSalary;
  const corpTax = calculateCorpTax(Math.max(0, profitAfterSalary));

  // Available for dividends
  const availableForDividends = Math.max(0, profitAfterSalary - corpTax);
  const optimalDividend = availableForDividends;

  // Tax on salary
  const salaryIncomeTax = calculateIncomeTax(optimalSalary);
  const salaryNI = calculateEmployeeNI(optimalSalary);
  const employerNI = salaryNI.employerNI;

  // Tax on dividends
  const dividendTax = calculateDividendTax(optimalDividend, optimalSalary);

  const totalTax =
    salaryIncomeTax.tax +
    salaryNI.employeeNI +
    employerNI +
    corpTax +
    dividendTax.tax;

  const takeHome =
    optimalSalary -
    salaryIncomeTax.tax -
    salaryNI.employeeNI +
    optimalDividend -
    dividendTax.tax;

  // Compare to all salary
  const allSalaryGross = companyProfit;
  const allSalaryNI = calculateEmployeeNI(allSalaryGross);
  const allSalaryEmployerNI = allSalaryNI.employerNI;
  // Employer NI reduces the gross salary available
  const effectiveSalary = allSalaryGross - allSalaryEmployerNI;
  const allSalaryTax = calculateIncomeTax(effectiveSalary);
  const allSalaryEmployeeNI = calculateEmployeeNI(effectiveSalary);

  const allSalaryTotalTax =
    allSalaryTax.tax + allSalaryEmployeeNI.employeeNI + allSalaryEmployerNI;
  const allSalaryTakeHome =
    effectiveSalary - allSalaryTax.tax - allSalaryEmployeeNI.employeeNI;

  return {
    optimalSalary,
    optimalDividend: Math.round(optimalDividend * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    takeHome: Math.round(takeHome * 100) / 100,
    comparisonAllSalary: {
      totalTax: Math.round(allSalaryTotalTax * 100) / 100,
      takeHome: Math.round(allSalaryTakeHome * 100) / 100,
    },
    saving: Math.round((allSalaryTotalTax - totalTax) * 100) / 100,
  };
}

// ============================================================
// CORPORATION TAX
// ============================================================

export function calculateCorpTax(profit: number): number {
  if (profit <= 0) return 0;

  if (profit <= rates.CORP_TAX_SMALL_PROFITS_LIMIT) {
    return Math.round(profit * rates.CORP_TAX_SMALL_PROFITS_RATE * 100) / 100;
  }

  if (profit >= rates.CORP_TAX_UPPER_LIMIT) {
    return Math.round(profit * rates.CORP_TAX_MAIN_RATE * 100) / 100;
  }

  // Marginal relief
  const mainTax = profit * rates.CORP_TAX_MAIN_RATE;
  const marginalRelief =
    ((rates.CORP_TAX_UPPER_LIMIT - profit) *
      (rates.CORP_TAX_MAIN_RATE - rates.CORP_TAX_SMALL_PROFITS_RATE) *
      profit) /
    rates.CORP_TAX_UPPER_LIMIT;

  return Math.round((mainTax - marginalRelief) * 100) / 100;
}

// ============================================================
// MILEAGE
// ============================================================

export function calculateMileage(
  businessMiles: number,
  vehicleType: "car" | "motorcycle" | "bicycle" = "car"
): {
  deduction: number;
  taxSaving20: number;
  taxSaving40: number;
} {
  let deduction: number;

  if (vehicleType === "motorcycle") {
    deduction = businessMiles * rates.MILEAGE_MOTORCYCLE;
  } else if (vehicleType === "bicycle") {
    deduction = businessMiles * rates.MILEAGE_BICYCLE;
  } else {
    const first10k = Math.min(businessMiles, 10_000);
    const above10k = Math.max(0, businessMiles - 10_000);
    deduction =
      first10k * rates.MILEAGE_RATE_FIRST_10K +
      above10k * rates.MILEAGE_RATE_ABOVE_10K;
  }

  return {
    deduction: Math.round(deduction * 100) / 100,
    taxSaving20: Math.round(deduction * 0.2 * 100) / 100,
    taxSaving40: Math.round(deduction * 0.4 * 100) / 100,
  };
}

// ============================================================
// VAT
// ============================================================

export function calculateVAT(
  netAmount: number,
  rate: "standard" | "reduced" = "standard"
): {
  net: number;
  vat: number;
  gross: number;
} {
  const vatRate =
    rate === "reduced" ? rates.VAT_REDUCED_RATE : rates.VAT_STANDARD_RATE;
  const vat = netAmount * vatRate;
  return {
    net: Math.round(netAmount * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    gross: Math.round((netAmount + vat) * 100) / 100,
  };
}

export function extractVATFromGross(
  grossAmount: number,
  rate: "standard" | "reduced" = "standard"
): {
  net: number;
  vat: number;
  gross: number;
} {
  const vatRate =
    rate === "reduced" ? rates.VAT_REDUCED_RATE : rates.VAT_STANDARD_RATE;
  const net = grossAmount / (1 + vatRate);
  const vat = grossAmount - net;
  return {
    net: Math.round(net * 100) / 100,
    vat: Math.round(vat * 100) / 100,
    gross: Math.round(grossAmount * 100) / 100,
  };
}
