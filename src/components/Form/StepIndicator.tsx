/**
 * Visual progress indicator for form wizard
 */

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition ${
                step.id < currentStep
                  ? 'bg-green-600 text-white'
                  : step.id === currentStep
                  ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 text-center hidden sm:inline">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
