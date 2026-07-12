/**
 * India-specific default values for FIRE calculator
 */

import type { RetirementProfile, AssetAllocation } from '../types/profile';

export const INDIA_DEFAULTS = {
  // Interest Rates & Returns
  fixedDepositReturn: 0.07, // 7% FD average
  savingsAccountReturn: 0.04, // 4% savings account
  npsEquityReturn: 0.09, // 9% NPS Tier 2 equity
  npsBondReturn: 0.065, // 6.5% NPS bond
  epfReturn: 0.08, // 8% EPF (historical average)

  // Inflation by Category
  inflation: {
    food: 0.06, // 6%
    healthcare: 0.075, // 7.5%
    education: 0.085, // 8.5%
    housing: 0.055, // 5.5%
    utilities: 0.05, // 5%
    transportation: 0.055, // 5.5%
    other: 0.055, // 5.5% other categories
    overall: 0.055, // 5.5% blended (default)
  },

  // Taxation (India FY 2025-26)
  taxBrackets: [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 750000, rate: 0.05 },
    { min: 750000, max: 1000000, rate: 0.1 },
    { min: 1000000, max: 1250000, rate: 0.15 },
    { min: 1250000, max: 1500000, rate: 0.2 },
    { min: 1500000, max: Infinity, rate: 0.3 },
  ],
  tdsRate: 0.3, // 30% TDS on interest if > ₹50K/year
  capitalGainsTaxLongTerm: 0.1, // 10% on equity
  capitalGainsTaxShortTerm: 0.15, // 15% on equity (ST CT)

  // Tax Limits
  sec80CLimit: 150000, // ₹1.5L
  ppfLimit: 150000, // ₹1.5L/year
  npsLimit: 250000, // ₹2.5L Tier 1 + ₹2L Tier 2

  // Safe Withdrawal Rate
  safeWithdrawalRate: 0.035, // 3.5% (conservative for India)

  // Life Expectancy
  maleLifeExpectancy: 72,
  femaleLifeExpectancy: 75,

  // Location-based Cost Multipliers (vs Tier 1 metro baseline)
  tierMultipliers: {
    tier1: 1.0, // Mumbai, Delhi, Bangalore (baseline)
    tier2: 0.65, // Pune, Ahmedabad, Chennai (35% lower)
    tier3: 0.45, // Indore, Jaipur, Nagpur (55% lower)
    tier4: 0.3, // Small towns (70% lower)
    abroad: 0.5, // Variable, depends on country
  },

  // EPF & Retirement Schemes
  epfEmployeeContributionRate: 0.12, // 12% of salary
  epfEmployerContributionRate: 0.12, // 12% of salary
  epfMaximumSalary: 180000, // ₹18K/month for contribution calculation

  // Gratuity
  gratuityDayRate: 15, // 15 days per year of service
  gratuityMaxAmount: 2000000, // ₹20L cap

  // Default Asset Allocation
  defaultAssetAllocation: {
    stocks: 0.6, // 60% equity
    bonds: 0.3, // 30% bonds/FD
    crypto: 0.05, // 5% crypto (optional)
    cash: 0.05, // 5% cash emergency fund
  } as AssetAllocation,
};

export const DEFAULT_RETIREMENT_PROFILE: RetirementProfile = {
  // Demographics
  currentAge: 32,
  retirementTargetAge: 45,
  lifeExpectancy: 85,
  country: 'India',
  currency: 'INR',
  gender: 'male',

  // Current Finances
  liquidAssets: 1500000, // ₹15L
  illiquidAssets: 0,
  liabilities: {
    mortgage: 0,
    studentLoans: 0,
    otherDebt: 0,
    avgDebtRate: 0,
  },

  // Income & Expenses
  currentAnnualIncome: 1200000, // ₹12L
  annualExpenses: 400000, // ₹4L
  expensesByCategory: {
    housing: 120000,
    food: 60000,
    transport: 40000,
    healthcare: 30000,
    education: 50000,
    utilities: 30000,
    other: 70000,
  },

  // Assumptions
  salaryGrowthRate: 0.03, // 3% annual growth
  expectedReturn: 0.09, // 9% (moderate portfolio)
  inflation: 0.055, // 5.5%
  effectiveTaxRate: 0.2, // 20%
  safeSWR: 0.035, // 3.5%

  // Asset Allocation
  assetAllocation: INDIA_DEFAULTS.defaultAssetAllocation,

  // Retirement
  targetRetirementSpend: 500000, // ₹5L/year
  spendingPhases: [],

  // Passive Income
  passiveIncomeRetirement: 0,
  pensionIncome: 0,
  socialSecurityAge: 60,
  socialSecurityAmount: 0,

  // India-Specific
  epfContribution: 144000, // 12% of ₹12L salary
  npsContribution: 0,
  expectedGratuity: 0,

  // Metadata
  createdAt: new Date(),
  lastUpdated: new Date(),
};

export const INFLATION_CATEGORIES = {
  FOOD: 'food',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  HOUSING: 'housing',
  UTILITIES: 'utilities',
  TRANSPORTATION: 'transportation',
  OTHER: 'other',
} as const;

export type InflationCategory = typeof INFLATION_CATEGORIES[keyof typeof INFLATION_CATEGORIES];
