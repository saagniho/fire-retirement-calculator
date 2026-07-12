/**
 * Step 3: Income & Expenses
 */

import type { RetirementProfile } from '../../../types/profile';
import { formatINR, formatPercent } from '../../../utils/formatters';

interface Step3Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step3_Income({ formData, handleChange }: Step3Props) {
  const annualSavings = formData.currentAnnualIncome - formData.annualExpenses;
  const savingsRate =
    formData.currentAnnualIncome > 0
      ? annualSavings / formData.currentAnnualIncome
      : 0;

  return (
    <div className="space-y-8">
      {/* Income */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💵 Annual Income
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Annual Gross Income (Salary + Side Income)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.currentAnnualIncome}
              onChange={(e) =>
                handleChange('currentAnnualIncome', Number(e.target.value))
              }
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Total before taxes and expenses
          </p>
        </div>
      </div>

      {/* Expenses */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💸 Annual Expenses
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Total Annual Expenses
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.annualExpenses}
              onChange={(e) =>
                handleChange('annualExpenses', Number(e.target.value))
              }
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Current annual spending (all categories combined)
          </p>
        </div>
      </div>

      {/* Salary Growth */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📈 Growth Expectations
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Expected Annual Salary Growth
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="-10"
              max="30"
              step="0.1"
              value={formData.salaryGrowthRate * 100}
              onChange={(e) =>
                handleChange('salaryGrowthRate', Number(e.target.value) / 100)
              }
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
            />
            <span className="text-slate-600 dark:text-slate-400">% per year</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            India average: 3% | Conservative: 1% | Optimistic: 5%
          </p>
        </div>
      </div>

      {/* Savings Analysis */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-green-200 dark:border-slate-500">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          💰 Savings Analysis
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300">Annual Income:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {formatINR(formData.currentAnnualIncome)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300">Annual Expenses:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {formatINR(formData.annualExpenses)}
            </span>
          </div>
          <div className="h-px bg-slate-300 dark:bg-slate-500 my-2" />
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900 dark:text-white">
              Annual Savings:
            </span>
            <span
              className={`font-bold text-lg ${
                annualSavings >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatINR(annualSavings)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900 dark:text-white">
              Savings Rate:
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {formatPercent(savingsRate)}
            </span>
          </div>
        </div>

        {annualSavings <= 0 && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-xs">
            ⚠️ Your expenses exceed income! Adjust expenses or increase income to save for
            retirement.
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>ℹ️ Note:</strong> Expenses are assumed to grow with inflation
          (5.5% by default) during your working years. We'll adjust this in the next step.
        </p>
      </div>
    </div>
  );
}
