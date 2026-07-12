/**
 * Portfolio projection engine - annual simulation
 * Simulates portfolio growth year-by-year from now through retirement
 */

import type { RetirementProfile } from '../types/profile';
import type { AnnualProjection } from '../types/results';
import Decimal from 'decimal.js';

/**
 * Project portfolio growth year-by-year
 * Returns array of annual projections from now to retirement + 30 years
 */
export function projectPortfolio(profile: RetirementProfile): AnnualProjection[] {
  const projections: AnnualProjection[] = [];

  let currentAge = profile.currentAge;
  let portfolioBalance = new Decimal(profile.liquidAssets);
  const targetRetirementAge = profile.retirementTargetAge;
  const lifeExpectancy = profile.lifeExpectancy;
  const endYear = Math.min(targetRetirementAge + (lifeExpectancy - targetRetirementAge) + 5, 120);

  let corpusReached = false;

  for (let year = 0; year <= endYear - currentAge; year++) {
    const age = currentAge + year;
    const isRetirement = age >= targetRetirementAge;

    if (age > lifeExpectancy) break; // Stop after life expectancy

    const projection = projectYear(
      profile,
      age,
      year,
      portfolioBalance,
      !corpusReached && !isRetirement // only track corpus before retirement
    );

    projections.push(projection);

    // Update portfolio for next year
    portfolioBalance = new Decimal(projection.portfolioEnd);

    // Check if corpus reached (in accumulation phase)
    if (!isRetirement && projection.corpusReached) {
      corpusReached = true;
    }

    // Stop if portfolio depleted in retirement
    if (isRetirement && projection.portfolioEnd <= 0) {
      break;
    }
  }

  return projections;
}

/**
 * Calculate single year projection
 */
function projectYear(
  profile: RetirementProfile,
  age: number,
  year: number,
  startBalance: Decimal,
  checkCorpusTarget: boolean
): AnnualProjection {
  const isRetirement = age >= profile.retirementTargetAge;
  const inflationRate = new Decimal(profile.inflation);
  const taxRate = new Decimal(profile.effectiveTaxRate);
  const expectedReturn = new Decimal(profile.expectedReturn);

  let totalIncome = new Decimal(0);
  let expenses = new Decimal(profile.annualExpenses);
  let savings = new Decimal(0);
  let withdrawal = new Decimal(0);

  if (!isRetirement) {
    // Accumulation phase
    // Salary grows over time
    const salary = new Decimal(profile.currentAnnualIncome).times(
      new Decimal(1 + profile.salaryGrowthRate).pow(year)
    );

    // Passive income
    const passiveIncome = new Decimal(profile.passiveIncomeRetirement || 0);

    totalIncome = salary.plus(passiveIncome);

    // Expenses grow with inflation
    expenses = new Decimal(profile.annualExpenses).times(
      new Decimal(1).plus(inflationRate).pow(year)
    );

    // Calculate savings
    savings = totalIncome.minus(expenses);

    // Investment returns (after tax)
    const returnsBeforeTax = startBalance.times(expectedReturn);
    const taxOnReturns = returnsBeforeTax.times(taxRate);
    const returnsAfterTax = returnsBeforeTax.minus(taxOnReturns);

    // End balance = start + savings + returns
    const endBalance = startBalance.plus(savings).plus(returnsAfterTax);

    // Calculate corpus target
    const corpusTarget = new Decimal(profile.targetRetirementSpend).dividedBy(profile.safeSWR);
    const corpusReached = endBalance.greaterThanOrEqualTo(corpusTarget);

    return {
      year,
      age,
      phase: 'accumulation',
      salary: salary.toNumber(),
      passiveIncome: (profile.passiveIncomeRetirement || 0),
      totalIncome: totalIncome.toNumber(),
      expenses: expenses.toNumber(),
      savings: savings.toNumber(),
      portfolioStart: startBalance.toNumber(),
      investmentReturn: returnsAfterTax.toNumber(),
      taxes: taxOnReturns.toNumber(),
      portfolioEnd: endBalance.toNumber(),
      corpusReached,
    };
  } else {
    // Retirement phase
    const targetSpend = new Decimal(profile.targetRetirementSpend);
    const futureTargetSpend = targetSpend.times(
      new Decimal(1).plus(inflationRate).pow(year)
    );

    // Calculate income from passive sources
    const passiveIncome = new Decimal(profile.passiveIncomeRetirement || 0);
    const pensionIncome = new Decimal(profile.pensionIncome || 0);

    // Social security (if eligible)
    let socialSecurityIncome = new Decimal(0);
    if (
      profile.socialSecurityAmount &&
      profile.socialSecurityAmount > 0 &&
      age >= profile.socialSecurityAge
    ) {
      socialSecurityIncome = new Decimal(profile.socialSecurityAmount);
    }

    const totalPassiveIncome = passiveIncome.plus(pensionIncome).plus(socialSecurityIncome);

    // Calculate withdrawal needed
    const withdrawalNeeded = futureTargetSpend.minus(totalPassiveIncome);
    withdrawal = withdrawalNeeded.greaterThan(0) ? withdrawalNeeded : new Decimal(0);

    totalIncome = totalPassiveIncome.plus(withdrawal);
    expenses = futureTargetSpend;

    // Investment returns on remaining balance
    const returnsBeforeTax = startBalance.times(expectedReturn);
    const taxOnReturns = returnsBeforeTax.times(taxRate);
    const returnsAfterTax = returnsBeforeTax.minus(taxOnReturns);

    // End balance = start + returns - withdrawal
    const endBalance = startBalance.plus(returnsAfterTax).minus(withdrawal);

    return {
      year,
      age,
      phase: 'retirement',
      salary: 0,
      passiveIncome: totalPassiveIncome.toNumber(),
      totalIncome: totalIncome.toNumber(),
      expenses: expenses.toNumber(),
      savings: 0,
      portfolioStart: startBalance.toNumber(),
      investmentReturn: returnsAfterTax.toNumber(),
      taxes: taxOnReturns.toNumber(),
      portfolioEnd: Math.max(0, endBalance.toNumber()),
      withdrawal: withdrawal.toNumber(),
      corpusReached: false,
    };
  }
}

/**
 * Calculate years to FIRE from projections
 */
export function calculateYearsToFIRE(projections: AnnualProjection[]): number {
  const retirement = projections.find((p) => p.phase === 'retirement');
  if (retirement) {
    return retirement.year;
  }
  return projections.length;
}

/**
 * Find retirement corpus needed based on target spending and SWR
 */
export function findRetirementCorpus(
  targetSpend: number,
  safeWithdrawalRate: number
): number {
  return Math.round(targetSpend / safeWithdrawalRate);
}

/**
 * Calculate final portfolio balance at a specific age
 */
export function getPortfolioAtAge(
  projections: AnnualProjection[],
  age: number
): number | null {
  const projection = projections.find((p) => p.age === age);
  return projection ? projection.portfolioEnd : null;
}

/**
 * Check if portfolio lasts until life expectancy
 */
export function doesPortfolioLast(
  projections: AnnualProjection[],
  lifeExpectancy: number
): boolean {
  const lastProjection = projections.find((p) => p.age === lifeExpectancy);
  if (!lastProjection) {
    // Projections ended before life expectancy (portfolio depleted)
    return false;
  }
  return lastProjection.portfolioEnd > 0;
}

/**
 * Get total contributions over accumulation phase
 */
export function calculateTotalSavings(projections: AnnualProjection[]): number {
  return projections
    .filter((p) => p.phase === 'accumulation')
    .reduce((sum, p) => sum + p.savings, 0);
}

/**
 * Get total investment returns over accumulation phase
 */
export function calculateTotalReturns(projections: AnnualProjection[]): number {
  return projections
    .filter((p) => p.phase === 'accumulation')
    .reduce((sum, p) => sum + p.investmentReturn, 0);
}

/**
 * Calculate withdrawal rate in first retirement year
 */
export function calculateInitialWithdrawalRate(
  retirementCorpus: number,
  firstYearWithdrawal: number
): number {
  return firstYearWithdrawal / retirementCorpus;
}

/**
 * Summary of projection
 */
export interface ProjectionSummary {
  yearsToFIRE: number;
  retirementCorpus: number;
  retirementAge: number;
  finalBalance: number;
  totalSavings: number;
  totalReturns: number;
  withdrawalRate: number;
  lasts: boolean; // whether portfolio lasts to life expectancy
}

export function getSummary(
  projections: AnnualProjection[],
  profile: RetirementProfile
): ProjectionSummary {
  const retirementProjection = projections.find((p) => p.phase === 'retirement');
  const yearsToFIRE = retirementProjection?.year || projections.length;
  const retirementAge = profile.currentAge + yearsToFIRE;
  const retirementCorpus = findRetirementCorpus(
    profile.targetRetirementSpend,
    profile.safeSWR
  );
  const lastProjection = projections[projections.length - 1];
  const finalBalance = lastProjection?.portfolioEnd || 0;
  const totalSavings = calculateTotalSavings(projections);
  const totalReturns = calculateTotalReturns(projections);

  const firstRetirementWithdrawal =
    retirementProjection?.withdrawal || 0;
  const withdrawalRate = calculateInitialWithdrawalRate(
    retirementCorpus,
    firstRetirementWithdrawal
  );

  const lasts = doesPortfolioLast(projections, profile.lifeExpectancy);

  return {
    yearsToFIRE,
    retirementCorpus,
    retirementAge,
    finalBalance,
    totalSavings,
    totalReturns,
    withdrawalRate,
    lasts,
  };
}
