/**
 * dashboardConditionWatchFixtureEngine.ts
 *
 * Deterministic Market Condition Watch Fixture Engine for ELCEO Dashboard.
 *
 * Pure function that consumes activeAsset, activeTimeframe, cognition, scenario,
 * and reviewWorkflow, then returns structured market condition watch items.
 *
 * No random. No Date.now. No network. No live data. No persistence.
 * No notification settings. Safe market language only.
 */

import type { DashboardCognitionSnapshot, DashboardCognitionTone } from "./dashboardCognitionFixtureEngine";
import type { DashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";
import type { DashboardReviewWorkflowSnapshot } from "./dashboardReviewWorkflowFixtureEngine";

export type ConditionWatchTone = DashboardCognitionTone;
export type ConditionWatchPriority = "high" | "medium" | "low";

export interface MarketConditionWatchItem {
  id: string;
  label: string;
  priority: ConditionWatchPriority;
  tone: ConditionWatchTone;
  category:
    | "scenario"
    | "structure"
    | "liquidity"
    | "macro"
    | "contradiction"
    | "freshness"
    | "volatility"
    | "regime"
    | "evidence";
  detail: string;
  reviewCue: string;
  linkedPanel: "bias" | "confidence" | "watchlist" | "evidence" | "macro" | "regime" | "coaching";
  chartLink?: "structure-zone" | "liquidity-band" | "scenario-path" | "macro-marker" | "contradiction-marker" | "freshness-note";
}

export interface DashboardConditionWatchSnapshot {
  asset: string;
  timeframe: string;
  topPriority: ConditionWatchPriority;
  summary: string;
  items: MarketConditionWatchItem[];
  structureWatch: MarketConditionWatchItem[];
  liquidityWatch: MarketConditionWatchItem[];
  macroWatch: MarketConditionWatchItem[];
  contradictionWatch: MarketConditionWatchItem[];
  freshnessWatch: MarketConditionWatchItem[];
  regimeWatch: MarketConditionWatchItem[];
}

/* ─── Main Engine Function ─── */

export function getDashboardConditionWatchSnapshot(
  activeAsset: string,
  activeTimeframe: string,
  cognition: DashboardCognitionSnapshot,
  scenario: DashboardScenarioSnapshot,
  reviewWorkflow: DashboardReviewWorkflowSnapshot
): DashboardConditionWatchSnapshot {
  const items: MarketConditionWatchItem[] = [];

  // ─── Structure Watch ───
  const structurePriority: ConditionWatchPriority = cognition.zoneStrengthScore >= 70 ? "high" : cognition.zoneStrengthScore >= 50 ? "medium" : "low";
  items.push({
    id: `cw-structure-${activeAsset.replace("/", "")}`,
    label: "Structure zone confirmation",
    priority: structurePriority,
    tone: structurePriority === "high" ? "positive" : "neutral",
    category: "structure",
    detail: cognition.zoneStrengthScore >= 70
      ? "Structure zone strength elevated — watch for confirmation or rejection at this level."
      : cognition.zoneStrengthScore >= 50
      ? "Structure zone forming — monitor for sustained reaction."
      : "No active structure zone — awaiting catalyst.",
    reviewCue: scenario.reviewWindow,
    linkedPanel: "bias",
    chartLink: "structure-zone",
  });

  // ─── Scenario Watch ───
  const scenarioPriority: ConditionWatchPriority = scenario.scenarioConfidence < 45 ? "high" : scenario.scenarioConfidence < 60 ? "medium" : "low";
  items.push({
    id: `cw-scenario-${activeAsset.replace("/", "")}`,
    label: "Scenario condition alignment",
    priority: scenarioPriority,
    tone: scenarioPriority === "high" ? "warning" : scenarioPriority === "medium" ? "neutral" : "positive",
    category: "scenario",
    detail: scenario.scenarioConfidence < 45
      ? "Scenario confidence low — conditions require further alignment before review."
      : scenario.scenarioConfidence < 60
      ? "Scenario conditions partially aligned — watch for confirmation."
      : "Scenario conditions largely aligned — review readiness adequate.",
    reviewCue: scenario.reviewWindow,
    linkedPanel: "bias",
    chartLink: "scenario-path",
  });

  // ─── Contradiction Watch ───
  const contradictionPriority: ConditionWatchPriority = cognition.contradictionScore > 55 ? "high" : cognition.contradictionScore > 38 ? "medium" : "low";
  items.push({
    id: `cw-contradiction-${activeAsset.replace("/", "")}`,
    label: "Contradiction context watch",
    priority: contradictionPriority,
    tone: contradictionPriority === "high" ? "negative" : contradictionPriority === "medium" ? "warning" : "positive",
    category: "contradiction",
    detail: cognition.contradictionScore > 55
      ? "Contradiction elevated — cross-context tension caps scenario confidence."
      : cognition.contradictionScore > 38
      ? "Moderate contradiction — monitor for escalation or resolution."
      : "Contradiction within acceptable range.",
    reviewCue: "Monitor for contradiction shift",
    linkedPanel: "confidence",
    chartLink: "contradiction-marker",
  });

  // ─── Freshness Watch ───
  const freshnessPriority: ConditionWatchPriority = cognition.freshnessScore < 60 ? "high" : cognition.freshnessScore < 70 ? "medium" : "low";
  items.push({
    id: `cw-freshness-${activeAsset.replace("/", "")}`,
    label: "Source freshness review",
    priority: freshnessPriority,
    tone: freshnessPriority === "high" ? "warning" : freshnessPriority === "medium" ? "neutral" : "positive",
    category: "freshness",
    detail: cognition.freshnessScore < 60
      ? "Source freshness below review threshold — verify sources before scenario escalation."
      : cognition.freshnessScore < 70
      ? "Freshness acceptable — approaching watch boundary."
      : "Source freshness adequate for current review.",
    reviewCue: cognition.reviewWindow,
    linkedPanel: "evidence",
    chartLink: "freshness-note",
  });

  // ─── Macro Watch ───
  const macroConditions = scenario.conditions.filter(c => c.linkedArea === "macro");
  const hasMacroPending = macroConditions.some(c => c.status === "pending" || c.status === "watch");
  const macroPriority: ConditionWatchPriority = macroConditions.some(c => c.status === "pending") ? "high" : hasMacroPending ? "medium" : "low";
  items.push({
    id: `cw-macro-${activeAsset.replace("/", "")}`,
    label: "Macro event caution",
    priority: macroPriority,
    tone: macroPriority === "high" ? "warning" : macroPriority === "medium" ? "neutral" : "positive",
    category: "macro",
    detail: macroPriority === "high"
      ? "Macro catalyst pending — scenario may shift on data resolution."
      : hasMacroPending
      ? "Macro conditions under watch — monitor for event impact."
      : "No immediate macro catalyst — context stable.",
    reviewCue: cognition.reviewWindow,
    linkedPanel: "macro",
    chartLink: "macro-marker",
  });

  // ─── Liquidity Watch ───
  const liquidityElevated = cognition.liquidityCondition.toLowerCase().includes("variable") || cognition.liquidityCondition.toLowerCase().includes("lower");
  const liquidityPriority: ConditionWatchPriority = liquidityElevated ? "medium" : "low";
  items.push({
    id: `cw-liquidity-${activeAsset.replace("/", "")}`,
    label: "Liquidity band reaction",
    priority: liquidityPriority,
    tone: liquidityElevated ? "warning" : "positive",
    category: "liquidity",
    detail: liquidityElevated
      ? "Liquidity conditions variable — watch for band reaction or sweep."
      : "Liquidity adequate — no immediate stress condition.",
    reviewCue: "Next session liquidity assessment",
    linkedPanel: "regime",
    chartLink: "liquidity-band",
  });

  // ─── Volatility/Regime Watch ───
  const volElevated = cognition.volatilityCondition.toLowerCase().includes("elevated") || cognition.volatilityCondition.toLowerCase().includes("breakout");
  const regimePriority: ConditionWatchPriority = volElevated ? "high" : "low";
  items.push({
    id: `cw-regime-${activeAsset.replace("/", "")}`,
    label: "Volatility and regime watch",
    priority: regimePriority,
    tone: volElevated ? "warning" : "neutral",
    category: "regime",
    detail: volElevated
      ? "Volatility elevated — wider review caution recommended before scenario escalation."
      : "Volatility within normal range — regime stable.",
    reviewCue: cognition.reviewWindow,
    linkedPanel: "regime",
  });

  // ─── Evidence Watch ───
  const evidencePriority: ConditionWatchPriority = cognition.evidenceWeight < 50 ? "high" : cognition.evidenceWeight < 60 ? "medium" : "low";
  items.push({
    id: `cw-evidence-${activeAsset.replace("/", "")}`,
    label: "Evidence alignment watch",
    priority: evidencePriority,
    tone: evidencePriority === "high" ? "warning" : evidencePriority === "medium" ? "neutral" : "positive",
    category: "evidence",
    detail: cognition.evidenceWeight < 50
      ? "Evidence weight low — insufficient alignment for scenario confidence."
      : cognition.evidenceWeight < 60
      ? "Evidence moderate — watch for stack alignment improvement."
      : "Evidence weight supports current scenario context.",
    reviewCue: scenario.reviewWindow,
    linkedPanel: "evidence",
  });

  // Sort items by priority
  const priorityOrder: Record<ConditionWatchPriority, number> = { high: 0, medium: 1, low: 2 };
  items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Derive topPriority
  const topPriority = items[0]?.priority ?? "low";

  // Derive summary
  const highCount = items.filter(i => i.priority === "high").length;
  const mediumCount = items.filter(i => i.priority === "medium").length;
  let summary: string;
  if (highCount >= 3) {
    summary = `${activeAsset} · ${activeTimeframe}: Multiple high-priority conditions require attention before review.`;
  } else if (highCount >= 1) {
    summary = `${activeAsset} · ${activeTimeframe}: ${highCount} high-priority condition${highCount > 1 ? "s" : ""} active. Review before scenario escalation.`;
  } else if (mediumCount >= 2) {
    summary = `${activeAsset} · ${activeTimeframe}: Moderate condition watch active — monitor for changes.`;
  } else {
    summary = `${activeAsset} · ${activeTimeframe}: Conditions largely stable — review readiness adequate.`;
  }

  // Category filters
  const structureWatch = items.filter(i => i.category === "structure");
  const liquidityWatch = items.filter(i => i.category === "liquidity");
  const macroWatch = items.filter(i => i.category === "macro");
  const contradictionWatch = items.filter(i => i.category === "contradiction");
  const freshnessWatch = items.filter(i => i.category === "freshness");
  const regimeWatch = items.filter(i => i.category === "regime" || i.category === "volatility");

  return {
    asset: activeAsset,
    timeframe: activeTimeframe,
    topPriority,
    summary,
    items,
    structureWatch,
    liquidityWatch,
    macroWatch,
    contradictionWatch,
    freshnessWatch,
    regimeWatch,
  };
}
