/**
 * Step 6: Retirement Income Sources - EPF, pension, passive income
 */

import type { RetirementProfile } from '../../../types/profile';
import { formatINR } from '../../../utils/formatters';

interface Step6Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step6_RetirementIncome({
  formData,
  handleChange,
}: Step6Props) {
  const totalRetirementIncome =
    formData.passiveIncomeRetirement +
    formData.pensionIncome +
    formData.socialSecurityAmount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Passive Income in Retirement (Dividends, Rental, etc.)
          <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400">₹</span>
          <input
            type="number"
            min="0"
            value={formData.passiveIncomeRetirement}
            onChange={(e) =>
              handleChange('passiveIncomeRetirement', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">/year</span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Expected Pension/Gratuity in Retirement
          <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400">₹</span>
          <input
            type="number"
            min="0"
            value={formData.pensionIncome}
            onChange={(e) =>
              handleChange('pensionIncome', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">/year</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Government/corporate pension, or annuity from EPF/NPS
        </p>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Social Security / Other Government Benefits
          <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400">₹</span>
          <input
            type="number"
            min="0"
            value={formData.socialSecurityAmount}
            onChange={(e) =>
              handleChange('socialSecurityAmount', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">/year</span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Age You'll Start Receiving Social Security
          <span className="text-gray-400 ml-1">(if applicable)</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={formData.retirementTargetAge}
            max="100"
            value={formData.socialSecurityAge}
            onChange={(e) =>
              handleChange('socialSecurityAge', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span className="text-slate-600 dark:text-slate-400">years</span>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-green-200 dark:border-slate-500">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
          💰 Total Retirement Income Sources
        </h4>
        <div className="space-y-2 text-sm">
          {formData.passiveIncomeRetirement > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Passive income:</span>
              <span className="font-medium">
                {formatINR(formData.passiveIncomeRetirement)}
              </span>
            </div>
          )}
          {formData.pensionIncome > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Pension:</span>
              <span className="font-medium">{formatINR(formData.pensionIncome)}</span>
            </div>
          )}
          {formData.socialSecurityAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Benefits (from age {formData.socialSecurityAge}):</span>
              <span className="font-medium">
                {formatINR(formData.socialSecurityAmount)}
              </span>
            </div>
          )}

          {totalRetirementIncome > 0 && (
            <>
              <div className="h-px bg-slate-300 dark:bg-slate-500 my-2" />
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Total:
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {formatINR(totalRetirementIncome)}
                </span>
              </div>
            </>
          )}

          {totalRetirementIncome === 0 && (
            <p className="text-slate-600 dark:text-slate-300 italic">
              No additional income sources specified. You'll rely entirely on portfolio
              withdrawals.
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p style={{ fontSize: '14px', color: '#1e40af' }}>
          <strong>ℹ️ India-Specific Notes:</strong>
          <br />• EPF lump-sum available at 58 (after 5 years service)
          <br />• NPS Tier 1: 50% must purchase annuity at 60
          <br />• Gratuity: 15 days per year, capped at ₹20L
        </p>
      </div>
    </div>
  );
}
