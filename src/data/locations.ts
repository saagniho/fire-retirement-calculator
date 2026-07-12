/**
 * India city data with tier classification and cost multipliers
 */

export const CityTier = {
  Tier1: "tier1",
  Tier2: "tier2",
  Tier3: "tier3",
  Tier4: "tier4",
} as const;

export type CityTierValue = typeof CityTier[keyof typeof CityTier];

export interface City {
  name: string;
  state: string;
  tier: CityTierValue;
  costMultiplier: number; // relative to Tier 1 baseline
  latitude?: number;
  longitude?: number;
}

export const INDIA_CITIES: City[] = [
  // Tier 1 - Major Metros (Baseline: 1.0)
  { name: "Mumbai", state: "Maharashtra", tier: CityTier.Tier1, costMultiplier: 1.0 },
  { name: "Delhi", state: "Delhi", tier: CityTier.Tier1, costMultiplier: 1.0 },
  { name: "Bangalore", state: "Karnataka", tier: CityTier.Tier1, costMultiplier: 1.0 },
  { name: "Hyderabad", state: "Telangana", tier: CityTier.Tier1, costMultiplier: 1.0 },
  { name: "Chennai", state: "Tamil Nadu", tier: CityTier.Tier1, costMultiplier: 0.95 },
  { name: "Kolkata", state: "West Bengal", tier: CityTier.Tier1, costMultiplier: 0.95 },

  // Tier 2 - Major Cities (~65% of Tier 1 cost)
  { name: "Pune", state: "Maharashtra", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Ahmedabad", state: "Gujarat", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Jaipur", state: "Rajasthan", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Lucknow", state: "Uttar Pradesh", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Kochi", state: "Kerala", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Chandigarh", state: "Chandigarh", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Bhopal", state: "Madhya Pradesh", tier: CityTier.Tier2, costMultiplier: 0.65 },
  { name: "Coimbatore", state: "Tamil Nadu", tier: CityTier.Tier2, costMultiplier: 0.65 },

  // Tier 3 - Smaller Cities (~45% of Tier 1 cost)
  { name: "Indore", state: "Madhya Pradesh", tier: CityTier.Tier3, costMultiplier: 0.45 },
  { name: "Nagpur", state: "Maharashtra", tier: CityTier.Tier3, costMultiplier: 0.45 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", tier: CityTier.Tier3, costMultiplier: 0.45 },
  { name: "Vadodara", state: "Gujarat", tier: CityTier.Tier3, costMultiplier: 0.45 },
  { name: "Surat", state: "Gujarat", tier: CityTier.Tier3, costMultiplier: 0.5 },
  { name: "Ghaziabad", state: "Uttar Pradesh", tier: CityTier.Tier3, costMultiplier: 0.5 },
  { name: "Thane", state: "Maharashtra", tier: CityTier.Tier3, costMultiplier: 0.55 },

  // Tier 4 - Small Towns (~30% of Tier 1 cost)
  { name: "Agra", state: "Uttar Pradesh", tier: CityTier.Tier4, costMultiplier: 0.3 },
  { name: "Ranchi", state: "Jharkhand", tier: CityTier.Tier4, costMultiplier: 0.3 },
  { name: "Mysore", state: "Karnataka", tier: CityTier.Tier4, costMultiplier: 0.35 },
  { name: "Rishikesh", state: "Uttarakhand", tier: CityTier.Tier4, costMultiplier: 0.35 },
  { name: "Siliguri", state: "West Bengal", tier: CityTier.Tier4, costMultiplier: 0.3 },
];

/**
 * Get city by name
 */
export function getCityByName(name: string): City | undefined {
  return INDIA_CITIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all cities by tier
 */
export function getCitiesByTier(tier: CityTierValue): City[] {
  return INDIA_CITIES.filter((c) => c.tier === tier);
}

/**
 * Get cost multiplier for a city
 */
export function getCostMultiplier(cityName: string): number {
  const city = getCityByName(cityName);
  return city ? city.costMultiplier : 1.0;
}

/**
 * Standard tier multipliers (used if city not found)
 */
export const TIER_MULTIPLIERS = {
  [CityTier.Tier1]: 1.0,
  [CityTier.Tier2]: 0.65,
  [CityTier.Tier3]: 0.45,
  [CityTier.Tier4]: 0.3,
};

/**
 * Annual budget ranges by tier (for 1 couple, 2026)
 */
export const BUDGET_RANGES = {
  [CityTier.Tier1]: {
    modest: 3000000, // ₹30L
    comfortable: 6000000, // ₹60L
    luxury: 10000000, // ₹1 Cr
  },
  [CityTier.Tier2]: {
    modest: 2000000, // ₹20L
    comfortable: 4000000, // ₹40L
    luxury: 7500000, // ₹75L
  },
  [CityTier.Tier3]: {
    modest: 1200000, // ₹12L
    comfortable: 2500000, // ₹25L
    luxury: 5000000, // ₹50L
  },
  [CityTier.Tier4]: {
    modest: 800000, // ₹8L
    comfortable: 1500000, // ₹15L
    luxury: 3500000, // ₹35L
  },
};
