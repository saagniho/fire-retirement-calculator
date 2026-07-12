/**
 * Chart data structures for Recharts
 */

export interface PortfolioGrowthChartData {
  year: number;
  age: number;
  balance: number;
  corpusTarget: number;
  phase: "accumulation" | "retirement";
}

export interface ScenarioComparisonData {
  name: string; // e.g., "Retire at 45"
  yearsToFIRE: number;
  successRate: number;
  corpusNeeded: number;
}

export interface SensitivityData {
  variable: string;
  impact: number; // years change if variable ±1%
}

export interface MonteCarloData {
  range: string; // e.g., "₹50L-₹60L"
  frequency: number; // number of simulations
}

export interface CashflowData {
  age: number;
  salary: number;
  withdrawal: number;
  passiveIncome: number;
  expenses: number;
}
