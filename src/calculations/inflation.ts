/**
 * Inflation calculations supporting category-based inflation for India
 */

import { INDIA_DEFAULTS, INFLATION_CATEGORIES } from '../data/indiaDefaults';

export type InflationCategory = typeof INFLATION_CATEGORIES[keyof typeof INFLATION_CATEGORIES];

/**
 * Blend category-based inflation into a single rate based on spending weights
 */
export function blendInflation(spendingByCategory: {
  housing?: number;
  food?: number;
  healthcare?: number;
  education?: number;
  utilities?: number;
  transportation?: number;
  other?: number;
}): number {
  const defaults = INDIA_DEFAULTS.inflation;

  const categories = [
    {
      key: 'housing' as const,
      spend: spendingByCategory.housing || 0,
      rate: defaults.housing,
    },
    {
      key: 'food' as const,
      spend: spendingByCategory.food || 0,
      rate: defaults.food,
    },
    {
      key: 'healthcare' as const,
      spend: spendingByCategory.healthcare || 0,
      rate: defaults.healthcare,
    },
    {
      key: 'education' as const,
      spend: spendingByCategory.education || 0,
      rate: defaults.education,
    },
    {
      key: 'utilities' as const,
      spend: spendingByCategory.utilities || 0,
      rate: defaults.utilities,
    },
    {
      key: 'transportation' as const,
      spend: spendingByCategory.transportation || 0,
      rate: defaults.transportation,
    },
    {
      key: 'other' as const,
      spend: spendingByCategory.other || 0,
      rate: defaults.other || 0.055,
    },
  ];

  const totalSpend = categories.reduce((sum, c) => sum + c.spend, 0);
  if (totalSpend === 0) return defaults.overall;

  const blended = categories.reduce((sum, c) => {
    const weight = c.spend / totalSpend;
    return sum + weight * c.rate;
  }, 0);

  return blended;
}

/**
 * Get default inflation rates by category for India
 */
export function getInflationRates(): Record<InflationCategory, number> {
  return INDIA_DEFAULTS.inflation as any;
}

/**
 * Adjust a base amount for inflation over N years
 */
export function adjustForInflation(
  baseAmount: number,
  years: number,
  inflationRate: number
): number {
  return Math.round(baseAmount * Math.pow(1 + inflationRate, years));
}

/**
 * Calculate future value with compound inflation
 */
export function calculateFutureValue(
  baseAmount: number,
  years: number,
  inflationRate: number
): number {
  return adjustForInflation(baseAmount, years, inflationRate);
}

/**
 * Calculate real value (present value) of a future amount
 */
export function calculateRealValue(
  futureAmount: number,
  years: number,
  inflationRate: number
): number {
  return Math.round(futureAmount / Math.pow(1 + inflationRate, years));
}

/**
 * Inflation impact: how much more you'll need to spend at retirement
 */
export function inflationImpact(
  currentSpend: number,
  yearsToRetirement: number,
  inflationRate: number
): {
  currentSpend: number;
  retirementSpend: number;
  increase: number;
  increasePercent: number;
} {
  const retirementSpend = calculateFutureValue(
    currentSpend,
    yearsToRetirement,
    inflationRate
  );
  const increase = retirementSpend - currentSpend;
  const increasePercent = (increase / currentSpend) * 100;

  return {
    currentSpend,
    retirementSpend,
    increase,
    increasePercent,
  };
}

/**
 * Calculate years of purchasing power erosion
 * How long until you need X% more money due to inflation
 */
export function yearsToErosion(
  erosionTarget: number, // e.g., 0.2 for 20% erosion
  inflationRate: number
): number {
  if (inflationRate === 0) return Infinity;
  return Math.log(1 + erosionTarget) / Math.log(1 + inflationRate);
}

/**
 * Real return (after inflation)
 * Formula: (1 + nominal return) / (1 + inflation) - 1
 */
export function calculateRealReturn(
  nominalReturn: number,
  inflationRate: number
): number {
  return (1 + nominalReturn) / (1 + inflationRate) - 1;
}

/**
 * Estimate inflation-adjusted safe withdrawal rate
 * Accounts for inflation reducing purchasing power
 */
export function adjustedSWR(
  baseSWR: number,
  yearsRetired: number,
  inflationRate: number
): number {
  // SWR decreases with inflation and retirement length
  const inflationFactor = Math.pow(1 + inflationRate, yearsRetired);
  return baseSWR / inflationFactor;
}

/**
 * Calculate whether current spending can be maintained with inflation
 */
export function canMaintainSpending(
  currentSpend: number,
  yearsToRetirement: number,
  inflationRate: number,
  expectedIncome: number // income at retirement
): boolean {
  const futureSpend = calculateFutureValue(
    currentSpend,
    yearsToRetirement,
    inflationRate
  );
  return expectedIncome >= futureSpend;
}

/**
 * Project annual spending over a period, accounting for inflation
 */
export function projectAnnualSpending(
  baseSpend: number,
  years: number,
  inflationRate: number
): number[] {
  const projections: number[] = [];
  for (let year = 0; year <= years; year++) {
    projections.push(
      Math.round(baseSpend * Math.pow(1 + inflationRate, year))
    );
  }
  return projections;
}

/**
 * Inflation scenario analysis
 * Test impact of different inflation rates on retirement spending
 */
export function inflationScenarioAnalysis(
  currentSpend: number,
  yearsToRetirement: number,
  scenarios: { name: string; rate: number }[] = [
    { name: 'Conservative (3%)', rate: 0.03 },
    { name: 'Base Case (5.5%)', rate: 0.055 },
    { name: 'High (8%)', rate: 0.08 },
  ]
): Array<{ scenario: string; futureSpend: number; increase: number }> {
  return scenarios.map((s) => ({
    scenario: s.name,
    futureSpend: calculateFutureValue(currentSpend, yearsToRetirement, s.rate),
    increase: calculateFutureValue(currentSpend, yearsToRetirement, s.rate) - currentSpend,
  }));
}
