/**
 * Multi-step form wizard for retirement profile input
 */

import { useState } from 'react';
import type { RetirementProfile } from '../types/profile';
import { useRetirementStore } from '../store/retirementStore';
import { DEFAULT_RETIREMENT_PROFILE } from '../data/indiaDefaults';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Build Your Retirement Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
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
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {STEPS[currentStep - 1].description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Back
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                💾 Save
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === STEPS.length}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>

          {/* Completion Message */}
          {currentStep === STEPS.length && (
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                ✅ All steps complete! Click <strong>Save</strong> to calculate your retirement plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
