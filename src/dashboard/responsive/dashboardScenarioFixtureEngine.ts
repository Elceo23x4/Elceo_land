/**
 * dashboardScenarioFixtureEngine.ts
 *
 * Deterministic Scenario & Evidence Drilldown Engine for ELCEO Dashboard.
 *
 * Pure function that takes activeAsset, activeTimeframe, and DashboardCognitionSnapshot,
 * then returns structured scenario, condition, and evidence drilldown data.
 *
 * No random. No Date.now. No network. No live data. Safe language only.
 */

import type { DashboardCognitionSnapshot, DashboardCognitionTone } from "./dashboardCognitionFixtureEngine";

export type ScenarioTone = DashboardCognitionTone;

export interface ScenarioCondition {
  id: string;
  label: string;
  status: "aligned" | "watch" | "contradicting" | "pending";
  tone: ScenarioTone;
  detail: string;
  linkedArea: "structure" | "liquidity" | "macro" | "freshness" | "contradiction" | "regime";
}

export interface ScenarioEvidenceItem {
  id: string;
  label: string;
  category: "macro" | "technical" | "liquidity" | "volatility" | "sentiment" | "structure" | "freshness";
  weight: number;
  tone: ScenarioTone;
  summary: string;
  chartLink?: "structure-zone" | "liquidity-band" | "scenario-path" | "macro-marker" | "contradiction-marker" | "freshness-note";
}

export interface DashboardScenarioSnapshot {
  asset: string;
  timeframe: string;
  primaryScenario: string;
  alternateScenario: string;
  scenarioTone: ScenarioTone;
  scenarioConfidence: number;
  conditionSummary: string;
  reviewWindow: string;
  conditions: ScenarioCondition[];
  evidenceItems: ScenarioEvidenceItem[];
  contradictionItems: ScenarioEvidenceItem[];
  freshnessItems: ScenarioEvidenceItem[];
  cautionNote: string;
}

/* ─── Asset Scenario Profiles ─── */

interface AssetScenarioProfile {
  primaryScenario: string;
  alternateScenario: string;
  conditions: Omit<ScenarioCondition, "id">[];
  evidenceItems: Omit<ScenarioEvidenceItem, "id" | "weight">[];
  contradictionItems: Omit<ScenarioEvidenceItem, "id" | "weight">[];
  freshnessItems: Omit<ScenarioEvidenceItem, "id" | "weight">[];
}

const SCENARIO_PROFILES: Record<string, AssetScenarioProfile> = {
  "XAU/USD": {
    primaryScenario: "Upside pressure toward structure zone confirmation. USD softness and yield stability support continuation.",
    alternateScenario: "Pullback toward demand zone if CPI surprise strengthens USD or risk appetite collapses.",
    conditions: [
      { label: "Structure confirmation", status: "watch", tone: "warning", detail: "Structure zone requires sustained confirmation before scenario escalation.", linkedArea: "structure" },
      { label: "USD direction", status: "aligned", tone: "positive", detail: "USD softness supports the primary scenario path.", linkedArea: "macro" },
      { label: "Liquidity depth", status: "aligned", tone: "positive", detail: "Adequate liquidity supports scenario without stress.", linkedArea: "liquidity" },
      { label: "Event risk", status: "watch", tone: "warning", detail: "CPI release pending — may shift scenario conditions.", linkedArea: "macro" },
      { label: "Cross-asset contradiction", status: "contradicting", tone: "negative", detail: "Risk-on equities contradict defensive asset context.", linkedArea: "contradiction" },
      { label: "Source freshness", status: "aligned", tone: "positive", detail: "Primary sources current. Macro extraction pending.", linkedArea: "freshness" },
    ],
    evidenceItems: [
      { label: "Momentum", category: "technical", tone: "positive", summary: "Elevated directional flow above structure zone.", chartLink: "structure-zone" },
      { label: "Structure zone", category: "structure", tone: "positive", summary: "Key structure level — bias depends on confirmation here.", chartLink: "structure-zone" },
      { label: "USD context", category: "macro", tone: "positive", summary: "Dollar softness supports upside scenario path.", chartLink: "macro-marker" },
      { label: "Volume profile", category: "liquidity", tone: "positive", summary: "Volume concentration supports demand at structure.", chartLink: "liquidity-band" },
      { label: "Scenario path", category: "technical", tone: "positive", summary: "Primary path toward structure continuation.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Risk-on equities", category: "sentiment", tone: "warning", summary: "Equity firmness contradicts safe-haven thesis.", chartLink: "contradiction-marker" },
      { label: "USD mixed signals", category: "macro", tone: "warning", summary: "Dollar weakening on data but yields not confirming.", chartLink: "macro-marker" },
      { label: "Event risk pending", category: "macro", tone: "warning", summary: "CPI release may invalidate current evidence alignment.", chartLink: "macro-marker" },
    ],
    freshnessItems: [
      { label: "Market data", category: "freshness", tone: "warning", summary: "Market data pending — fixture mode active.", chartLink: "freshness-note" },
      { label: "Macro extraction", category: "freshness", tone: "warning", summary: "Macro extraction pending source readiness.", chartLink: "freshness-note" },
      { label: "Chart data", category: "freshness", tone: "positive", summary: "Chart fixture data current for scenario review." },
    ],
  },
  "NAS100": {
    primaryScenario: "Momentum continuation above structure. Tech earnings cycle and Fed patience support active scenario.",
    alternateScenario: "Pullback if rate expectations shift hawkish or tech earnings cycle disappoints.",
    conditions: [
      { label: "Momentum persistence", status: "aligned", tone: "positive", detail: "Momentum above structure confirms active continuation.", linkedArea: "structure" },
      { label: "Fed rate path", status: "aligned", tone: "positive", detail: "Fed patience supports risk-on equity environment.", linkedArea: "macro" },
      { label: "Earnings cycle", status: "watch", tone: "warning", detail: "Earnings season requires session-by-session freshness.", linkedArea: "macro" },
      { label: "Liquidity", status: "aligned", tone: "positive", detail: "Strong US session liquidity supports scenario.", linkedArea: "liquidity" },
      { label: "Rate contradiction", status: "watch", tone: "warning", detail: "Rate uncertainty creates mild confidence headwind.", linkedArea: "contradiction" },
    ],
    evidenceItems: [
      { label: "Tech momentum", category: "technical", tone: "positive", summary: "Active momentum above key structure levels.", chartLink: "structure-zone" },
      { label: "Volume profile", category: "liquidity", tone: "positive", summary: "Volume supports continuation above structure.", chartLink: "liquidity-band" },
      { label: "Fed patience", category: "macro", tone: "positive", summary: "Rate path clarity supports equity risk appetite.", chartLink: "macro-marker" },
      { label: "Risk-on tilt", category: "sentiment", tone: "positive", summary: "Broad risk sentiment supports equity continuation.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Rate path uncertainty", category: "macro", tone: "warning", summary: "Rate expectations could shift on macro data.", chartLink: "macro-marker" },
      { label: "Earnings disappointment risk", category: "sentiment", tone: "warning", summary: "Tech earnings miss could reverse sentiment quickly.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Earnings data", category: "freshness", tone: "warning", summary: "Earnings freshness requires session-by-session review.", chartLink: "freshness-note" },
      { label: "Market data", category: "freshness", tone: "warning", summary: "Market data pending — fixture mode active." },
    ],
  },
  "SPX500": {
    primaryScenario: "Broad equity continuation conditional on macro clarity. CPI pending before scenario escalation.",
    alternateScenario: "Pullback if CPI surprises above consensus or breadth narrows further.",
    conditions: [
      { label: "CPI clarity", status: "pending", tone: "warning", detail: "CPI release pending — scenario cannot escalate until resolved.", linkedArea: "macro" },
      { label: "Breadth expansion", status: "watch", tone: "warning", detail: "Breadth narrowing opposes broad continuation thesis.", linkedArea: "structure" },
      { label: "Volatility compression", status: "contradicting", tone: "negative", detail: "Vol compression pre-CPI creates uncertainty.", linkedArea: "contradiction" },
      { label: "Liquidity", status: "aligned", tone: "positive", detail: "Adequate liquidity but breadth moderate.", linkedArea: "liquidity" },
    ],
    evidenceItems: [
      { label: "Broad structure", category: "structure", tone: "warning", summary: "Structure requires macro confirmation before escalation.", chartLink: "structure-zone" },
      { label: "Macro event", category: "macro", tone: "warning", summary: "CPI release is the primary pending catalyst.", chartLink: "macro-marker" },
      { label: "Breadth", category: "technical", tone: "warning", summary: "Breadth narrowing weakens broad continuation evidence.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Vol compression", category: "volatility", tone: "negative", summary: "Volatility compression contradicts trending regime.", chartLink: "contradiction-marker" },
      { label: "Breadth narrowing", category: "technical", tone: "warning", summary: "Narrow leadership opposes broad continuation.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Pre-CPI state", category: "freshness", tone: "warning", summary: "Pre-event environment limits source confidence.", chartLink: "freshness-note" },
    ],
  },
  "DE30": {
    primaryScenario: "No active scenario — awaiting catalyst from ECB communication or US session direction.",
    alternateScenario: "Follows US equity direction if catalyst emerges. ECB communication could trigger independent move.",
    conditions: [
      { label: "Catalyst required", status: "pending", tone: "neutral", detail: "No active catalyst. European equities follow US risk tone.", linkedArea: "macro" },
      { label: "ECB policy", status: "watch", tone: "neutral", detail: "ECB dovish lean provides background but no directional trigger.", linkedArea: "macro" },
      { label: "US direction", status: "watch", tone: "neutral", detail: "US equity direction is the primary leading indicator.", linkedArea: "regime" },
    ],
    evidenceItems: [
      { label: "ECB tone", category: "macro", tone: "neutral", summary: "Dovish lean provides background context only.", chartLink: "macro-marker" },
      { label: "US session lead", category: "sentiment", tone: "neutral", summary: "European equities track US risk direction.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "No contradiction", category: "sentiment", tone: "neutral", summary: "No active contradiction — requires catalyst.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Low urgency", category: "freshness", tone: "neutral", summary: "Low conviction limits freshness urgency.", chartLink: "freshness-note" },
    ],
  },
  "BTC/USD": {
    primaryScenario: "Breakout pending — volume confirmation needed before scenario escalation. Risk-on environment supportive.",
    alternateScenario: "Reversal if risk appetite collapses or regulatory news creates uncertainty.",
    conditions: [
      { label: "Volume confirmation", status: "pending", tone: "warning", detail: "Breakout requires volume confirmation before escalation.", linkedArea: "structure" },
      { label: "Risk sentiment", status: "aligned", tone: "positive", detail: "Risk-on tilt supports speculative appetite.", linkedArea: "regime" },
      { label: "USD weakness", status: "aligned", tone: "positive", detail: "USD softness supports alternative asset context.", linkedArea: "macro" },
      { label: "Regulatory risk", status: "watch", tone: "warning", detail: "Regulatory uncertainty creates background caution.", linkedArea: "contradiction" },
      { label: "24/7 market risk", status: "watch", tone: "warning", detail: "Continuous market means weekend/off-hours risk.", linkedArea: "liquidity" },
    ],
    evidenceItems: [
      { label: "Momentum", category: "technical", tone: "positive", summary: "Active momentum toward breakout structure.", chartLink: "structure-zone" },
      { label: "Volume profile", category: "liquidity", tone: "warning", summary: "Volume needs confirmation before scenario escalation.", chartLink: "liquidity-band" },
      { label: "Risk correlation", category: "sentiment", tone: "positive", summary: "Correlated with broad risk-on sentiment.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Regulatory uncertainty", category: "macro", tone: "warning", summary: "Regulatory news could reverse speculative appetite.", chartLink: "contradiction-marker" },
      { label: "Speculative excess", category: "sentiment", tone: "warning", summary: "Speculative appetite vs fundamental uncertainty.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Continuous monitoring", category: "freshness", tone: "warning", summary: "24/7 market requires continuous freshness review.", chartLink: "freshness-note" },
    ],
  },
  "EUR/USD": {
    primaryScenario: "Range-bound — ECB repricing vs USD weakness creates balanced pressure. No clear directional catalyst.",
    alternateScenario: "Breakout if policy divergence catalyst emerges from ECB or Fed communication.",
    conditions: [
      { label: "Policy divergence", status: "pending", tone: "neutral", detail: "Competing macro forces prevent directional clarity.", linkedArea: "macro" },
      { label: "Range structure", status: "aligned", tone: "neutral", detail: "Range boundaries define the current environment.", linkedArea: "structure" },
      { label: "Catalyst required", status: "pending", tone: "neutral", detail: "Breakout requires policy divergence catalyst.", linkedArea: "macro" },
    ],
    evidenceItems: [
      { label: "Rate differential", category: "macro", tone: "neutral", summary: "Rate differential balanced between ECB and Fed.", chartLink: "macro-marker" },
      { label: "Range structure", category: "structure", tone: "neutral", summary: "Range boundaries well-defined — no breakout catalyst.", chartLink: "structure-zone" },
    ],
    contradictionItems: [
      { label: "Balanced forces", category: "macro", tone: "neutral", summary: "ECB dovish lean offset by USD softness.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Range-bound state", category: "freshness", tone: "neutral", summary: "Range-bound limits freshness urgency.", chartLink: "freshness-note" },
    ],
  },
  "GBP/USD": {
    primaryScenario: "Conditional upside if UK GDP data supports. USD weakness provides background support.",
    alternateScenario: "Downside if UK data disappoints while USD reverses strength.",
    conditions: [
      { label: "UK data confirmation", status: "pending", tone: "warning", detail: "UK GDP pending — conditional setup requires data.", linkedArea: "macro" },
      { label: "USD weakness", status: "aligned", tone: "positive", detail: "Dollar softness provides background support.", linkedArea: "macro" },
      { label: "Structure conditional", status: "watch", tone: "warning", detail: "Structure requires UK data to confirm or invalidate.", linkedArea: "structure" },
    ],
    evidenceItems: [
      { label: "UK GDP pending", category: "macro", tone: "warning", summary: "UK data is the primary catalyst for scenario confirmation.", chartLink: "macro-marker" },
      { label: "USD softness", category: "macro", tone: "positive", summary: "Dollar weakness supports conditional upside.", chartLink: "scenario-path" },
      { label: "Conditional structure", category: "structure", tone: "warning", summary: "Structure depends on data confirmation.", chartLink: "structure-zone" },
    ],
    contradictionItems: [
      { label: "Data uncertainty", category: "macro", tone: "warning", summary: "UK data uncertainty creates conditional bias.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Pre-data state", category: "freshness", tone: "warning", summary: "Pre-data environment limits source confidence.", chartLink: "freshness-note" },
    ],
  },
  "USD/JPY": {
    primaryScenario: "Intervention risk zone — downside pressure from BoJ rhetoric. Caution on further upside extension.",
    alternateScenario: "Continuation upside if US yields spike and BoJ remains passive.",
    conditions: [
      { label: "Intervention zone", status: "aligned", tone: "negative", detail: "Intervention rhetoric creating active downside pressure.", linkedArea: "structure" },
      { label: "Yield differential", status: "contradicting", tone: "warning", detail: "US yield support opposes intervention downside.", linkedArea: "contradiction" },
      { label: "BoJ rhetoric", status: "aligned", tone: "negative", detail: "BoJ verbal intervention elevating caution.", linkedArea: "macro" },
      { label: "Freshness critical", status: "watch", tone: "warning", detail: "Intervention risk requires elevated monitoring.", linkedArea: "freshness" },
    ],
    evidenceItems: [
      { label: "Intervention zone", category: "structure", tone: "negative", summary: "Proximity to intervention zone is primary context.", chartLink: "structure-zone" },
      { label: "BoJ rhetoric", category: "macro", tone: "negative", summary: "Verbal intervention elevating downside pressure.", chartLink: "macro-marker" },
      { label: "Yield differential", category: "macro", tone: "warning", summary: "US yields provide opposing upside support.", chartLink: "contradiction-marker" },
    ],
    contradictionItems: [
      { label: "Yield vs intervention", category: "macro", tone: "warning", summary: "US yield support vs BoJ intervention creates tension.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Intervention monitoring", category: "freshness", tone: "warning", summary: "Intervention risk requires elevated freshness.", chartLink: "freshness-note" },
    ],
  },
  "USD/CHF": {
    primaryScenario: "No active setup — safe-haven flows mixed with SNB policy offset. Awaiting geopolitical catalyst.",
    alternateScenario: "Directional move if geopolitical risk event triggers safe-haven flow shift.",
    conditions: [
      { label: "Catalyst required", status: "pending", tone: "neutral", detail: "No active catalyst. Mixed safe-haven flows.", linkedArea: "macro" },
      { label: "SNB policy", status: "watch", tone: "neutral", detail: "SNB rate environment offsets safe-haven demand.", linkedArea: "regime" },
    ],
    evidenceItems: [
      { label: "Safe-haven balance", category: "sentiment", tone: "neutral", summary: "Mixed flows prevent directional clarity.", chartLink: "scenario-path" },
      { label: "SNB policy", category: "macro", tone: "neutral", summary: "SNB rate environment provides background context.", chartLink: "macro-marker" },
    ],
    contradictionItems: [
      { label: "No contradiction", category: "sentiment", tone: "neutral", summary: "No active contradiction — requires catalyst.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Low urgency", category: "freshness", tone: "neutral", summary: "Low conviction limits freshness urgency.", chartLink: "freshness-note" },
    ],
  },
  "AUD/USD": {
    primaryScenario: "Range-bound — no catalyst active. China PMI weakness offsets USD softness.",
    alternateScenario: "Directional move if China data improves or commodity prices shift significantly.",
    conditions: [
      { label: "China data catalyst", status: "pending", tone: "neutral", detail: "China PMI weakness prevents directional clarity.", linkedArea: "macro" },
      { label: "Commodity correlation", status: "watch", tone: "neutral", detail: "Iron ore and commodity prices provide background.", linkedArea: "regime" },
    ],
    evidenceItems: [
      { label: "China PMI", category: "macro", tone: "neutral", summary: "China weakness offsets USD softness.", chartLink: "macro-marker" },
      { label: "Commodity prices", category: "macro", tone: "neutral", summary: "Iron ore direction provides background context.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Offsetting forces", category: "macro", tone: "neutral", summary: "China weakness vs USD softness creates balance.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Awaiting catalyst", category: "freshness", tone: "neutral", summary: "No catalyst active — freshness on next data.", chartLink: "freshness-note" },
    ],
  },
  "NZD/USD": {
    primaryScenario: "No active scenario — low conviction without local catalyst. Follows AUD direction.",
    alternateScenario: "Move on RBNZ communication or dairy auction catalyst.",
    conditions: [
      { label: "Local catalyst", status: "pending", tone: "neutral", detail: "No RBNZ or dairy catalyst active.", linkedArea: "macro" },
      { label: "AUD correlation", status: "aligned", tone: "neutral", detail: "Follows AUD direction with lower liquidity.", linkedArea: "regime" },
    ],
    evidenceItems: [
      { label: "RBNZ path", category: "macro", tone: "neutral", summary: "RBNZ policy is the primary local driver.", chartLink: "macro-marker" },
      { label: "AUD correlation", category: "sentiment", tone: "neutral", summary: "Follows AUD with amplified moves due to lower liquidity.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Low liquidity risk", category: "liquidity", tone: "neutral", summary: "Lower liquidity amplifies moves when catalyst emerges.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Low urgency", category: "freshness", tone: "neutral", summary: "Low conviction limits freshness urgency.", chartLink: "freshness-note" },
    ],
  },
  "USD/CAD": {
    primaryScenario: "Oil correlation watch — no clear directional bias without energy catalyst.",
    alternateScenario: "Directional move if oil inventory data or BoC communication provides catalyst.",
    conditions: [
      { label: "Oil direction", status: "pending", tone: "neutral", detail: "Oil price is the primary directional driver.", linkedArea: "macro" },
      { label: "BoC rate path", status: "watch", tone: "neutral", detail: "BoC policy provides secondary context.", linkedArea: "macro" },
      { label: "USD broad direction", status: "watch", tone: "neutral", detail: "USD broad direction interacts with oil correlation.", linkedArea: "regime" },
    ],
    evidenceItems: [
      { label: "Oil correlation", category: "macro", tone: "neutral", summary: "Oil price direction drives CAD context.", chartLink: "macro-marker" },
      { label: "BoC rate path", category: "macro", tone: "neutral", summary: "BoC policy provides secondary rate context.", chartLink: "scenario-path" },
    ],
    contradictionItems: [
      { label: "Oil vs USD", category: "macro", tone: "neutral", summary: "Oil weakness with USD softness creates offsetting forces.", chartLink: "contradiction-marker" },
    ],
    freshnessItems: [
      { label: "Energy data freshness", category: "freshness", tone: "neutral", summary: "Oil price freshness drives CAD context review.", chartLink: "freshness-note" },
    ],
  },
};

/* ─── Helper: clamp ─── */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(v)));
}

/* ─── Main Scenario Engine Function ─── */

export function getDashboardScenarioSnapshot(
  activeAsset: string,
  activeTimeframe: string,
  cognition: DashboardCognitionSnapshot
): DashboardScenarioSnapshot {
  const profile = SCENARIO_PROFILES[activeAsset] ?? SCENARIO_PROFILES["XAU/USD"];

  // Derive scenarioConfidence from cognition scores
  const rawConfidence = (cognition.confidenceScore * 0.5 + cognition.evidenceWeight * 0.3 + cognition.zoneStrengthScore * 0.2);
  const contradictionPenalty = cognition.contradictionScore > 40 ? (cognition.contradictionScore - 40) * 0.4 : 0;
  const freshnessPenalty = cognition.freshnessScore < 60 ? (60 - cognition.freshnessScore) * 0.3 : 0;
  const scenarioConfidence = clamp(rawConfidence - contradictionPenalty - freshnessPenalty, 0, 100);

  // Condition summary derived from cognition state
  let conditionSummary: string;
  if (cognition.contradictionScore >= 45) {
    conditionSummary = "Contradiction elevated — scenario confidence capped until alignment improves.";
  } else if (cognition.freshnessScore < 60) {
    conditionSummary = "Freshness watch active — review source state before scenario escalation.";
  } else if (cognition.zoneStrengthScore >= 70) {
    conditionSummary = "Structure confirmed — primary scenario conditions largely aligned.";
  } else if (cognition.confidenceScore >= 60) {
    conditionSummary = "Moderate alignment — scenario active but confirmation pending.";
  } else {
    conditionSummary = "Low conviction — scenario requires catalyst before engagement.";
  }

  // Assign IDs and compute weights for evidence items
  const evidenceItems: ScenarioEvidenceItem[] = profile.evidenceItems.map((item, i) => ({
    ...item,
    id: `ev-${activeAsset.replace("/", "")}-${i}`,
    weight: clamp(cognition.evidenceWeight + (item.tone === "positive" ? 5 : item.tone === "warning" ? -5 : -10), 0, 100),
  }));

  const contradictionItems: ScenarioEvidenceItem[] = profile.contradictionItems.map((item, i) => ({
    ...item,
    id: `ct-${activeAsset.replace("/", "")}-${i}`,
    weight: clamp(cognition.contradictionScore + (i * 3), 0, 100),
  }));

  const freshnessItems: ScenarioEvidenceItem[] = profile.freshnessItems.map((item, i) => ({
    ...item,
    id: `fr-${activeAsset.replace("/", "")}-${i}`,
    weight: clamp(cognition.freshnessScore - (item.tone === "warning" ? 10 : 0), 0, 100),
  }));

  // Conditions with IDs
  const conditions: ScenarioCondition[] = profile.conditions.map((cond, i) => ({
    ...cond,
    id: `cond-${activeAsset.replace("/", "")}-${i}`,
  }));

  // Scenario tone: inherit from cognition but override if contradiction is very high
  const scenarioTone: ScenarioTone = cognition.contradictionScore >= 50 ? "warning" : cognition.scenarioTone;

  return {
    asset: activeAsset,
    timeframe: activeTimeframe,
    primaryScenario: profile.primaryScenario,
    alternateScenario: profile.alternateScenario,
    scenarioTone,
    scenarioConfidence,
    conditionSummary,
    reviewWindow: cognition.reviewWindow,
    conditions,
    evidenceItems,
    contradictionItems,
    freshnessItems,
    cautionNote: cognition.cautionNote,
  };
}
