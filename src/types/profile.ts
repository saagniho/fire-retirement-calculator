/**
 * Core RetirementProfile interface containing all user inputs
 */

export interface Liabilities {
  mortgage: number;
  studentLoans: number;
  otherDebt: number;
  avgDebtRate: number;
}

export interface ExpensesByCategory {
  housing: number;
  food: number;
  transport: number;
  healthcare: number;
  education: number;
  utilities: number;
  other: number;
}

export interface AssetAllocation {
  stocks: number;
  bonds: number;
  crypto: number;
  cash: number;
}

export interface SpendingPhase {
  ageRange: [number, number];
  multiplier: number; // e.g., 1.2 = 20% higher than baseline
}

export interface PassiveIncomeSources {
  dividends: number;
  rentalIncome: number;
  businessIncome: number;
  other: number;
}

export interface RetirementProfile {
  // Demographics
  currentAge: number;
  retirementTargetAge: number;
  lifeExpectancy: number;
  country: string;
  currency: string;
  gender?: "male" | "female" | "other";

  // Current Financial Snapshot
  liquidAssets: number;
  illiquidAssets: number;
  liabilities: Liabilities;

  // Income & Expenses
  currentAnnualIncome: number;
  annualExpenses: number;
  expensesByCategory?: ExpensesByCategory;

  // Assumptions & Rates
  salaryGrowthRate: number; // e.g., 0.03 for 3%
  expectedReturn: number;
  inflation: number;
  effectiveTaxRate: number;
  safeSWR: number;

  // Asset Allocation
  assetAllocation: AssetAllocation;

  // Retirement Lifestyle
  targetRetirementAge?: number;
  targetRetirementSpend: number; // annual
  spendingPhases?: SpendingPhase[];

  // Passive Income in Retirement
  passiveIncomeRetirement: number;
  passiveIncomeSources?: PassiveIncomeSources;
  pensionIncome: number;
  socialSecurityAge: number;
  socialSecurityAmount: number;

  // India-Specific
  epfContribution?: number; // annual EPF from salary
  npsContribution?: number; // annual NPS contribution
  expectedGratuity?: number; // gratuity at retirement

  // Metadata
  createdAt: Date;
  lastUpdated: Date;
  id?: string;
}
