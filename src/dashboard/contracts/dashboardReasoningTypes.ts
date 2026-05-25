export type ReasoningDirection =
  | "upside_pressure"
  | "downside_pressure"
  | "mixed"
  | "neutral";

export type ReasoningStrength =
  | "low"
  | "moderate"
  | "elevated"
  | "strong";

export type FreshnessState =
  | "fresh"
  | "watch"
  | "stale";

export type ContradictionState =
  | "low"
  | "medium"
  | "high";

export interface DirectionalBiasFixture {
  mode: "fixture_only";
  headline: string;
  direction: ReasoningDirection;
  strength: ReasoningStrength;
  summary: string;
  watchCondition: string;
  invalidationNote: string;
  caveat: string;
  drivers: Array<{
    label: string;
    tone: "positive" | "warning" | "danger" | "neutral";
    summary: string;
  }>;
}

export interface ConfidenceContextFixture {
  mode: "fixture_only";
  confidenceLabel: string;
  contradiction: ContradictionState;
  freshness: FreshnessState;
  zoneStrength: ReasoningStrength;
  summary: string;
  contextRows: Array<{
    label: string;
    value: string;
    tone: "positive" | "warning" | "danger" | "neutral";
  }>;
  driverConflicts: Array<{
    label: string;
    detail: string;
  }>;
}

export interface DashboardReasoningFixture {
  mode: "fixture_only";
  updatedLabel: string;
  directionalBias: DirectionalBiasFixture;
  confidenceContext: ConfidenceContextFixture;
}
