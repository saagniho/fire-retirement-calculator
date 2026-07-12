/**
 * Input validation for retirement profile
 */

import type { RetirementProfile } from '../types/profile';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/**
 * Comprehensive validation of retirement profile
 */
export function validateProfile(profile: RetirementProfile): ValidationError[] {
  const errors: ValidationError[] = [];

  // Demographics validation
  if (profile.currentAge < 18 || profile.currentAge > 120) {
    errors.push({
      field: 'currentAge',
      message: 'Age must be between 18 and 120',
      severity: 'error',
    });
  }

  if (profile.retirementTargetAge <= profile.currentAge) {
    errors.push({
      field: 'retirementTargetAge',
      message: 'Retirement age must be greater than current age',
      severity: 'error',
    });
  }

  if (profile.retirementTargetAge > 100) {
    errors.push({
      field: 'retirementTargetAge',
      message: 'Retirement age should be realistic (< 100)',
      severity: 'warning',
    });
  }

  if (profile.lifeExpectancy <= profile.retirementTargetAge) {
    errors.push({
      field: 'lifeExpectancy',
      message: 'Life expectancy must be greater than retirement age',
      severity: 'error',
    });
  }

  // Financial validation
  if (profile.liquidAssets < 0) {
    errors.push({
      field: 'liquidAssets',
      message: 'Liquid assets cannot be negative',
      severity: 'error',
    });
  }

  if (profile.illiquidAssets < 0) {
    errors.push({
      field: 'illiquidAssets',
      message: 'Illiquid assets cannot be negative',
      severity: 'error',
    });
  }

  // Liabilities validation
  if (profile.liabilities.mortgage < 0) {
    errors.push({
      field: 'liabilities.mortgage',
      message: 'Mortgage cannot be negative',
      severity: 'error',
    });
  }

  if (profile.liabilities.avgDebtRate < 0 || profile.liabilities.avgDebtRate > 0.3) {
    errors.push({
      field: 'liabilities.avgDebtRate',
      message: 'Debt rate must be between 0% and 30%',
      severity: 'error',
    });
  }

  // Income & Expenses validation
  if (profile.currentAnnualIncome < 0) {
    errors.push({
      field: 'currentAnnualIncome',
      message: 'Annual income cannot be negative',
      severity: 'error',
    });
  }

  if (profile.annualExpenses < 0) {
    errors.push({
      field: 'annualExpenses',
      message: 'Annual expenses cannot be negative',
      severity: 'error',
    });
  }

  if (profile.annualExpenses > profile.currentAnnualIncome) {
    errors.push({
      field: 'annualExpenses',
      message: 'Expenses exceed income - no savings possible',
      severity: 'error',
    });
  }

  // Rates validation
  if (profile.salaryGrowthRate < -0.1 || profile.salaryGrowthRate > 0.3) {
    errors.push({
      field: 'salaryGrowthRate',
      message: 'Salary growth should be between -10% and 30%',
      severity: 'warning',
    });
  }

  if (profile.expectedReturn < -0.2 || profile.expectedReturn > 0.3) {
    errors.push({
      field: 'expectedReturn',
      message: 'Expected return should be realistic (-20% to 30%)',
      severity: 'warning',
    });
  }

  if (profile.inflation < 0 || profile.inflation > 0.2) {
    errors.push({
      field: 'inflation',
      message: 'Inflation rate should be between 0% and 20%',
      severity: 'warning',
    });
  }

  if (profile.effectiveTaxRate < 0 || profile.effectiveTaxRate > 0.5) {
    errors.push({
      field: 'effectiveTaxRate',
      message: 'Tax rate must be between 0% and 50%',
      severity: 'error',
    });
  }

  if (profile.safeSWR <= 0 || profile.safeSWR > 0.1) {
    errors.push({
      field: 'safeSWR',
      message: 'Safe withdrawal rate should be between 0.1% and 10%',
      severity: 'warning',
    });
  }

  // Asset allocation validation
  const totalAllocation =
    profile.assetAllocation.stocks +
    profile.assetAllocation.bonds +
    profile.assetAllocation.crypto +
    profile.assetAllocation.cash;

  if (Math.abs(totalAllocation - 1) > 0.01) {
    errors.push({
      field: 'assetAllocation',
      message: 'Asset allocation must sum to 100%',
      severity: 'error',
    });
  }

  // Retirement spending validation
  if (profile.targetRetirementSpend <= 0) {
    errors.push({
      field: 'targetRetirementSpend',
      message: 'Retirement spending must be positive',
      severity: 'error',
    });
  }

  if (profile.targetRetirementSpend > profile.currentAnnualIncome * 2) {
    errors.push({
      field: 'targetRetirementSpend',
      message: 'Retirement spending seems too high',
      severity: 'warning',
    });
  }

  // Passive income validation
  if (profile.passiveIncomeRetirement < 0) {
    errors.push({
      field: 'passiveIncomeRetirement',
      message: 'Passive income cannot be negative',
      severity: 'error',
    });
  }

  if (profile.pensionIncome < 0) {
    errors.push({
      field: 'pensionIncome',
      message: 'Pension cannot be negative',
      severity: 'error',
    });
  }

  if (profile.socialSecurityAge < 50 || profile.socialSecurityAge > 100) {
    errors.push({
      field: 'socialSecurityAge',
      message: 'Social security age should be 50-100',
      severity: 'warning',
    });
  }

  return errors;
}

/**
 * Check if profile is valid (no errors, only warnings allowed)
 */
export function isProfileValid(profile: RetirementProfile): boolean {
  const errors = validateProfile(profile);
  return !errors.some((e) => e.severity === 'error');
}

/**
 * Validate a single field value
 */
export function validateField(
  field: keyof RetirementProfile,
  value: any
): ValidationError | null {
  switch (field) {
    case 'currentAge':
      if (typeof value !== 'number' || value < 18 || value > 120) {
        return {
          field: 'currentAge',
          message: 'Age must be between 18 and 120',
          severity: 'error',
        };
      }
      break;

    case 'retirementTargetAge':
      if (typeof value !== 'number' || value < 20 || value > 100) {
        return {
          field: 'retirementTargetAge',
          message: 'Retirement age must be between 20 and 100',
          severity: 'error',
        };
      }
      break;

    case 'lifeExpectancy':
      if (typeof value !== 'number' || value < 50 || value > 120) {
        return {
          field: 'lifeExpectancy',
          message: 'Life expectancy must be between 50 and 120',
          severity: 'error',
        };
      }
      break;

    case 'currentAnnualIncome':
    case 'annualExpenses':
    case 'liquidAssets':
    case 'illiquidAssets':
      if (typeof value !== 'number' || value < 0) {
        return {
          field,
          message: `${field} cannot be negative`,
          severity: 'error',
        };
      }
      break;

    case 'expectedReturn':
      if (typeof value !== 'number' || value < -0.2 || value > 0.3) {
        return {
          field: 'expectedReturn',
          message: 'Expected return should be between -20% and 30%',
          severity: 'warning',
        };
      }
      break;

    case 'inflation':
      if (typeof value !== 'number' || value < 0 || value > 0.2) {
        return {
          field: 'inflation',
          message: 'Inflation should be between 0% and 20%',
          severity: 'warning',
        };
      }
      break;

    case 'safeSWR':
      if (typeof value !== 'number' || value <= 0 || value > 0.1) {
        return {
          field: 'safeSWR',
          message: 'SWR should be between 0.1% and 10%',
          severity: 'warning',
        };
      }
      break;
  }

  return null;
}
