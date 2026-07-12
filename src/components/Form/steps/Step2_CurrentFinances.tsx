/**
 * Step 2: Current Finances - Assets and Liabilities
 */

import type { RetirementProfile } from '../../../types/profile';
import { formatINR } from '../../../utils/formatters';

interface Step2Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step2_CurrentFinances({
  formData,
  handleChange,
}: Step2Props) {
  const netWorth =
    formData.liquidAssets +
    formData.illiquidAssets -
    (formData.liabilities.mortgage +
      formData.liabilities.studentLoans +
      formData.liabilities.otherDebt);

  const handleLiabilityChange = (
    field: keyof typeof formData.liabilities,
    value: number
  ) => {
    handleChange('liabilities', {
      ...formData.liabilities,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Assets Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💰 Assets
        </h3>

        {/* Liquid Assets */}
        <div className="mb-6">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Liquid Assets (Savings, Stocks, Crypto)
            <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.liquidAssets}
              onChange={(e) =>
                handleChange('liquidAssets', Number(e.target.value))
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Cash, savings accounts, stocks, mutual funds, crypto
          </p>
        </div>

        {/* Illiquid Assets */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Illiquid Assets (Real Estate, Business)
            <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.illiquidAssets}
              onChange={(e) =>
                handleChange('illiquidAssets', Number(e.target.value))
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Home equity, rental properties, business stake
          </p>
        </div>
      </div>

      {/* Liabilities Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          📊 Liabilities
        </h3>

        {/* Mortgage */}
        <div className="mb-6">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Home Loan Remaining Balance
            <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.liabilities.mortgage}
              onChange={(e) =>
                handleLiabilityChange('mortgage', Number(e.target.value))
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Student Loans */}
        <div className="mb-6">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Student Loans
            <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.liabilities.studentLoans}
              onChange={(e) =>
                handleLiabilityChange('studentLoans', Number(e.target.value))
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Other Debt */}
        <div className="mb-6">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Other Debt (Credit Cards, Personal Loans)
            <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">₹</span>
            <input
              type="number"
              min="0"
              value={formData.liabilities.otherDebt}
              onChange={(e) =>
                handleLiabilityChange('otherDebt', Number(e.target.value))
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Average Debt Rate */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Average Debt Interest Rate
            <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="30"
              step="0.1"
              value={formData.liabilities.avgDebtRate * 100}
              onChange={(e) =>
                handleLiabilityChange('avgDebtRate', Number(e.target.value) / 100)
              }
              style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
            />
            <span className="text-slate-600 dark:text-slate-400">% p.a.</span>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Weighted average interest rate on all debts
          </p>
        </div>
      </div>

      {/* Net Worth Summary */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-blue-200 dark:border-slate-500">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          📈 Financial Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300">Total Assets:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {formatINR(
                formData.liquidAssets + formData.illiquidAssets
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300">Total Liabilities:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {formatINR(
                formData.liabilities.mortgage +
                  formData.liabilities.studentLoans +
                  formData.liabilities.otherDebt
              )}
            </span>
          </div>
          <div className="h-px bg-slate-300 dark:bg-slate-500 my-2" />
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900 dark:text-white">
              Net Worth:
            </span>
            <span
              className={`font-bold text-lg ${
                netWorth >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatINR(netWorth)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
