/**
 * dashboardReviewWorkflowFixtureEngine.ts
 *
 * Deterministic Market Review Workflow Fixture Engine for ELCEO Dashboard.
 *
 * Pure function that consumes activeAsset, activeTimeframe, cognition, and scenario,
 * then returns a structured market review workflow with checklist, note draft, and coaching.
 *
 * No random. No Date.now. No network. No live data. No persistence. Safe language only.
 */

import type { DashboardCognitionSnapshot, DashboardCognitionTone } from "./dashboardCognitionFixtureEngine";
import type { DashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";

export type ReviewCheckStatus = "complete" | "watch" | "pending" | "caution";
export type ReviewCheckTone = DashboardCognitionTone;

export interface MarketReviewCheck {
  id: string;
  label: string;
  status: ReviewCheckStatus;
  tone: ReviewCheckTone;
  detail: string;
  linkedArea: "scenario" | "evidence" | "contradiction" | "freshness" | "discipline" | "regime";
}

export interface MarketNoteDraft {
  title: string;
  asset: string;
  timeframe: string;
  summary: string;
  evidenceLine: string;
  contradictionLine: string;
  freshnessLine: string;
  cautionLine: string;
  reviewWindow: string;
  tags: string[];
}

export interface DashboardReviewWorkflowSnapshot {
  asset: string;
  timeframe: string;
  reviewState: "ready_for_review" | "needs_freshness_check" | "contradiction_watch" | "scenario_watch";
  reviewTone: ReviewCheckTone;
  readinessScore: number;
  checklist: MarketReviewCheck[];
  noteDraft: MarketNoteDraft;
  coachingPrompt: string;
  disciplineReminder: string;
  nextReviewCue: string;
}

/* ─── Helper: clamp ─── */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(v)));
}

/* ─── Main Engine Function ─── */

export function getDashboardReviewWorkflowSnapshot(
  activeAsset: string,
  activeTimeframe: string,
  cognition: DashboardCognitionSnapshot,
  scenario: DashboardScenarioSnapshot
): DashboardReviewWorkflowSnapshot {

  // Derive reviewState
  let reviewState: DashboardReviewWorkflowSnapshot["reviewState"];
  let reviewTone: ReviewCheckTone;

  if (cognition.freshnessScore < 60) {
    reviewState = "needs_freshness_check";
    reviewTone = "warning";
  } else if (cognition.contradictionScore > 55) {
    reviewState = "contradiction_watch";
    reviewTone = "warning";
  } else if (scenario.scenarioConfidence < 55) {
    reviewState = "scenario_watch";
    reviewTone = "neutral";
  } else {
    reviewState = "ready_for_review";
    reviewTone = "positive";
  }

  // Derive readinessScore
  const readinessScore = clamp(
    (cognition.confidenceScore * 0.3 + cognition.evidenceWeight * 0.25 +
     cognition.freshnessScore * 0.25 + (100 - cognition.contradictionScore) * 0.2),
    0, 100
  );

  // Build checklist
  const checklist: MarketReviewCheck[] = [
    {
      id: "chk-scenario",
      label: "Scenario reviewed",
      status: scenario.scenarioConfidence >= 55 ? "complete" : "watch",
      tone: scenario.scenarioConfidence >= 55 ? "positive" : "neutral",
      detail: scenario.scenarioConfidence >= 55
        ? "Primary scenario conditions largely aligned."
        : "Scenario confidence below threshold — review conditions.",
      linkedArea: "scenario",
    },
    {
      id: "chk-evidence",
      label: "Evidence alignment checked",
      status: cognition.evidenceWeight >= 55 ? "complete" : "watch",
      tone: cognition.evidenceWeight >= 55 ? "positive" : "neutral",
      detail: cognition.evidenceWeight >= 55
        ? "Evidence weight supports current scenario context."
        : "Evidence weight moderate — review stack before escalation.",
      linkedArea: "evidence",
    },
    {
      id: "chk-contradiction",
      label: "Contradiction acknowledged",
      status: cognition.contradictionScore >= 45 ? "caution" : cognition.contradictionScore >= 35 ? "watch" : "complete",
      tone: cognition.contradictionScore >= 45 ? "warning" : cognition.contradictionScore >= 35 ? "neutral" : "positive",
      detail: cognition.contradictionScore >= 45
        ? "Elevated contradiction — document before proceeding."
        : cognition.contradictionScore >= 35
        ? "Moderate contradiction — monitor for changes."
        : "Contradiction within acceptable range.",
      linkedArea: "contradiction",
    },
    {
      id: "chk-freshness",
      label: "Source freshness verified",
      status: cognition.freshnessScore >= 70 ? "complete" : cognition.freshnessScore >= 60 ? "watch" : "pending",
      tone: cognition.freshnessScore >= 70 ? "positive" : cognition.freshnessScore >= 60 ? "neutral" : "warning",
      detail: cognition.freshnessScore >= 70
        ? "Source freshness adequate for current review."
        : cognition.freshnessScore >= 60
        ? "Freshness acceptable but approaching watch threshold."
        : "Freshness below threshold — verify sources before review.",
      linkedArea: "freshness",
    },
    {
      id: "chk-discipline",
      label: "Discipline check",
      status: readinessScore >= 60 ? "complete" : "watch",
      tone: readinessScore >= 60 ? "positive" : "neutral",
      detail: readinessScore >= 60
        ? "Readiness gate passed — scenario review may proceed."
        : "Readiness below gate — review evidence and freshness first.",
      linkedArea: "discipline",
    },
    {
      id: "chk-regime",
      label: "Market regime context",
      status: cognition.zoneStrengthScore >= 60 ? "complete" : "watch",
      tone: cognition.zoneStrengthScore >= 60 ? "positive" : "neutral",
      detail: cognition.zoneStrengthScore >= 60
        ? "Regime context supports current zone structure."
        : "Zone structure not confirmed — monitor regime alignment.",
      linkedArea: "regime",
    },
  ];

  // Build market note draft
  const noteDraft: MarketNoteDraft = {
    title: `${activeAsset} · ${activeTimeframe} Market Review`,
    asset: activeAsset,
    timeframe: activeTimeframe,
    summary: scenario.primaryScenario,
    evidenceLine: cognition.evidenceSummary,
    contradictionLine: cognition.contradictionReason,
    freshnessLine: cognition.freshnessReason,
    cautionLine: scenario.cautionNote,
    reviewWindow: scenario.reviewWindow,
    tags: [activeAsset.replace("/", ""), activeTimeframe, "scenario", "evidence", "review"],
  };

  // Coaching prompt
  let coachingPrompt: string;
  if (reviewState === "ready_for_review") {
    coachingPrompt = `${activeAsset} scenario review is ready. Document your reasoning and review the evidence alignment before the next review window.`;
  } else if (reviewState === "needs_freshness_check") {
    coachingPrompt = `Source freshness requires verification for ${activeAsset}. Check source state before escalating scenario confidence.`;
  } else if (reviewState === "contradiction_watch") {
    coachingPrompt = `Contradiction elevated on ${activeAsset}. Acknowledge the contradiction context and document your reasoning before proceeding.`;
  } else {
    coachingPrompt = `${activeAsset} scenario requires further confirmation. Review conditions and evidence alignment before the next session.`;
  }

  // Discipline reminder
  const disciplineReminder = readinessScore >= 60
    ? "Readiness gate passed. Document reasoning and review before next window."
    : "Readiness below gate. Review evidence stack and freshness before scenario escalation.";

  // Next review cue
  const nextReviewCue = scenario.reviewWindow;

  return {
    asset: activeAsset,
    timeframe: activeTimeframe,
    reviewState,
    reviewTone,
    readinessScore,
    checklist,
    noteDraft,
    coachingPrompt,
    disciplineReminder,
    nextReviewCue,
  };
}
