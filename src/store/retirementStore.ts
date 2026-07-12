/**
 * Zustand store for retirement calculator state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RetirementProfile } from '../types/profile';
import type { CalculationResults } from '../types/results';
import type { Scenario } from '../types/scenarios';
import { DEFAULT_RETIREMENT_PROFILE } from '@data/indiaDefaults';

export interface RetirementStore {
  // State
  profile: RetirementProfile;
  results: CalculationResults | null;
  scenarios: Scenario[];
  activeScenarioId: string | null;
  isLoading: boolean;
  error: string | null;

  // Profile actions
  setProfile: (profile: RetirementProfile) => void;
  updateProfile: (updates: Partial<RetirementProfile>) => void;
  updateAge: (age: number) => void;
  updateIncome: (income: number) => void;
  updateExpenses: (expenses: number) => void;
  updateRetirementAge: (age: number) => void;
  resetProfile: () => void;

  // Results actions
  setResults: (results: CalculationResults | null) => void;
  clearResults: () => void;

  // Scenario actions
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, scenario: Partial<Scenario>) => void;
  deleteScenario: (id: string) => void;
  setActiveScenario: (id: string | null) => void;
  getScenario: (id: string) => Scenario | undefined;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Persistence
  loadFromLocalStorage: () => void;
  exportToJSON: () => string;
  importFromJSON: (json: string) => void;
}

// Default profile without date objects for storage
const getCleanDefaultProfile = (): RetirementProfile => ({
  ...DEFAULT_RETIREMENT_PROFILE,
  createdAt: new Date(),
  lastUpdated: new Date(),
});

export const useRetirementStore = create<RetirementStore>()(
  persist(
    (set, get) => ({
      profile: getCleanDefaultProfile(),
      results: null,
      scenarios: [],
      activeScenarioId: null,
      isLoading: false,
      error: null,

      // Profile actions
      setProfile: (profile) => {
        set({
          profile: {
            ...profile,
            lastUpdated: new Date(),
          },
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
            lastUpdated: new Date(),
          },
        }));
      },

      updateAge: (age) => {
        set((state) => ({
          profile: {
            ...state.profile,
            currentAge: age,
            lastUpdated: new Date(),
          },
        }));
      },

      updateIncome: (income) => {
        set((state) => ({
          profile: {
            ...state.profile,
            currentAnnualIncome: income,
            lastUpdated: new Date(),
          },
        }));
      },

      updateExpenses: (expenses) => {
        set((state) => ({
          profile: {
            ...state.profile,
            annualExpenses: expenses,
            lastUpdated: new Date(),
          },
        }));
      },

      updateRetirementAge: (age) => {
        set((state) => ({
          profile: {
            ...state.profile,
            retirementTargetAge: age,
            lastUpdated: new Date(),
          },
        }));
      },

      resetProfile: () => {
        set({
          profile: getCleanDefaultProfile(),
          results: null,
          scenarios: [],
          activeScenarioId: null,
        });
      },

      // Results actions
      setResults: (results) => {
        set({ results });
      },

      clearResults: () => {
        set({ results: null });
      },

      // Scenario actions
      addScenario: (scenario) => {
        set((state) => ({
          scenarios: [...state.scenarios, scenario],
        }));
      },

      updateScenario: (id, updates) => {
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === id ? { ...s, ...updates, lastUpdated: new Date() } : s
          ),
        }));
      },

      deleteScenario: (id) => {
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== id),
          activeScenarioId:
            state.activeScenarioId === id ? null : state.activeScenarioId,
        }));
      },

      setActiveScenario: (id) => {
        set({ activeScenarioId: id });
      },

      getScenario: (id) => {
        const state = get();
        return state.scenarios.find((s) => s.id === id);
      },

      // Utility actions
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      // Persistence
      loadFromLocalStorage: () => {
        // Zustand persist middleware handles this
        // This is a no-op but kept for API completeness
      },

      exportToJSON: () => {
        const state = get();
        return JSON.stringify(
          {
            profile: state.profile,
            results: state.results,
            scenarios: state.scenarios,
          },
          null,
          2
        );
      },

      importFromJSON: (json: string) => {
        try {
          const data = JSON.parse(json);
          if (data.profile) {
            set({
              profile: data.profile,
              results: data.results || null,
              scenarios: data.scenarios || [],
            });
          }
        } catch (error) {
          set({ error: "Failed to import JSON" });
        }
      },
    }),
    {
      name: "fire-calculator-store", // localStorage key
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Handle version migrations if needed
        return persistedState;
      },
    }
  )
);
