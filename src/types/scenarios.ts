/**
 * Scenario management types
 */

import type { RetirementProfile } from './profile';
import type { CalculationResults } from './results';

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  baseProfileId?: string; // reference to parent profile
  overrides: Partial<RetirementProfile>;
  results?: CalculationResults;
  createdAt: Date;
  lastUpdated: Date;
}

export interface ScenarioComparison {
  scenarios: Scenario[];
  metrics: {
    yearsToFIRE: number[];
    corpusNeeded: number[];
    successRate: number[];
    retirementDate: Date[];
  };
  differences: {
    scenario: string;
    yearsToFIREDelta: number; // relative to first scenario
    corpusDelta: number;
    successRateDelta: number;
  }[];
}

export const ScenarioType = {
  Tier1Metro: "tier1_metro",
  Tier2City: "tier2_city",
  Tier3Town: "tier3_town",
  SemiFIRE: "semi_fire",
  MarketCrash: "market_crash",
  InflationSpike: "inflation_spike",
  JobLoss: "job_loss",
  LongevityExtended: "longevity_extended",
  Custom: "custom",
} as const;

export type ScenarioTypeValue = typeof ScenarioType[keyof typeof ScenarioType];

export interface PresetScenario {
  type: ScenarioTypeValue;
  name: string;
  description: string;
  overrides: Partial<RetirementProfile>;
}
