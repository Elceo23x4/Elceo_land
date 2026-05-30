/**
 * dashboardPanelAlertFixtures.ts
 *
 * Default fixture preferences for all seven dashboard panels.
 * Frontend fixture only. No backend in this repo.
 */

import type { DashboardPanelAlertPreference } from "./dashboardPanelAlertTypes";

export const defaultPanelAlertPreferences: DashboardPanelAlertPreference[] = [
  {
    panelId: "directionalBiasSummary",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["scenario_change", "condition_watch_high", "review_window"],
    label: "Directional Bias",
    summary: "Scenario and review-window condition watch.",
  },
  {
    panelId: "confidenceContextMatrix",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["contradiction_watch", "freshness_watch", "source_quality_watch"],
    label: "Confidence & Context",
    summary: "Contradiction, freshness, and source quality watch.",
  },
  {
    panelId: "watchlist",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["condition_watch_high", "cross_asset_pressure"],
    label: "Watchlist",
    summary: "Condition watch and cross-asset pressure watch.",
  },
  {
    panelId: "evidenceStackReasoningEngine",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["source_quality_watch", "freshness_watch"],
    label: "Evidence · Insights",
    summary: "Evidence quality and source freshness watch.",
  },
  {
    panelId: "newsMacroIntelligence",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["macro_condition_watch", "condition_watch_high"],
    label: "News & Macro",
    summary: "Macro condition watch.",
  },
  {
    panelId: "coachingInsights",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["review_window", "condition_watch_high"],
    label: "Coaching · Journal",
    summary: "Review workflow and market note readiness watch.",
  },
  {
    panelId: "marketRegimeCrossAssetPulse",
    enabled: false,
    state: "off",
    channels: ["email", "whatsapp"],
    triggers: ["cross_asset_pressure", "scenario_change"],
    label: "Market Regime",
    summary: "Cross-asset and regime pressure watch.",
  },
];
