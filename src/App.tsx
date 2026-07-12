import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'input' | 'results'>('home');

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
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111' }}>
              Calculator Form
            </h2>
            <p style={{ color: '#666' }}>
              ✅ Core calculation engine built and working!<br />
              ✅ Form wizard UI created (Phase 3)<br />
              📋 Integrate FormWizard component in next update
            </p>
          </div>
        )}

        {currentPage === 'results' && (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111' }}>
              Retirement Projection
            </h2>
            <p style={{ color: '#666' }}>
              ✅ Calculation engine ready<br />
              📊 Charts coming in Phase 4
            </p>
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
