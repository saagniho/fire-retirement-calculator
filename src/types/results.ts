/**
 * Calculation results and projections
 */

export interface AnnualProjection {
  year: number;
  age: number;
  phase: "accumulation" | "retirement";
  salary: number;
  passiveIncome: number;
  totalIncome: number;
  expenses: number;
  savings: number;
  portfolioStart: number;
  investmentReturn: number;
  taxes: number;
  portfolioEnd: number;
  withdrawal?: number;
  corpusReached: boolean;
}

export interface MonteCarloResults {
  successRate: number; // 0-1
  simulations: number;
  percentile10: number;
  percentile25: number;
  median: number;
  percentile75: number;
  percentile90: number;
  minBalance: number;
  maxBalance: number;
  failureRuns: number; // number of sims where portfolio depleted
}

export interface SensitivityResult {
  variable: string; // "salary growth", "returns", "inflation", etc.
  baseImpact: number; // years to FIRE at base case
  increase1Pct: number; // years to FIRE if variable +1%
  decrease1Pct: number; // years to FIRE if variable -1%
  sensitivity: number; // average change in years per 1% change in variable
}

export interface CalculationResults {
  yearsToFIRE: number;
  retirementCorpusNeeded: number;
  retirementDate: Date;
  age: number; // age at retirement
  projections: AnnualProjection[];
  monteCarlo: MonteCarloResults;
  sensitivityAnalysis: SensitivityResult[];
  assumptions: {
    expectedReturn: number;
    inflation: number;
    salaryGrowth: number;
    taxRate: number;
    swrRate: number;
  };
  timestamp: Date;
}
