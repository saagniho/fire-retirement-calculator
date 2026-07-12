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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Expected Annual Investment Return
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
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
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">% p.a.</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          India: Conservative 7%, Moderate 9%, Aggressive 11%
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Expected Annual Inflation
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
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
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">% p.a.</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          India: {formatPercent(INDIA_DEFAULTS.inflation.overall)} (blended across categories)
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Effective Tax Rate
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
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
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">% on income</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          After all deductions (Sec 80C, etc.)
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Safe Withdrawal Rate (SWR)
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
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
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">%</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          India: 3% (conservative), 3.5% (moderate), 4% (aggressive)
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p style={{ fontSize: '14px', color: '#1e40af' }}>
          <strong>💡 FIRE Tip:</strong> Your corpus = Annual Spend / SWR.
          <br />
          Lower SWR = safer retirement but need more money. Higher SWR = more risk.
        </p>
      </div>
    </div>
  );
}
