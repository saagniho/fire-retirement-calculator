/**
 * Step 1: Demographics - Age, country, life expectancy
 */

import type { RetirementProfile } from '../../../types/profile';
import { INDIA_DEFAULTS } from '../../../data/indiaDefaults';

interface Step1Props {
  formData: RetirementProfile;
  handleChange: (field: keyof RetirementProfile, value: any) => void;
}

export default function Step1_Demographics({
  formData,
  handleChange,
}: Step1Props) {
  return (
    <div className="space-y-6">
      {/* Current Age */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Current Age
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="18"
            max="100"
            value={formData.currentAge}
            onChange={(e) => handleChange('currentAge', Number(e.target.value))}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">years</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Must be between 18 and 100
        </p>
      </div>

      {/* Retirement Target Age */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Target Retirement Age
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={formData.currentAge + 1}
            max="100"
            value={formData.retirementTargetAge}
            onChange={(e) =>
              handleChange('retirementTargetAge', Number(e.target.value))
            }
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">years</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Years to FIRE:{' '}
          <strong>
            {formData.retirementTargetAge - formData.currentAge} years
          </strong>
        </p>
      </div>

      {/* Life Expectancy */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Life Expectancy
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={formData.retirementTargetAge + 1}
            max="120"
            value={formData.lifeExpectancy}
            onChange={(e) => handleChange('lifeExpectancy', Number(e.target.value))}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">years</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Retirement duration:{' '}
          <strong>{formData.lifeExpectancy - formData.retirementTargetAge} years</strong>
        </p>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Country
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
        >
          <option value="India">India 🇮🇳</option>
          <option value="USA">USA 🇺🇸</option>
          <option value="UK">UK 🇬🇧</option>
          <option value="Canada">Canada 🇨🇦</option>
          <option value="Other">Other</option>
        </select>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Affects tax treatment and inflation assumptions
        </p>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Currency
        </label>
        <select
          value={formData.currency}
          onChange={(e) => handleChange('currency', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
        >
          <option value="INR">₹ Indian Rupee (INR)</option>
          <option value="USD">$ US Dollar (USD)</option>
          <option value="GBP">£ British Pound (GBP)</option>
          <option value="CAD">C$ Canadian Dollar (CAD)</option>
        </select>
      </div>

      {/* Gender (Optional) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Gender <span className="text-xs text-slate-500">(optional)</span>
        </label>
        <div className="flex gap-4">
          {(['male', 'female', 'other'] as const).map((gender) => (
            <label key={gender} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={(e) =>
                  handleChange('gender', e.target.value as 'male' | 'female' | 'other')
                }
                className="w-4 h-4"
              />
              <span className="text-sm capitalize text-slate-700 dark:text-slate-300">
                {gender}
              </span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Used for life expectancy estimates
        </p>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>ℹ️ India-Specific Defaults:</strong>
          <br />
          • Life expectancy: Male {INDIA_DEFAULTS.maleLifeExpectancy}, Female{' '}
          {INDIA_DEFAULTS.femaleLifeExpectancy}
          <br />
          • Default SWR: {(INDIA_DEFAULTS.safeWithdrawalRate * 100).toFixed(1)}%
          (conservative for India's inflation)
        </p>
      </div>
    </div>
  );
}
