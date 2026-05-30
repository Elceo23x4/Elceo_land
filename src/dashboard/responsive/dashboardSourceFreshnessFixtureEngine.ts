/**
 * dashboardSourceFreshnessFixtureEngine.ts
 *
 * Deterministic Source Freshness + Evidence Quality Fixture Engine.
 *
 * Pure function that derives market-facing freshness and evidence quality
 * from cognition, scenario, conditionWatch, and crossAsset snapshots.
 *
 * No random. No Date.now. No network. No live data. No persistence.
 * Safe market language only. No backend/provider exposure.
 */

import type { DashboardCognitionSnapshot, DashboardCognitionTone } from "./dashboardCognitionFixtureEngine";
import type { DashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";
import type { DashboardConditionWatchSnapshot } from "./dashboardConditionWatchFixtureEngine";
import type { DashboardCrossAssetSnapshot } from "./dashboardCrossAssetFixtureEngine";

export type SourceFreshnessTone = DashboardCognitionTone;

export type SourceFreshnessState =
  | "fresh"
  | "watch"
  | "stale_risk"
  | "incomplete"
  | "fixture_only";

export interface SourceFreshnessLayer {
  id: string;
  label: string;
  state: SourceFreshnessState;
  tone: SourceFreshnessTone;
  score: number;
  detail: string;
  confidenceImpact: string;
  linkedArea: "chart" | "macro" | "news" | "cross_asset" | "evidence" | "scenario" | "condition_watch";
}

export interface EvidenceQualityItem {
  id: string;
  label: string;
  score: number;
  tone: SourceFreshnessTone;
  detail: string;
}

export interface DashboardSourceFreshnessSnapshot {
  asset: string;
  timeframe: string;
  overallState: SourceFreshnessState;
  overallScore: number;
  summary: string;
  staleRisk: string;
  confidenceImpact: string;
  reviewCue: string;
  layers: SourceFreshnessLayer[];
  evidenceQuality: EvidenceQualityItem[];
  missingContext: EvidenceQualityItem[];
  strongestLayer: SourceFreshnessLayer;
  weakestLayer: SourceFreshnessLayer;
}

/* ─── Timeframe sensitivity multipliers ─── */
const TF_SENSITIVITY: Record<string, number> = {
  "15M": 1.3,
  "1H": 1.0,
  "4H": 0.8,
  "1D": 0.6,
};

/* ─── Helper: clamp ─── */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function deriveState(score: number): SourceFreshnessState {
  if (score >= 75) return "fresh";
  if (score >= 60) return "watch";
  if (score >= 45) return "stale_risk";
  if (score >= 30) return "incomplete";
  return "fixture_only";
}

function deriveTone(state: SourceFreshnessState): SourceFreshnessTone {
  if (state === "fresh") return "positive";
  if (state === "watch") return "neutral";
  if (state === "stale_risk") return "warning";
  if (state === "incomplete") return "warning";
  return "neutral";
}

/* ─── Main Engine Function ─── */

export function getDashboardSourceFreshnessSnapshot(
  activeAsset: string,
  activeTimeframe: string,
  cognition: DashboardCognitionSnapshot,
  scenario: DashboardScenarioSnapshot,
  conditionWatch: DashboardConditionWatchSnapshot,
  crossAsset: DashboardCrossAssetSnapshot
): DashboardSourceFreshnessSnapshot {
  const sensitivity = TF_SENSITIVITY[activeTimeframe] ?? 1.0;
  const baseScore = cognition.freshnessScore;

  // Derive layer scores with asset/timeframe variation
  const chartScore = clamp(baseScore + 5, 0, 100);
  const macroScore = clamp(baseScore - 8 * sensitivity, 0, 100);
  const newsScore = clamp(baseScore - 4 * sensitivity, 0, 100);
  const crossAssetScore = clamp(baseScore - 6, 0, 100);
  const evidenceScore = clamp(cognition.evidenceWeight * 0.7 + baseScore * 0.3, 0, 100);
  const scenarioScore = clamp(scenario.scenarioConfidence * 0.6 + baseScore * 0.4, 0, 100);
  const watchScore = clamp(baseScore - (conditionWatch.topPriority === "high" ? 12 : conditionWatch.topPriority === "medium" ? 6 : 0), 0, 100);

  // Build layers
  const layers: SourceFreshnessLayer[] = [
    {
      id: "sfl-chart",
      label: "Chart data",
      state: deriveState(chartScore),
      tone: deriveTone(deriveState(chartScore)),
      score: chartScore,
      detail: chartScore >= 75 ? "Chart fixture data current for scenario review." : "Chart context under fixture mode — review completeness.",
      confidenceImpact: chartScore >= 70 ? "Minimal impact on confidence." : "Chart staleness may limit zone confirmation.",
      linkedArea: "chart",
    },
    {
      id: "sfl-macro",
      label: "Macro context",
      state: deriveState(macroScore),
      tone: deriveTone(deriveState(macroScore)),
      score: macroScore,
      detail: macroScore >= 70 ? "Macro context adequate for current review." : macroScore >= 55 ? "Macro freshness approaching watch boundary." : "Macro context requires review before confidence escalation.",
      confidenceImpact: macroScore >= 65 ? "Moderate macro freshness — adequate." : "Macro staleness caps scenario confidence.",
      linkedArea: "macro",
    },
    {
      id: "sfl-news",
      label: "News context",
      state: deriveState(newsScore),
      tone: deriveTone(deriveState(newsScore)),
      score: newsScore,
      detail: newsScore >= 70 ? "News context fixture current." : "News context approaching review threshold.",
      confidenceImpact: newsScore >= 65 ? "News freshness within range." : "Stale news context may miss market cue changes.",
      linkedArea: "news",
    },
    {
      id: "sfl-crossasset",
      label: "Cross-asset context",
      state: deriveState(crossAssetScore),
      tone: deriveTone(deriveState(crossAssetScore)),
      score: crossAssetScore,
      detail: crossAssetScore >= 70 ? "Cross-asset relationships reflect current market context." : "Cross-asset freshness under review — verify correlation context.",
      confidenceImpact: crossAssetScore >= 65 ? "Cross-asset context supports review." : "Stale cross-asset context may miss correlation shifts.",
      linkedArea: "cross_asset",
    },
    {
      id: "sfl-evidence",
      label: "Evidence alignment",
      state: deriveState(evidenceScore),
      tone: deriveTone(deriveState(evidenceScore)),
      score: evidenceScore,
      detail: evidenceScore >= 70 ? "Evidence layers aligned and current." : evidenceScore >= 55 ? "Evidence partially aligned — watch for gaps." : "Evidence incomplete — review stack before escalation.",
      confidenceImpact: evidenceScore >= 65 ? "Evidence quality supports confidence." : "Evidence gaps limit confidence escalation.",
      linkedArea: "evidence",
    },
    {
      id: "sfl-scenario",
      label: "Scenario freshness",
      state: deriveState(scenarioScore),
      tone: deriveTone(deriveState(scenarioScore)),
      score: scenarioScore,
      detail: scenarioScore >= 70 ? "Scenario conditions reflect current context." : "Scenario may not fully reflect latest conditions — review before escalation.",
      confidenceImpact: scenarioScore >= 65 ? "Scenario freshness adequate." : "Stale scenario context limits review readiness.",
      linkedArea: "scenario",
    },
    {
      id: "sfl-watch",
      label: "Condition watch state",
      state: deriveState(watchScore),
      tone: deriveTone(deriveState(watchScore)),
      score: watchScore,
      detail: conditionWatch.topPriority === "high" ? "High-priority conditions active — freshness sensitivity elevated." : "Condition watch within normal range.",
      confidenceImpact: conditionWatch.topPriority === "high" ? "Active conditions elevate freshness requirements." : "Normal freshness cadence.",
      linkedArea: "condition_watch",
    },
  ];

  // Sort by score to find strongest/weakest
  const sorted = [...layers].sort((a, b) => b.score - a.score);
  const strongestLayer = sorted[0];
  const weakestLayer = sorted[sorted.length - 1];

  // Overall score = weighted average
  const overallScore = clamp(
    (chartScore * 0.15 + macroScore * 0.2 + newsScore * 0.1 + crossAssetScore * 0.15 +
     evidenceScore * 0.2 + scenarioScore * 0.15 + watchScore * 0.05),
    0, 100
  );
  const overallState = deriveState(overallScore);

  // Evidence quality items
  const evidenceQuality: EvidenceQualityItem[] = [
    { id: "eq-coverage", label: "Evidence coverage", score: clamp(cognition.evidenceWeight + 5, 0, 100), tone: cognition.evidenceWeight >= 55 ? "positive" : "neutral", detail: cognition.evidenceWeight >= 55 ? "Evidence coverage adequate for review." : "Evidence coverage moderate — watch for gaps." },
    { id: "eq-contradiction", label: "Contradiction clarity", score: clamp(100 - cognition.contradictionScore, 0, 100), tone: cognition.contradictionScore >= 40 ? "warning" : "positive", detail: cognition.contradictionScore >= 40 ? "Elevated contradiction reduces effective quality." : "Contradiction within acceptable range." },
    { id: "eq-alignment", label: "Context alignment", score: clamp(scenario.scenarioConfidence, 0, 100), tone: scenario.scenarioConfidence >= 55 ? "positive" : "neutral", detail: scenario.scenarioConfidence >= 55 ? "Context alignment supports current scenario." : "Context partially aligned — confirmation pending." },
  ];

  // Missing context items (score < 60)
  const missingContext: EvidenceQualityItem[] = layers
    .filter(l => l.score < 60)
    .map(l => ({
      id: `mc-${l.id}`,
      label: l.label,
      score: l.score,
      tone: l.tone,
      detail: `${l.label} below freshness threshold. ${l.confidenceImpact}`,
    }));

  // Summary
  let summary: string;
  if (overallState === "fresh") {
    summary = `${activeAsset} · ${activeTimeframe}: Source freshness adequate. Evidence quality supports current review.`;
  } else if (overallState === "watch") {
    summary = `${activeAsset} · ${activeTimeframe}: Source freshness approaching watch boundary. ${weakestLayer.label} is the limiting factor.`;
  } else if (overallState === "stale_risk") {
    summary = `${activeAsset} · ${activeTimeframe}: Stale risk active. Review ${weakestLayer.label} before confidence escalation.`;
  } else {
    summary = `${activeAsset} · ${activeTimeframe}: Source freshness incomplete. Multiple layers require review.`;
  }

  // Stale risk
  const staleRisk = overallScore >= 70 ? "Low" : overallScore >= 55 ? "Low-moderate" : overallScore >= 40 ? "Moderate" : "Elevated";

  // Confidence impact
  const confidenceImpact = overallScore >= 70
    ? "Freshness supports current confidence level."
    : overallScore >= 55
    ? "Freshness moderately limits confidence escalation."
    : "Freshness caps confidence — review sources before scenario escalation.";

  return {
    asset: activeAsset,
    timeframe: activeTimeframe,
    overallState,
    overallScore,
    summary,
    staleRisk,
    confidenceImpact,
    reviewCue: cognition.reviewWindow,
    layers,
    evidenceQuality,
    missingContext,
    strongestLayer,
    weakestLayer,
  };
}
