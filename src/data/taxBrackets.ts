/**
 * India income tax brackets and calculation (FY 2025-26)
 * Resident Individual, Standard Regime
 */

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export const INDIA_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 300000, rate: 0 }, // No tax up to ₹3L
  { min: 300000, max: 750000, rate: 0.05 }, // 5% on ₹3L-₹7.5L
  { min: 750000, max: 1000000, rate: 0.1 }, // 10% on ₹7.5L-₹10L
  { min: 1000000, max: 1250000, rate: 0.15 }, // 15% on ₹10L-₹12.5L
  { min: 1250000, max: 1500000, rate: 0.2 }, // 20% on ₹12.5L-₹15L
  { min: 1500000, max: Infinity, rate: 0.3 }, // 30% on above ₹15L
];

const SURCHARGE_RATES = [
  { min: 5000000, max: 10000000, rate: 0.1 }, // 10% surcharge on ₹5Cr-₹10Cr
  { min: 10000000, max: 20000000, rate: 0.15 }, // 15% surcharge on ₹10Cr-₹20Cr
  { min: 20000000, max: 50000000, rate: 0.25 }, // 25% surcharge on ₹20Cr-₹50Cr
  { min: 50000000, max: Infinity, rate: 0.37 }, // 37% surcharge on > ₹50Cr
];

const CESS_RATE = 0.04; // 4% cess on all incomes above ₹50L

/**
 * Calculate effective tax rate for a given income (India)
 * Includes tax, surcharge, and cess
 */
export function calculateEffectiveTaxRate(income: number): number {
  if (income <= 500000) {
    return 0; // No tax up to ₹5L (basic exemption + rebate)
  }

  // Find applicable tax bracket
  let tax = 0;
  for (const bracket of INDIA_TAX_BRACKETS) {
    if (income > bracket.min) {
      const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }

  // Apply surcharge (on tax, not income)
  let surcharge = 0;
  for (const bracket of SURCHARGE_RATES) {
    if (income > bracket.min) {
      surcharge = tax * bracket.rate;
      break;
    }
  }

  // Apply cess (4% on total tax + surcharge if income > ₹50L)
  let cess = 0;
  if (income > 5000000) {
    cess = (tax + surcharge) * CESS_RATE;
  }

  const totalTax = tax + surcharge + cess;
  const effectiveRate = totalTax / income;

  return Math.min(effectiveRate, 0.42); // Cap at theoretical maximum
}

/**
 * Calculate income tax for a given income
 */
export function calculateIncomeTax(income: number): {
  tax: number;
  surcharge: number;
  cess: number;
  total: number;
  effectiveRate: number;
} {
  // Find applicable tax bracket
  let tax = 0;
  for (const bracket of INDIA_TAX_BRACKETS) {
    if (income > bracket.min) {
      const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }

  // Surcharge
  let surcharge = 0;
  for (const bracket of SURCHARGE_RATES) {
    if (income > bracket.min) {
      surcharge = tax * bracket.rate;
      break;
    }
  }

  // Cess
  let cess = 0;
  if (income > 5000000) {
    cess = (tax + surcharge) * CESS_RATE;
  }

  const total = tax + surcharge + cess;
  const effectiveRate = total / income;

  return {
    tax: Math.round(tax),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    total: Math.round(total),
    effectiveRate: Math.min(effectiveRate, 0.42),
  };
}

/**
 * Tax deduction limits (Sec 80C, 80D, 80CCD, etc.)
 */
export const TAX_DEDUCTIONS = {
  sec80C: 150000, // ₹1.5L - PPF, NPS, ELSS, Life Insurance, Home Loan Principal
  sec80CCD: 150000, // ₹1.5L - NPS Tier 1 (additional to Sec 80C)
  sec80D: 50000, // ₹50K - Medical Insurance (₹25K individual, ₹50K family)
  sec24: 200000, // ₹2L - Home Loan Interest (self-occupied property)
  totalCap: 150000, // ₹1.5L overall cap for Sec 80C
};

/**
 * Estimate income tax savings from Sec 80C deduction
 */
export function estimateTax80CSavings(
  income: number,
  deductionAmount: number
): number {
  const cappedDeduction = Math.min(deductionAmount, TAX_DEDUCTIONS.totalCap);
  const taxableIncome = Math.max(0, income - cappedDeduction);
  const { total: taxWithDeduction } = calculateIncomeTax(taxableIncome);
  const { total: taxWithoutDeduction } = calculateIncomeTax(income);
  return taxWithoutDeduction - taxWithDeduction;
}
