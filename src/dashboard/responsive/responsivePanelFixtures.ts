/**
 * responsivePanelFixtures.ts
 *
 * Premium typed fixture data for all 7 dashboard panels.
 * No live data. No network calls. No timers.
 * Uses safe language only — bias, pressure, evidence, caution.
 */

export type Tone = "positive" | "negative" | "warning" | "neutral" | "stale" | "pending";

export interface DriverItem {
  label: string;
  tone: Tone;
  summary: string;
  freshness: string;
}

export interface ConfidenceMetric {
  label: string;
  value: string;
  tone: Tone;
  score: number; // 0–100
}

export interface WatchlistAsset {
  ticker: string;
  name: string;
  last: string;
  change: string;
  changeTone: Tone;
  bias: string;
  biasTone: Tone;
  confidence: string;
}

export interface EvidenceItem {
  category: string;
  label: string;
  value: string;
  tone: Tone;
  score: number;
  freshness: string;
}

export interface MacroHeadline {
  title: string;
  impact: "high" | "medium" | "low";
  tone: Tone;
  source: string;
  time: string;
}

export interface MacroEvent {
  label: string;
  time: string;
  impact: "high" | "medium" | "low";
  status: string;
}

export interface CoachingTile {
  label: string;
  message: string;
  tone: Tone;
}

export interface RegimePulse {
  asset: string;
  direction: string;
  tone: Tone;
  strength: number;
}

/* ═══════════════════════════════════════════════════════════════════════
   DIRECTIONAL BIAS
   ═══════════════════════════════════════════════════════════════════════ */

export const biasFixture = {
  headline: "Upside pressure forming",
  direction: "upside pressure",
  strength: "elevated",
  strengthTone: "positive" as Tone,
  condition: "conditional",
  conditionTone: "warning" as Tone,
  watchCondition: "Watch whether momentum sustains above the latest internal structure zone.",
  invalidation: "Bias weakens if the structure fails to sustain through the next review window.",
  drivers: [
    { label: "Momentum pressure", tone: "positive" as Tone, summary: "Elevated directional flow in fixture data", freshness: "Current" },
    { label: "Macro tension", tone: "warning" as Tone, summary: "Mixed signals from broader context drivers", freshness: "Watch" },
    { label: "Data freshness", tone: "neutral" as Tone, summary: "Within acceptable review window", freshness: "OK" },
  ] satisfies DriverItem[],
  status: "Fixture Mode" as const,
};

/* ═══════════════════════════════════════════════════════════════════════
   CONFIDENCE & CONTEXT
   ═══════════════════════════════════════════════════════════════════════ */

export const confidenceFixture = {
  metrics: [
    { label: "Confidence", value: "Moderate", tone: "neutral" as Tone, score: 58 },
    { label: "Contradiction", value: "Medium", tone: "warning" as Tone, score: 42 },
    { label: "Freshness", value: "Watch", tone: "warning" as Tone, score: 55 },
    { label: "Zone strength", value: "Elevated", tone: "positive" as Tone, score: 72 },
  ] satisfies ConfidenceMetric[],
  conflicts: [
    { label: "Momentum vs macro", detail: "Momentum supports bias but macro context unresolved" },
    { label: "Freshness lag", detail: "Some driver inputs approaching staleness threshold" },
  ],
  summary: "Confidence moderate due to medium contradiction between drivers.",
  dataQuality: 64,
};

/* ═══════════════════════════════════════════════════════════════════════
   WATCHLIST
   ═══════════════════════════════════════════════════════════════════════ */

export const watchlistFixture: WatchlistAsset[] = [
  { ticker: "ES", name: "S&P 500 E-mini", last: "5,842", change: "+0.38%", changeTone: "positive", bias: "Upside pressure", biasTone: "positive", confidence: "Moderate" },
  { ticker: "NQ", name: "Nasdaq 100", last: "20,714", change: "+0.52%", changeTone: "positive", bias: "Active bias", biasTone: "positive", confidence: "Elevated" },
  { ticker: "YM", name: "Dow E-mini", last: "43,120", change: "-0.08%", changeTone: "negative", bias: "No setup", biasTone: "neutral", confidence: "Low" },
  { ticker: "RTY", name: "Russell 2000", last: "2,284", change: "+0.12%", changeTone: "neutral", bias: "Conditional", biasTone: "warning", confidence: "Watch" },
  { ticker: "GC", name: "Gold", last: "2,418", change: "+0.24%", changeTone: "positive", bias: "Watching", biasTone: "neutral", confidence: "Pending" },
];

/* ═══════════════════════════════════════════════════════════════════════
   EVIDENCE STACK
   ═══════════════════════════════════════════════════════════════════════ */

export const evidenceFixture: EvidenceItem[] = [
  { category: "Technical", label: "Momentum", value: "Elevated", tone: "positive", score: 78, freshness: "Current" },
  { category: "Technical", label: "Structure", value: "Confirming", tone: "positive", score: 72, freshness: "Current" },
  { category: "Technical", label: "Volume profile", value: "Neutral", tone: "neutral", score: 50, freshness: "Current" },
  { category: "Macro", label: "Macro context", value: "Mixed", tone: "warning", score: 45, freshness: "Watch" },
  { category: "Sentiment", label: "Breadth", value: "Supportive", tone: "positive", score: 65, freshness: "Current" },
  { category: "Sentiment", label: "Sentiment", value: "Cautious", tone: "warning", score: 40, freshness: "Watch" },
  { category: "Volatility", label: "Vol regime", value: "Moderate", tone: "neutral", score: 55, freshness: "Current" },
];

export const evidenceConviction = 62;

/* ═══════════════════════════════════════════════════════════════════════
   NEWS & MACRO
   ═══════════════════════════════════════════════════════════════════════ */

export const newsFixture: MacroHeadline[] = [
  { title: "Fed minutes released — no surprise", impact: "medium", tone: "neutral", source: "Fixture", time: "2h ago" },
  { title: "CPI print pending next session", impact: "high", tone: "warning", source: "Fixture", time: "Tomorrow" },
  { title: "Earnings season early phase", impact: "low", tone: "neutral", source: "Fixture", time: "Ongoing" },
  { title: "Geopolitical tension low impact today", impact: "low", tone: "neutral", source: "Fixture", time: "Today" },
  { title: "Treasury auction demand strong", impact: "medium", tone: "positive", source: "Fixture", time: "3h ago" },
  { title: "Oil inventories draw larger than expected", impact: "medium", tone: "warning", source: "Fixture", time: "5h ago" },
  { title: "China PMI below consensus", impact: "high", tone: "negative", source: "Fixture", time: "Yesterday" },
  { title: "ECB rate path unchanged — dovish tilt", impact: "medium", tone: "positive", source: "Fixture", time: "Yesterday" },
];

export const macroEvents: MacroEvent[] = [
  { label: "CPI YoY", time: "Tomorrow 08:30 ET", impact: "high", status: "Pending" },
  { label: "Jobless claims", time: "Thursday 08:30 ET", impact: "medium", status: "Scheduled" },
  { label: "Fed speaker", time: "Friday 14:00 ET", impact: "medium", status: "Scheduled" },
];

/* ═══════════════════════════════════════════════════════════════════════
   COACHING INSIGHTS
   ═══════════════════════════════════════════════════════════════════════ */

export const coachingFixture = {
  headline: "Wait for structure confirmation",
  body: "Current momentum supports bias direction, but entry should wait for structural confirmation at the identified zone. Do not front-run without evidence alignment.",
  tiles: [
    { label: "Patience", message: "Structure first, then action", tone: "positive" as Tone },
    { label: "Contradiction", message: "Acknowledge mixed macro signals", tone: "warning" as Tone },
    { label: "Journal", message: "Log reasoning before decisions", tone: "neutral" as Tone },
  ] satisfies CoachingTile[],
  checklist: [
    "Structure zone confirmed?",
    "Evidence stack aligned?",
    "Contradiction resolved?",
    "Freshness acceptable?",
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   MARKET REGIME
   ═══════════════════════════════════════════════════════════════════════ */

export const regimeFixture: RegimePulse[] = [
  { asset: "Gold", direction: "Bid", tone: "positive", strength: 68 },
  { asset: "USD Index", direction: "Soft", tone: "warning", strength: 42 },
  { asset: "Equities", direction: "Firm", tone: "positive", strength: 65 },
  { asset: "Yields", direction: "Flat", tone: "neutral", strength: 50 },
  { asset: "Crypto", direction: "Mixed", tone: "warning", strength: 48 },
  { asset: "Risk Sentiment", direction: "Risk-on tilt", tone: "positive", strength: 62 },
];

export const regimeStrip = [
  { label: "Regime", value: "Trending", tone: "positive" as Tone },
  { label: "Volatility", value: "Moderate", tone: "neutral" as Tone },
  { label: "Liquidity", value: "Adequate", tone: "positive" as Tone },
  { label: "Correlation", value: "Elevated", tone: "warning" as Tone },
];
