/**
 * Safe Withdrawal Rate (SWR) calculations
 * Core FIRE methodology for determining retirement corpus needed
 */

/**
 * Calculate retirement corpus needed based on annual spending and SWR
 * Formula: Corpus = Annual Spend / SWR
 * Example: ₹50L annual spend / 3.5% = ₹1.43 Cr corpus needed
 */
export function calculateCorpusNeeded(
  annualSpend: number,
  swrRate: number = 0.035
): number {
  if (swrRate <= 0 || swrRate > 0.1) {
    throw new Error('SWR must be between 0% and 10%');
  }
  return Math.round(annualSpend / swrRate);
}

/**
 * Calculate sustainable annual withdrawal from corpus
 * Formula: Withdrawal = Corpus * SWR
 */
export function calculateWithdrawal(
  corpus: number,
  swrRate: number = 0.035
): number {
  if (swrRate <= 0 || swrRate > 0.1) {
    throw new Error('SWR must be between 0% and 10%');
  }
  return Math.round(corpus * swrRate);
}

/**
 * Adjust corpus for inflation
 * Future corpus = Current corpus * (1 + inflation)^years
 */
export function adjustCorpusForInflation(
  corpus: number,
  years: number,
  inflationRate: number
): number {
  return Math.round(corpus * Math.pow(1 + inflationRate, years));
}

/**
 * Calculate how many years a corpus will last given annual withdrawal
 * Assumes fixed withdrawal (not inflation-adjusted)
 */
export function yearsCorpusLasts(
  corpus: number,
  annualWithdrawal: number,
  annualReturn: number = 0.07
): number {
  if (annualWithdrawal <= 0) return Infinity;
  if (annualReturn === 0) return corpus / annualWithdrawal;

  // Formula: years = log(1 / (1 - withdrawal/corpus/return)) / log(1 + return)
  const ratio = annualWithdrawal / corpus;
  if (ratio > annualReturn) {
    return 0; // Unsustainable - withdrawal exceeds returns
  }

  const years =
    Math.log(annualReturn / (annualReturn - ratio)) / Math.log(1 + annualReturn);
  return years;
}

/**
 * Common SWR rates used in FIRE community
 */
export const COMMON_SWR_RATES = {
  CONSERVATIVE: 0.03, // 3% - very safe
  MODERATE: 0.035, // 3.5% - Trinity Study baseline
  AGGRESSIVE: 0.04, // 4% - higher risk
};

/**
 * Calculate corpus needed at multiple SWR rates
 * Useful for sensitivity analysis
 */
export function calculateCorpusRange(
  annualSpend: number
): {
  conservative: number;
  moderate: number;
  aggressive: number;
} {
  return {
    conservative: calculateCorpusNeeded(annualSpend, COMMON_SWR_RATES.CONSERVATIVE),
    moderate: calculateCorpusNeeded(annualSpend, COMMON_SWR_RATES.MODERATE),
    aggressive: calculateCorpusNeeded(annualSpend, COMMON_SWR_RATES.AGGRESSIVE),
  };
}

/**
 * Reverse calculation: given corpus, find sustainable spend at different SWRs
 */
export function calculateSustainableSpend(corpus: number): {
  conservative: number;
  moderate: number;
  aggressive: number;
} {
  return {
    conservative: calculateWithdrawal(corpus, COMMON_SWR_RATES.CONSERVATIVE),
    moderate: calculateWithdrawal(corpus, COMMON_SWR_RATES.MODERATE),
    aggressive: calculateWithdrawal(corpus, COMMON_SWR_RATES.AGGRESSIVE),
  };
}

/**
 * Calculate the impact of inflation on required corpus
 * Adjusts both corpus and spending
 */
export function adjustSWRForInflation(
  baseCorpus: number,
  baseAnnualSpend: number,
  yearsToRetirement: number,
  inflationRate: number,
  swrRate: number = 0.035
): {
  inflatedSpend: number;
  inflatedCorpus: number;
  difference: number;
} {
  const inflatedSpend = adjustCorpusForInflation(
    baseAnnualSpend,
    yearsToRetirement,
    inflationRate
  );
  const inflatedCorpus = calculateCorpusNeeded(inflatedSpend, swrRate);
  const difference = inflatedCorpus - baseCorpus;

  return {
    inflatedSpend,
    inflatedCorpus,
    difference,
  };
}

/**
 * Trinity Study based success rate
 * Returns probability of portfolio lasting 30+ years
 * Based on historical data (simplified)
 */
export function estimateSuccessRate(
  corpus: number,
  annualWithdrawal: number,
  yearsNeeded: number = 30
): number {
  const withdrawalRate = annualWithdrawal / corpus;

  // Simplified Trinity Study mapping
  if (withdrawalRate <= 0.03) return 0.95;
  if (withdrawalRate <= 0.035) return 0.93;
  if (withdrawalRate <= 0.04) return 0.85;
  if (withdrawalRate <= 0.05) return 0.72;
  if (withdrawalRate <= 0.06) return 0.55;

  return 0.3; // Very high withdrawal rates: very low success
}

/**
 * Recommend SWR based on retirement duration and risk tolerance
 */
export function recommendSWR(
  yearsUntilRetirement: number,
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
): number {
  // Longer time to retirement = can afford lower SWR
  if (yearsUntilRetirement < 5) {
    return riskTolerance === 'conservative' ? 0.03 : 0.035;
  }
  if (yearsUntilRetirement < 10) {
    return riskTolerance === 'conservative' ? 0.03 : riskTolerance === 'moderate' ? 0.035 : 0.04;
  }
  // 10+ years
  return riskTolerance === 'conservative' ? 0.035 : riskTolerance === 'moderate' ? 0.04 : 0.045;
}
