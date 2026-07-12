/**
 * Main calculation hook - orchestrates all calculations
 */

import { useMemo, useState } from 'react';
import type { RetirementProfile, CalculationResults } from '../types/index';
import {
  projectPortfolio,
  getSummary,
  runMonteCarlo,
  validateProfile,
} from '../calculations/index';

export function useRetirementCalculator(profile: RetirementProfile) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo<CalculationResults | null>(() => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate profile
      const validationErrors = validateProfile(profile);
      if (validationErrors.some((e) => e.severity === 'error')) {
        throw new Error(
          'Invalid profile: ' +
            validationErrors
              .filter((e) => e.severity === 'error')
              .map((e) => e.message)
              .join(', ')
        );
      }

      // Run calculations
      const projections = projectPortfolio(profile);
      const summary = getSummary(projections, profile);
      const monteCarlo = runMonteCarlo(profile, 1000);

      const calculationResults: CalculationResults = {
        yearsToFIRE: summary.yearsToFIRE,
        retirementCorpusNeeded: summary.retirementCorpus,
        retirementDate: new Date(
          new Date().getFullYear() + summary.yearsToFIRE,
          new Date().getMonth(),
          new Date().getDate()
        ),
        age: profile.currentAge + summary.yearsToFIRE,
        projections,
        monteCarlo,
        sensitivityAnalysis: [], // TODO: implement sensitivity analysis
        assumptions: {
          expectedReturn: profile.expectedReturn,
          inflation: profile.inflation,
          salaryGrowth: profile.salaryGrowthRate,
          taxRate: profile.effectiveTaxRate,
          swrRate: profile.safeSWR,
        },
        timestamp: new Date(),
      };

      setIsLoading(false);
      return calculationResults;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Calculation failed';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, [profile]);

  return { results, isLoading, error };
}
