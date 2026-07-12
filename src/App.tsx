import { useState } from 'react';
import FormWizard from '@components/Form/FormWizard';
import { useRetirementStore } from '@store/retirementStore';
import { useRetirementCalculator } from '@hooks/useRetirementCalculator';
import { formatINR } from '@utils/formatters';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'input' | 'results'>('home');
  const profile = useRetirementStore((state) => state.profile);
  const { results, isLoading, error } = useRetirementCalculator(profile);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111' }}>
              🎯 FIRE Calculator
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Personal Retirement Planning for India
            </p>
          </div>
          <nav style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: currentPage === 'home' ? '#2563eb' : 'transparent',
                color: currentPage === 'home' ? '#fff' : '#444',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('input')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: currentPage === 'input' ? '#2563eb' : 'transparent',
                color: currentPage === 'input' ? '#fff' : '#444',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Calculator
            </button>
            <button
              onClick={() => setCurrentPage('results')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: currentPage === 'results' ? '#2563eb' : 'transparent',
                color: currentPage === 'results' ? '#fff' : '#444',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Results
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '48px 16px' }}>
        {currentPage === 'home' && (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111' }}>
              Welcome to the FIRE Calculator
            </h2>
            <p style={{ color: '#555', marginBottom: '16px' }}>
              This calculator helps you determine when you can retire using the FIRE (Financial Independence, Retire Early) methodology, tailored for the Indian context.
            </p>
            <button
              onClick={() => setCurrentPage('input')}
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                fontWeight: 'bold',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Start Calculator →
            </button>
          </div>
        )}

        {currentPage === 'input' && (
          <FormWizard />
        )}

        {currentPage === 'results' && (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#111' }}>
              Retirement Projection
            </h2>

            {isLoading && (
              <p style={{ color: '#666', textAlign: 'center', padding: '32px' }}>
                Calculating... ⏳
              </p>
            )}

            {error && (
              <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '4px', padding: '16px', color: '#991b1b' }}>
                <strong>Error:</strong> {error}
              </div>
            )}

            {results && !isLoading && !error && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {/* KPI Cards */}
                <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '20px' }}>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>Years to FIRE</p>
                  <p style={{ color: '#1e40af', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                    {results.yearsToFIRE}
                  </p>
                  <p style={{ color: '#666', fontSize: '12px', margin: '8px 0 0 0' }}>
                    Age {results.age}
                  </p>
                </div>

                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px' }}>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>Corpus Needed</p>
                  <p style={{ color: '#166534', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                    {formatINR(results.retirementCorpusNeeded)}
                  </p>
                  <p style={{ color: '#666', fontSize: '12px', margin: '8px 0 0 0' }}>
                    at {(profile.safeSWR * 100).toFixed(1)}% SWR
                  </p>
                </div>

                <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '20px' }}>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>Success Rate</p>
                  <p style={{ color: '#b45309', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                    {(results.monteCarlo.successRate * 100).toFixed(0)}%
                  </p>
                  <p style={{ color: '#666', fontSize: '12px', margin: '8px 0 0 0' }}>
                    1,000 simulations
                  </p>
                </div>

                <div style={{ backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '8px', padding: '20px' }}>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>Retirement Date</p>
                  <p style={{ color: '#6b21a8', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
                    {results.retirementDate.getFullYear()}
                  </p>
                  <p style={{ color: '#666', fontSize: '12px', margin: '8px 0 0 0' }}>
                    {results.retirementDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {!results && !isLoading && (
              <div style={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>👈 Fill out the form and save to see your retirement projections here</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ borderTop: '1px solid #e2e8f0', backgroundColor: '#fff', marginTop: '48px' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 16px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p style={{ margin: 0 }}>FIRE Calculator v0.1 - Built with React + TypeScript</p>
          <p style={{ margin: '8px 0 0 0' }}>India-specific financial calculations | Data stored locally</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
