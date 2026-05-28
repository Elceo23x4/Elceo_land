/**
 * responsivePanelFixtures.ts
 *
 * ELCEO-tailored fixture data for all 7 dashboard panels.
 * No live data. No network calls. No timers.
 * Uses safe language only — bias, pressure, evidence, caution.
 * Featured assets: XAU/USD, NAS100, SPX500, DE30, BTC/USD, major FX.
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
  score: number;
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
  sparkline: number[];
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
   DIRECTIONAL BIAS — XAU/USD focused
   ═══════════════════════════════════════════════════════════════════════ */

export const biasFixture = {
  activeAsset: "XAU/USD",
  session: "London/NY Overlap",
  headline: "Upside pressure forming on XAU/USD",
  direction: "Upside Pressure",
  strength: "Elevated",
  strengthTone: "positive" as Tone,
  condition: "Conditional",
  conditionTone: "warning" as Tone,
  watchCondition: "Watch whether momentum sustains above the 2,420 structure zone through NY session close.",
  invalidation: "Bias weakens if price fails to sustain above the identified zone during the next review window.",
  drivers: [
    { label: "Momentum", tone: "positive" as Tone, summary: "Elevated directional flow above structure zone", freshness: "Current" },
    { label: "USD softness", tone: "positive" as Tone, summary: "Dollar index retreating, supports gold bid", freshness: "Current" },
    { label: "Safe-haven demand", tone: "positive" as Tone, summary: "Geopolitical uncertainty supporting precious metals", freshness: "Current" },
    { label: "Macro tension", tone: "warning" as Tone, summary: "Risk-on equities contradicting safe-haven gold bid", freshness: "Watch" },
    { label: "Yield pressure", tone: "neutral" as Tone, summary: "Real yields flat — not opposing or supporting", freshness: "Current" },
  ] satisfies DriverItem[],
  status: "Fixture Mode" as const,
  reviewWindow: "Next session open",
  macroPressure: "USD softness / Yields flat / Safe-haven demand",
  contradiction: "Risk-on equities vs safe-haven gold bid",
};

/* ═══════════════════════════════════════════════════════════════════════
   CONFIDENCE & CONTEXT
   ═══════════════════════════════════════════════════════════════════════ */

export const confidenceFixture = {
  metrics: [
    { label: "Confidence", value: "Moderate-High", tone: "positive" as Tone, score: 68 },
    { label: "Contradiction", value: "Medium", tone: "warning" as Tone, score: 42 },
    { label: "Freshness", value: "Current", tone: "positive" as Tone, score: 78 },
    { label: "Zone strength", value: "Elevated", tone: "positive" as Tone, score: 74 },
  ] satisfies ConfidenceMetric[],
  conflicts: [
    { label: "Risk-on vs safe-haven", detail: "Equities firm while gold also bid — cross-asset contradiction" },
    { label: "USD mixed signals", detail: "Dollar weakening on data but yields not confirming direction" },
  ],
  summary: "Confidence moderate-high. Contradiction between risk appetite and defensive positioning.",
  dataQuality: 72,
  freshnessScore: 78,
  confidenceScore: 68,
  zoneStrength: 74,
};

/* ═══════════════════════════════════════════════════════════════════════
   WATCHLIST — ELCEO Featured Assets
   ═══════════════════════════════════════════════════════════════════════ */

export const watchlistFixture: WatchlistAsset[] = [
  { ticker: "XAU/USD", name: "Gold Spot", last: "2,418.50", change: "+0.42%", changeTone: "positive", bias: "Upside pressure", biasTone: "positive", confidence: "Elevated", sparkline: [38, 42, 40, 45, 48, 46, 52, 55] },
  { ticker: "NAS100", name: "Nasdaq 100", last: "20,714", change: "+0.58%", changeTone: "positive", bias: "Active bias", biasTone: "positive", confidence: "Moderate", sparkline: [60, 58, 62, 65, 63, 68, 70, 72] },
  { ticker: "SPX500", name: "S&P 500", last: "5,842", change: "+0.34%", changeTone: "positive", bias: "Conditional", biasTone: "warning", confidence: "Watch", sparkline: [50, 52, 51, 54, 53, 55, 56, 57] },
  { ticker: "DE30", name: "Germany 40", last: "18,245", change: "-0.12%", changeTone: "negative", bias: "No setup", biasTone: "neutral", confidence: "Low", sparkline: [48, 46, 47, 44, 45, 43, 42, 41] },
  { ticker: "BTC/USD", name: "Bitcoin", last: "67,420", change: "+1.24%", changeTone: "positive", bias: "Momentum active", biasTone: "positive", confidence: "Elevated", sparkline: [30, 35, 38, 42, 48, 52, 58, 65] },
  { ticker: "EUR/USD", name: "Euro/Dollar", last: "1.0892", change: "+0.18%", changeTone: "positive", bias: "Watching", biasTone: "neutral", confidence: "Pending", sparkline: [45, 46, 44, 47, 48, 47, 49, 50] },
  { ticker: "GBP/USD", name: "Cable", last: "1.2748", change: "+0.22%", changeTone: "positive", bias: "Conditional", biasTone: "warning", confidence: "Watch", sparkline: [42, 44, 43, 45, 46, 48, 47, 49] },
  { ticker: "USD/JPY", name: "Dollar/Yen", last: "154.82", change: "-0.35%", changeTone: "negative", bias: "Downside pressure", biasTone: "negative", confidence: "Moderate", sparkline: [65, 62, 60, 58, 55, 54, 52, 50] },
];

export const watchlistAlerts = [
  { asset: "XAU/USD", alert: "Structure zone 2,420 — watching for confirmation", tone: "warning" as Tone },
  { asset: "NAS100", alert: "Momentum active above 20,650", tone: "positive" as Tone },
  { asset: "BTC/USD", alert: "Breakout pending — volume increasing", tone: "positive" as Tone },
  { asset: "USD/JPY", alert: "Intervention risk zone approaching", tone: "negative" as Tone },
];

/* ═══════════════════════════════════════════════════════════════════════
   EVIDENCE STACK
   ═══════════════════════════════════════════════════════════════════════ */

export const evidenceFixture: EvidenceItem[] = [
  { category: "Technical", label: "Momentum", value: "Elevated", tone: "positive", score: 78, freshness: "Current" },
  { category: "Technical", label: "Structure", value: "Confirming", tone: "positive", score: 72, freshness: "Current" },
  { category: "Technical", label: "Volume profile", value: "Supportive", tone: "positive", score: 64, freshness: "Current" },
  { category: "Macro", label: "USD weakness", value: "Active", tone: "positive", score: 70, freshness: "Current" },
  { category: "Macro", label: "Yield context", value: "Neutral", tone: "neutral", score: 50, freshness: "Current" },
  { category: "Sentiment", label: "Positioning", value: "Net positive", tone: "positive", score: 62, freshness: "Current" },
  { category: "Sentiment", label: "Risk appetite", value: "Contradicting", tone: "warning", score: 38, freshness: "Watch" },
  { category: "Volatility", label: "Vol regime", value: "Moderate", tone: "neutral", score: 55, freshness: "Current" },
  { category: "Liquidity", label: "Market depth", value: "Adequate", tone: "positive", score: 66, freshness: "Current" },
];

export const evidenceConviction = 65;

/* ═══════════════════════════════════════════════════════════════════════
   NEWS & MACRO
   ═══════════════════════════════════════════════════════════════════════ */

export const newsFixture: MacroHeadline[] = [
  { title: "Fed minutes signal patience on rate path", impact: "high", tone: "warning", source: "Fixture", time: "2h ago" },
  { title: "US CPI print pending — consensus +0.2% MoM", impact: "high", tone: "warning", source: "Fixture", time: "Tomorrow" },
  { title: "ECB holds rates, dovish forward guidance", impact: "medium", tone: "positive", source: "Fixture", time: "Today" },
  { title: "Gold ETF inflows accelerate — 3rd consecutive week", impact: "medium", tone: "positive", source: "Fixture", time: "3h ago" },
  { title: "China PMI contracts below 50 — risk event", impact: "high", tone: "negative", source: "Fixture", time: "Yesterday" },
  { title: "USD Index breaks below 104 support", impact: "medium", tone: "positive", source: "Fixture", time: "5h ago" },
  { title: "Treasury auction 10Y demand strong", impact: "medium", tone: "positive", source: "Fixture", time: "Today" },
  { title: "Geopolitical tensions — Middle East update", impact: "low", tone: "neutral", source: "Fixture", time: "Ongoing" },
];

export const macroEvents: MacroEvent[] = [
  { label: "US CPI YoY", time: "Tomorrow 08:30 ET", impact: "high", status: "Pending" },
  { label: "Initial Jobless Claims", time: "Thursday 08:30 ET", impact: "medium", status: "Scheduled" },
  { label: "Fed Speaker — Williams", time: "Friday 14:00 ET", impact: "medium", status: "Scheduled" },
  { label: "UK GDP MoM", time: "Friday 02:00 ET", impact: "medium", status: "Scheduled" },
  { label: "Michigan Sentiment", time: "Friday 10:00 ET", impact: "low", status: "Scheduled" },
];

/* ═══════════════════════════════════════════════════════════════════════
   COACHING INSIGHTS
   ═══════════════════════════════════════════════════════════════════════ */

export const coachingFixture = {
  headline: "Await structure confirmation on XAU/USD",
  body: "Current momentum supports bias direction. Scenario review should wait for structural confirmation at the 2,420 zone. Confirmation is required before escalation — do not front-run without evidence alignment.",
  tiles: [
    { label: "Patience", message: "Structure confirmation first", tone: "positive" as Tone },
    { label: "Contradiction", message: "Acknowledge risk-on vs safe-haven tension", tone: "warning" as Tone },
    { label: "Journal", message: "Document reasoning before next review", tone: "neutral" as Tone },
    { label: "Session", message: "London/NY overlap — optimal liquidity", tone: "positive" as Tone },
  ] satisfies CoachingTile[],
  checklist: [
    "Structure zone 2,420 confirmed?",
    "Evidence stack aligned above 60%?",
    "Contradiction acknowledged and documented?",
    "Freshness within acceptable window?",
    "Provider status reviewed?",
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   MARKET REGIME — Cross-Asset Pulse
   ═══════════════════════════════════════════════════════════════════════ */

export const regimeFixture: RegimePulse[] = [
  { asset: "Gold", direction: "Bid", tone: "positive", strength: 72 },
  { asset: "USD Index", direction: "Soft", tone: "warning", strength: 38 },
  { asset: "Equities", direction: "Firm", tone: "positive", strength: 65 },
  { asset: "Yields", direction: "Flat", tone: "neutral", strength: 50 },
  { asset: "Crypto", direction: "Risk-on tilt", tone: "positive", strength: 62 },
  { asset: "Risk Sentiment", direction: "Appetite elevated", tone: "positive", strength: 64 },
  { asset: "Volatility", direction: "Moderate-low", tone: "positive", strength: 58 },
];

export const regimeStrip = [
  { label: "Regime", value: "Trending", tone: "positive" as Tone },
  { label: "Volatility", value: "Moderate", tone: "neutral" as Tone },
  { label: "Liquidity", value: "Adequate", tone: "positive" as Tone },
  { label: "Correlation", value: "Elevated", tone: "warning" as Tone },
];
