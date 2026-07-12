/**
 * Step 5: Retirement Lifestyle - Target spending
 */

import type { RetirementProfile } from '../../../types/profile';
import { formatINR } from '../../../utils/formatters';

interface Step5Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step5_Retirement({
  formData,
  handleChange,
}: Step5Props) {
  const corpusNeeded = formData.targetRetirementSpend / formData.safeSWR;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Target Annual Retirement Spending
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400">₹</span>
          <input
            type="number"
            min="0"
            value={formData.targetRetirementSpend}
            onChange={(e) =>
              handleChange('targetRetirementSpend', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          How much you want to spend annually in retirement
        </p>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
          <strong>💡 Current vs Retirement Spending:</strong>
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Current annual expenses:</span>
            <span className="font-medium">{formatINR(formData.annualExpenses)}</span>
          </div>
          <div className="flex justify-between">
            <span>Target retirement spending:</span>
            <span className="font-medium">{formatINR(formData.targetRetirementSpend)}</span>
          </div>
          <div className="flex justify-between">
            <span>Difference:</span>
            <span className="font-medium">
              {formData.targetRetirementSpend > formData.annualExpenses ? '+' : ''}
              {formatINR(formData.targetRetirementSpend - formData.annualExpenses)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-blue-200 dark:border-slate-500">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
          🎯 Required Retirement Corpus
        </h4>
        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {formatINR(corpusNeeded)}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          Calculation: Annual Spend (₹{formData.targetRetirementSpend.toLocaleString()}) ÷ SWR
          ({(formData.safeSWR * 100).toFixed(1)}%) = {formatINR(corpusNeeded)}
        </p>
      </div>
    </div>
  );
}
