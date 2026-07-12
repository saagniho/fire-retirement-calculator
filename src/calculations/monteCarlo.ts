/**
 * Monte Carlo simulation engine for retirement projections
 * Tests portfolio success across 1000+ random market return scenarios
 */

import type { RetirementProfile } from '../types/profile';
import type { MonteCarloResults } from '../types/results';
import { projectPortfolio } from './portfolio';

/**
 * Random number from normal distribution
 * Box-Muller transform
 */
function randomNormal(mean: number = 0, stdDev: number = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

/**
 * Run single Monte Carlo simulation with randomized returns
 * Modifies return assumption based on volatility
 */
function runSimulation(
  profile: RetirementProfile,
  volatility: number
): {
  finalBalance: number;
  success: boolean;
  maxBalance: number;
} {
  // Create modified profile with randomized returns
  const randomReturn =
    profile.expectedReturn + randomNormal(0, volatility);

  // Clamp to reasonable bounds
  const clampedReturn = Math.max(-0.5, Math.min(0.5, randomReturn));

  const modifiedProfile: RetirementProfile = {
    ...profile,
    expectedReturn: clampedReturn,
  };

  // Run standard projection with modified returns
  const projections = projectPortfolio(modifiedProfile);

  // Find final balance at life expectancy
  const finalProjection = projections[projections.length - 1];
  const finalBalance = finalProjection?.portfolioEnd || 0;

  // Calculate max balance during accumulation
  const maxBalance = Math.max(
    ...projections
      .filter((p) => p.phase === 'accumulation')
      .map((p) => p.portfolioEnd)
  );

  // Success = portfolio lasts to life expectancy and is positive
  const success = finalBalance > 0;

  return {
    finalBalance,
    success,
    maxBalance,
  };
}

/**
 * Estimate volatility based on asset allocation
 * Rough approximation
 */
function estimateVolatility(profile: RetirementProfile): number {
  const stockWeight = profile.assetAllocation.stocks;
  const cryptoWeight = profile.assetAllocation.crypto;

  // Stock volatility ~18%, bond ~5%, crypto ~60%
  return (
    stockWeight * 0.18 +
    (1 - stockWeight - cryptoWeight) * 0.05 +
    cryptoWeight * 0.6
  );
}

/**
 * Run full Monte Carlo simulation with N iterations
 */
export function runMonteCarlo(
  profile: RetirementProfile,
  numSimulations: number = 1000
): MonteCarloResults {
  const results: number[] = [];
  let successCount = 0;
  let maxBalances: number[] = [];

  const volatility = estimateVolatility(profile);

  for (let i = 0; i < numSimulations; i++) {
    const sim = runSimulation(profile, volatility);
    results.push(sim.finalBalance);

    if (sim.success) {
      successCount += 1;
    }
    maxBalances.push(sim.maxBalance);
  }

  // Sort for percentile calculations
  results.sort((a, b) => a - b);

  // Calculate percentiles
  const getPercentile = (arr: number[], pct: number) => {
    const idx = Math.ceil((pct / 100) * arr.length) - 1;
    return arr[Math.max(0, idx)];
  };

  const percentile10 = getPercentile(results, 10);
  const percentile25 = getPercentile(results, 25);
  const percentile50 = getPercentile(results, 50);
  const percentile75 = getPercentile(results, 75);
  const percentile90 = getPercentile(results, 90);

  return {
    successRate: successCount / numSimulations,
    simulations: numSimulations,
    percentile10,
    percentile25,
    median: percentile50,
    percentile75,
    percentile90,
    minBalance: Math.min(...results),
    maxBalance: Math.max(...maxBalances),
    failureRuns: numSimulations - successCount,
  };
}

/**
 * Interpret success rate into confidence level
 */
export function interpretSuccessRate(rate: number): string {
  if (rate >= 0.9) return 'Very High';
  if (rate >= 0.75) return 'High';
  if (rate >= 0.6) return 'Moderate';
  if (rate >= 0.4) return 'Low';
  return 'Very Low';
}

/**
 * Quick summary of Monte Carlo results
 */
export function summarizeMonteCarlo(results: MonteCarloResults): {
  successRate: string;
  confidence: string;
  riskSummary: string;
} {
  const successRateStr = (results.successRate * 100).toFixed(0) + '%';
  const confidence = interpretSuccessRate(results.successRate);

  let riskSummary = '';
  if (results.failureRuns > 0) {
    const failureRate = (
      (results.failureRuns / results.simulations) * 100
    ).toFixed(1);
    riskSummary = `In ${results.failureRuns} of ${results.simulations} scenarios (${failureRate}%), portfolio depletes before retirement`;
  } else {
    riskSummary = `Portfolio survives in all ${results.simulations} scenarios`;
  }

  return {
    successRate: successRateStr,
    confidence,
    riskSummary,
  };
}

/**
 * Sensitivity analysis: how does success rate change with different returns?
 */
export function runMonteCarloSensitivity(
  profile: RetirementProfile,
  returnRange: { min: number; max: number; step: number } = {
    min: -0.05,
    max: 0.15,
    step: 0.01,
  }
): Array<{ return: number; successRate: number }> {
  const results: Array<{ return: number; successRate: number }> = [];

  let currentReturn = returnRange.min;
  while (currentReturn <= returnRange.max) {
    const modifiedProfile: RetirementProfile = {
      ...profile,
      expectedReturn: currentReturn,
    };

    const mc = runMonteCarlo(modifiedProfile, 500); // Fewer sims for speed
    results.push({
      return: currentReturn,
      successRate: mc.successRate,
    });

    currentReturn = Math.round((currentReturn + returnRange.step) * 100) / 100;
  }

  return results;
}

/**
 * Scenario testing: test specific market crash scenario
 */
export function testMarketCrashScenario(
  profile: RetirementProfile,
  crashPercentage: number = 0.3 // 30% crash
): {
  beforeCrash: MonteCarloResults;
  afterCrash: MonteCarloResults;
  impactOnSuccessRate: number; // percentage point change
} {
  // Normal scenario
  const beforeCrash = runMonteCarlo(profile, 500);

  // Apply immediate market crash (reduce expected return)
  const crashImpact = -crashPercentage;
  const modifiedProfile: RetirementProfile = {
    ...profile,
    expectedReturn: Math.max(
      -0.3,
      profile.expectedReturn + crashImpact
    ),
  };

  const afterCrash = runMonteCarlo(modifiedProfile, 500);

  return {
    beforeCrash,
    afterCrash,
    impactOnSuccessRate:
      (afterCrash.successRate - beforeCrash.successRate) * 100,
  };
}
