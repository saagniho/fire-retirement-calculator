import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'input' | 'results'>('home');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              🎯 FIRE Calculator
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Personal Retirement Planning for India
            </p>
          </div>
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('input')}
              className={`px-4 py-2 rounded ${
                currentPage === 'input'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setCurrentPage('results')}
              className={`px-4 py-2 rounded ${
                currentPage === 'results'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Results
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {currentPage === 'home' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Welcome to the FIRE Calculator
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              This calculator helps you determine when you can retire using the FIRE (Financial Independence, Retire Early) methodology, tailored for the Indian context.
            </p>
            <button
              onClick={() => setCurrentPage('input')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              Start Calculator →
            </button>
          </div>
        )}

        {currentPage === 'input' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Personal Profile
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Form coming soon - Core calculation engine is ready!
            </p>
          </div>
        )}

        {currentPage === 'results' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Retirement Projection
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Charts and results coming soon - Calculation engine ready to power visualizations!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>FIRE Calculator v0.1 - Built with React + TypeScript + Tailwind</p>
          <p>India-specific financial calculations | Data stored locally</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
