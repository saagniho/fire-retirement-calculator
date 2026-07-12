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
    <div style={{ marginBottom: '32px' }}>
      {/* Progress bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Step {currentStep} of {totalSteps}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#666' }}>
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '9999px', height: '8px' }}>
          <div
            style={{
              backgroundColor: '#2563eb',
              height: '8px',
              borderRadius: '9999px',
              width: `${(currentStep / totalSteps) * 100}%`,
              transition: 'width 300ms ease',
            }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((step) => (
          <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '8px',
                backgroundColor:
                  step.id < currentStep
                    ? '#16a34a'
                    : step.id === currentStep
                    ? '#2563eb'
                    : '#ddd',
                color:
                  step.id < currentStep || step.id === currentStep
                    ? '#fff'
                    : '#666',
                boxShadow:
                  step.id === currentStep
                    ? '0 0 0 4px rgba(37, 99, 235, 0.3)'
                    : 'none',
              }}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <span style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
