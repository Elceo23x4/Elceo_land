import type { DashboardReasoningFixture } from "../contracts/dashboardReasoningTypes";

export const dashboardReasoningFixture: DashboardReasoningFixture = {
  mode: "fixture_only",
  updatedLabel: "Fixture snapshot",
  directionalBias: {
    mode: "fixture_only",
    headline: "Upside pressure forming",
    direction: "upside_pressure",
    strength: "elevated",
    summary: "Fixture reasoning shows stronger upside pressure, but confirmation remains conditional.",
    watchCondition: "Watch whether momentum sustains above the latest internal structure zone.",
    invalidationNote: "Bias weakens if the structure fails to sustain through the next review window.",
    caveat: "Fixture-only reasoning. No live data connection is active.",
    drivers: [
      { label: "Momentum pressure", tone: "positive", summary: "Elevated directional flow detected in fixture data" },
      { label: "Macro tension", tone: "warning", summary: "Mixed conditions from broader context drivers" },
      { label: "Freshness", tone: "neutral", summary: "Data within acceptable review window" },
    ],
  },
  confidenceContext: {
    mode: "fixture_only",
    confidenceLabel: "Moderate",
    contradiction: "medium",
    freshness: "watch",
    zoneStrength: "elevated",
    summary: "Confidence is moderate due to medium contradiction between drivers.",
    contextRows: [
      { label: "Confidence", value: "Moderate", tone: "neutral" },
      { label: "Contradiction", value: "Medium", tone: "warning" },
      { label: "Freshness", value: "Watch", tone: "warning" },
      { label: "Zone strength", value: "Elevated", tone: "positive" },
    ],
    driverConflicts: [
      { label: "Momentum vs macro", detail: "Momentum supports bias but macro context remains unresolved" },
      { label: "Freshness lag", detail: "Some driver inputs approaching staleness threshold" },
    ],
  },
};
