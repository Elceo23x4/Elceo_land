/**
 * dashboardPanelAlertTypes.ts
 *
 * Types for per-panel market alert toggles.
 * Frontend fixture only. No backend in this repo.
 */

export type DashboardPanelAlertChannel = "email" | "whatsapp";

export type DashboardPanelAlertState = "off" | "armed" | "paused" | "pending";

export type DashboardPanelAlertTrigger =
  | "condition_watch_high"
  | "freshness_watch"
  | "contradiction_watch"
  | "scenario_change"
  | "source_quality_watch"
  | "cross_asset_pressure"
  | "macro_condition_watch"
  | "review_window";

export type DashboardPanelAlertPanelId =
  | "directionalBiasSummary"
  | "confidenceContextMatrix"
  | "watchlist"
  | "evidenceStackReasoningEngine"
  | "newsMacroIntelligence"
  | "coachingInsights"
  | "marketRegimeCrossAssetPulse";

export interface DashboardPanelAlertPreference {
  panelId: DashboardPanelAlertPanelId;
  enabled: boolean;
  state: DashboardPanelAlertState;
  channels: DashboardPanelAlertChannel[];
  triggers: DashboardPanelAlertTrigger[];
  label: string;
  summary: string;
}

export interface DashboardPanelAlertUpdate {
  panelId: DashboardPanelAlertPanelId;
  enabled: boolean;
  channels: DashboardPanelAlertChannel[];
  triggers: DashboardPanelAlertTrigger[];
}
