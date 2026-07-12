/**
 * Step 4: Assumptions - Returns, inflation, taxes
 */

import type { RetirementProfile } from '../../../types/profile';
import { formatPercent } from '../../../utils/formatters';
import { INDIA_DEFAULTS } from '../../../data/indiaDefaults';

interface Step4Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step4_Assumptions({
  formData,
  handleChange,
}: Step4Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Expected Annual Investment Return
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="-20"
            max="30"
            step="0.1"
            value={formData.expectedReturn * 100}
            onChange={(e) =>
              handleChange('expectedReturn', Number(e.target.value) / 100)
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-slate-600 dark:text-slate-400">% p.a.</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          India: Conservative 7%, Moderate 9%, Aggressive 11%
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Expected Annual Inflation
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={formData.inflation * 100}
            onChange={(e) =>
              handleChange('inflation', Number(e.target.value) / 100)
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-slate-600 dark:text-slate-400">% p.a.</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          India: {formatPercent(INDIA_DEFAULTS.inflation.overall)} (blended across categories)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Effective Tax Rate
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="50"
            step="0.1"
            value={formData.effectiveTaxRate * 100}
            onChange={(e) =>
              handleChange('effectiveTaxRate', Number(e.target.value) / 100)
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-slate-600 dark:text-slate-400">% on income</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          After all deductions (Sec 80C, etc.)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Safe Withdrawal Rate (SWR)
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={formData.safeSWR * 100}
            onChange={(e) =>
              handleChange('safeSWR', Number(e.target.value) / 100)
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-slate-600 dark:text-slate-400">%</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          India: 3% (conservative), 3.5% (moderate), 4% (aggressive)
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 FIRE Tip:</strong> Your corpus = Annual Spend / SWR.
          <br />
          Lower SWR = safer retirement but need more money. Higher SWR = more risk.
        </p>
      </div>
    </div>
  );
}
