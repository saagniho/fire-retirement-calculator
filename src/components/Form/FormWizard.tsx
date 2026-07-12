/**
 * Multi-step form wizard for retirement profile input
 */

import { useState } from 'react';
import type { RetirementProfile } from '../../types/profile';
import { useRetirementStore } from '../../store/retirementStore';
import { DEFAULT_RETIREMENT_PROFILE } from '../../data/indiaDefaults';
import Step1_Demographics from './steps/Step1_Demographics';
import Step2_CurrentFinances from './steps/Step2_CurrentFinances';
import Step3_Income from './steps/Step3_Income';
import Step4_Assumptions from './steps/Step4_Assumptions';
import Step5_Retirement from './steps/Step5_Retirement';
import Step6_RetirementIncome from './steps/Step6_RetirementIncome';
import StepIndicator from './StepIndicator';

const STEPS = [
  { id: 1, title: 'Demographics', description: 'Age, country, life expectancy' },
  { id: 2, title: 'Current Finances', description: 'Assets, liabilities' },
  { id: 3, title: 'Income & Expenses', description: 'Salary, spending' },
  { id: 4, title: 'Assumptions', description: 'Returns, inflation, taxes' },
  { id: 5, title: 'Retirement', description: 'Target age, spending' },
  { id: 6, title: 'Income Sources', description: 'Pension, passive income' },
];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RetirementProfile>(
    useRetirementStore((state) => state.profile) || DEFAULT_RETIREMENT_PROFILE
  );

  const { setProfile, setResults } = useRetirementStore();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setResults(null); // Clear previous results
    alert('Profile saved! Navigate to Results to see calculations.');
  };

  const handleReset = () => {
    if (confirm('Are you sure? This will reset all inputs to defaults.')) {
      setFormData(DEFAULT_RETIREMENT_PROFILE);
    }
  };

  const handleChange = (
    field: keyof RetirementProfile,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date(),
    }));
  };

  const renderStep = () => {
    const props = { formData, handleChange };

    switch (currentStep) {
      case 1:
        return <Step1_Demographics {...props} />;
      case 2:
        return <Step2_CurrentFinances {...props} />;
      case 3:
        return <Step3_Income {...props} />;
      case 4:
        return <Step4_Assumptions {...props} />;
      case 5:
        return <Step5_Retirement {...props} />;
      case 6:
        return <Step6_RetirementIncome {...props} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '32px 16px' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>
            Build Your Retirement Plan
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Let's gather your personal and financial details to calculate your FIRE target
          </p>
        </div>

        {/* Progress Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Current Step */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>
              {STEPS[currentStep - 1].title}
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {STEPS[currentStep - 1].description}
            </p>
          </div>

          {/* Step Content */}
          <div style={{ marginBottom: '32px' }}>{renderStep()}</div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              style={{
                padding: '10px 16px',
                border: '1px solid #ddd',
                color: '#444',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 1 ? 0.5 : 1,
              }}
            >
              ← Back
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                💾 Save
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === STEPS.length}
              style={{
                padding: '10px 16px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: currentStep === STEPS.length ? 'not-allowed' : 'pointer',
                opacity: currentStep === STEPS.length ? 0.5 : 1,
                fontWeight: 'bold',
              }}
            >
              Next →
            </button>
          </div>

          {/* Completion Message */}
          {currentStep === STEPS.length && (
            <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '4px' }}>
              <p style={{ color: '#166534', fontSize: '14px', margin: 0 }}>
                ✅ All steps complete! Click <strong>Save</strong> to calculate your retirement plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
