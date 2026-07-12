/**
 * Tax calculations for India context
 */

import {
  calculateEffectiveTaxRate,
  calculateIncomeTax,
  TAX_DEDUCTIONS,
  estimateTax80CSavings,
} from '@data/taxBrackets';

/**
 * Calculate effective tax rate for a given income
 * Wrapper around tax bracket lookup
 */
export function getEffectiveTaxRate(income: number): number {
  return calculateEffectiveTaxRate(income);
}

/**
 * Calculate total tax liability (income tax + surcharge + cess)
 */
export function calculateTotalTax(income: number): number {
  const tax = calculateIncomeTax(income);
  return tax.total;
}

/**
 * Calculate post-tax income
 */
export function calculateAfterTaxIncome(income: number): number {
  return income - calculateTotalTax(income);
}

/**
 * Calculate savings rate after taxes and expenses
 */
export function calculateAfterTaxSavings(
  income: number,
  expenses: number,
  deductions: number = 0
): number {
  const taxableIncome = Math.max(0, income - deductions);
  const tax = calculateTotalTax(taxableIncome);
  const afterTaxIncome = income - tax;
  const savings = afterTaxIncome - expenses;

  return Math.max(0, savings);
}

/**
 * Capital gains tax for India
 */
export function calculateCapitalGainsTax(
  gain: number,
  isLongTerm: boolean = true
): number {
  if (gain <= 0) return 0;

  const rate = isLongTerm ? 0.1 : 0.15; // 10% long-term, 15% short-term
  const cess = (gain * rate) * 0.04; // 4% cess

  return Math.round(gain * rate + cess);
}

/**
 * TDS on bank interest (30% if interest > ₹50K/year)
 */
export function calculateTDS(interest: number): number {
  if (interest <= 50000) return 0;
  return Math.round(interest * 0.3);
}

/**
 * Estimate tax savings from Sec 80C deductions
 * PPF + NPS + ELSS combined (capped at ₹1.5L)
 */
export function estimateSec80CSavings(
  income: number,
  deductionAmount: number
): number {
  return estimateTax80CSavings(income, deductionAmount);
}

/**
 * Estimate tax savings from home loan interest (Sec 24)
 * Max ₹2L/year for self-occupied property
 */
export function estimateHomeLoanInterestSavings(
  income: number,
  interestPaid: number
): number {
  const cappedInterest = Math.min(interestPaid, TAX_DEDUCTIONS.sec24);
  const { total: taxWithInterest } = calculateIncomeTax(income - cappedInterest);
  const { total: taxWithoutInterest } = calculateIncomeTax(income);
  return taxWithoutInterest - taxWithInterest;
}

/**
 * Estimate tax savings from medical insurance (Sec 80D)
 * Max ₹25K (individual) or ₹50K (family)
 */
export function estimateMedicalInsuranceSavings(
  income: number,
  premiumPaid: number
): number {
  const cappedPremium = Math.min(premiumPaid, TAX_DEDUCTIONS.sec80D);
  const { total: taxWithDeduction } = calculateIncomeTax(income - cappedPremium);
  const { total: taxWithoutDeduction } = calculateIncomeTax(income);
  return taxWithoutDeduction - taxWithDeduction;
}

/**
 * Estimate total tax savings from all deductions
 */
export function estimateTotalTaxSavings(
  income: number,
  options: {
    sec80C?: number; // PPF, NPS, ELSS
    sec24?: number; // Home loan interest
    sec80D?: number; // Medical insurance
  }
): number {
  let totalSavings = 0;

  if (options.sec80C) {
    totalSavings += estimateSec80CSavings(income, options.sec80C);
  }

  if (options.sec24) {
    totalSavings += estimateHomeLoanInterestSavings(income, options.sec24);
  }

  if (options.sec80D) {
    totalSavings += estimateMedicalInsuranceSavings(income, options.sec80D);
  }

  return totalSavings;
}

/**
 * Tax-loss harvesting benefit (simplified)
 * Assumes you can offset 10% of gains with losses
 */
export function estimateTaxLossHarvestingBenefit(
  capitalGains: number
): number {
  const harvestableGains = capitalGains * 0.1; // Conservative 10%
  return calculateCapitalGainsTax(harvestableGains, true);
}

/**
 * Annual tax impact summary
 */
export interface TaxSummary {
  grossIncome: number;
  taxableIncome: number;
  incomeTax: number;
  effectiveRate: number;
  afterTaxIncome: number;
  potentialSavings: number; // from deductions
}

export function getTaxSummary(income: number, deductions: number = 0): TaxSummary {
  const taxableIncome = Math.max(0, income - deductions);
  const incomeTax = calculateTotalTax(taxableIncome);
  const effectiveRate = income > 0 ? incomeTax / income : 0;
  const afterTaxIncome = income - incomeTax;
  const potentialSavings = calculateTotalTax(income) - incomeTax;

  return {
    grossIncome: income,
    taxableIncome,
    incomeTax,
    effectiveRate,
    afterTaxIncome,
    potentialSavings,
  };
}
