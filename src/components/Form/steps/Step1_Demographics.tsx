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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Current Age */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Current Age
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="number"
            min="18"
            max="100"
            value={formData.currentAge}
            onChange={(e) => handleChange('currentAge', Number(e.target.value))}
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span style={{ fontSize: '14px', color: '#666' }}>years</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Must be between 18 and 100
        </p>
      </div>

      {/* Retirement Target Age */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Target Retirement Age
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="number"
            min={formData.currentAge + 1}
            max="100"
            value={formData.retirementTargetAge}
            onChange={(e) =>
              handleChange('retirementTargetAge', Number(e.target.value))
            }
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span style={{ fontSize: '14px', color: '#666' }}>years</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Years to FIRE:{' '}
          <strong>
            {formData.retirementTargetAge - formData.currentAge} years
          </strong>
        </p>
      </div>

      {/* Life Expectancy */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Life Expectancy
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="number"
            min={formData.retirementTargetAge + 1}
            max="120"
            value={formData.lifeExpectancy}
            onChange={(e) => handleChange('lifeExpectancy', Number(e.target.value))}
            style={{ flex: '1', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
          />
          <span style={{ fontSize: '14px', color: '#666' }}>years</span>
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Retirement duration:{' '}
          <strong>{formData.lifeExpectancy - formData.retirementTargetAge} years</strong>
        </p>
      </div>

      {/* Country */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Country
          <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          style={{ width: '100%', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
        >
          <option value="India">India 🇮🇳</option>
          <option value="USA">USA 🇺🇸</option>
          <option value="UK">UK 🇬🇧</option>
          <option value="Canada">Canada 🇨🇦</option>
          <option value="Other">Other</option>
        </select>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Affects tax treatment and inflation assumptions
        </p>
      </div>

      {/* Currency */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Currency
        </label>
        <select
          value={formData.currency}
          onChange={(e) => handleChange('currency', e.target.value)}
          style={{ width: '100%', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: '#111', fontFamily: 'inherit' }}
        >
          <option value="INR">₹ Indian Rupee (INR)</option>
          <option value="USD">$ US Dollar (USD)</option>
          <option value="GBP">£ British Pound (GBP)</option>
          <option value="CAD">C$ Canadian Dollar (CAD)</option>
        </select>
      </div>

      {/* Gender (Optional) */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Gender <span style={{ fontSize: '12px', color: '#888' }}>(optional)</span>
        </label>
        <div style={{ display: 'flex', gap: '16px' }}>
          {(['male', 'female', 'other'] as const).map((gender) => (
            <label key={gender} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={(e) =>
                  handleChange('gender', e.target.value as 'male' | 'female' | 'other')
                }
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#374151' }}>
                {gender}
              </span>
            </label>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          Used for life expectancy estimates
        </p>
      </div>

      {/* Info Box */}
      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px' }}>
        <p style={{ fontSize: '14px', color: '#1e40af' }}>
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
