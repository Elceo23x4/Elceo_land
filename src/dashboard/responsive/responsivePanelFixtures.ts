/**
 * responsivePanelFixtures.ts
 *
 * ELCEO Market Cockpit fixture contract.
 * Market intelligence only. Safe language only.
 */

export type Tone = "positive" | "negative" | "warning" | "neutral" | "stale" | "pending";

/* ═══════════════════════════════════════════════════════════════════════
   ASSET COCKPIT
   ═══════════════════════════════════════════════════════════════════════ */

export const assetCockpitFixture = {
  activeAsset: "XAU/USD",
  timeframe: "1H",
  session: "London/NY Overlap",
  assetClass: "Metals",
  activeScenario: "Upside pressure toward 2,440 structure zone",
  reviewWindow: "Next session open",
  sourceMode: "Fixture Mode",
};

/* ═══════════════════════════════════════════════════════════════════════
   DIRECTIONAL BIAS
   ═══════════════════════════════════════════════════════════════════════ */

export interface DriverItem {
  label: string;
  tone: Tone;
  summary: string;
  freshness: string;
}

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
  scenarios: {
    primary: "Continuation toward 2,440 if structure zone 2,420 confirms",
    alternate: "Pullback toward 2,400 if CPI surprise or USD reversal",
    invalidation: "Sustained break below 2,400 negates current bias",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   CONFIDENCE DECOMPOSITION
   ═══════════════════════════════════════════════════════════════════════ */

export interface ConfidenceMetric {
  label: string;
  value: string;
  tone: Tone;
  score: number;
}

export const confidenceFixture = {
  metrics: [
    { label: "Confidence", value: "Moderate-High", tone: "positive" as Tone, score: 68 },
    { label: "Contradiction", value: "Medium", tone: "warning" as Tone, score: 42 },
    { label: "Freshness", value: "Current", tone: "positive" as Tone, score: 78 },
    { label: "Zone strength", value: "Elevated", tone: "positive" as Tone, score: 74 },
    { label: "Data quality", value: "Good", tone: "positive" as Tone, score: 72 },
    { label: "Condition agreement", value: "Moderate", tone: "neutral" as Tone, score: 58 },
  ] satisfies ConfidenceMetric[],
  conflicts: [
    { label: "Risk-on vs safe-haven", detail: "Equities firm while gold also bid — cross-asset contradiction" },
    { label: "USD mixed conditions", detail: "Dollar weakening on data but yields not confirming direction" },
    { label: "Event risk pending", detail: "CPI release may invalidate current evidence alignment" },
  ],
  whyNotHigher: "Contradiction score (42%) caps effective confidence. Risk-on equities dilute safe-haven conviction.",
  whyNotLower: "Structure confirmation and momentum alignment keep baseline elevated despite macro uncertainty.",
  summary: "Confidence moderate-high. Contradiction between risk appetite and defensive positioning.",
  dataQuality: 72,
};

/* ═══════════════════════════════════════════════════════════════════════
   WATCHLIST — ELCEO Launch Assets
   ═══════════════════════════════════════════════════════════════════════ */

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

export const watchlistFixture: WatchlistAsset[] = [
  { ticker: "XAU/USD", name: "Gold Spot", last: "2,418.50", change: "+0.42%", changeTone: "positive", bias: "Upside pressure", biasTone: "positive", confidence: "Elevated", sparkline: [38, 42, 40, 45, 48, 46, 52, 55] },
  { ticker: "NAS100", name: "Nasdaq 100", last: "20,714", change: "+0.58%", changeTone: "positive", bias: "Active bias", biasTone: "positive", confidence: "Moderate", sparkline: [60, 58, 62, 65, 63, 68, 70, 72] },
  { ticker: "SPX500", name: "S&P 500", last: "5,842", change: "+0.34%", changeTone: "positive", bias: "Conditional", biasTone: "warning", confidence: "Watch", sparkline: [50, 52, 51, 54, 53, 55, 56, 57] },
  { ticker: "DE30", name: "Germany 40", last: "18,245", change: "-0.12%", changeTone: "negative", bias: "No setup", biasTone: "neutral", confidence: "Low", sparkline: [48, 46, 47, 44, 45, 43, 42, 41] },
  { ticker: "BTC/USD", name: "Bitcoin", last: "67,420", change: "+1.24%", changeTone: "positive", bias: "Momentum active", biasTone: "positive", confidence: "Elevated", sparkline: [30, 35, 38, 42, 48, 52, 58, 65] },
];

export const watchlistFxMajors: WatchlistAsset[] = [
  { ticker: "EUR/USD", name: "Euro/Dollar", last: "1.0892", change: "+0.18%", changeTone: "positive", bias: "Watching", biasTone: "neutral", confidence: "Pending", sparkline: [45, 46, 44, 47, 48, 47, 49, 50] },
  { ticker: "GBP/USD", name: "Cable", last: "1.2748", change: "+0.22%", changeTone: "positive", bias: "Conditional", biasTone: "warning", confidence: "Watch", sparkline: [42, 44, 43, 45, 46, 48, 47, 49] },
  { ticker: "USD/JPY", name: "Dollar/Yen", last: "154.82", change: "-0.35%", changeTone: "negative", bias: "Downside pressure", biasTone: "negative", confidence: "Moderate", sparkline: [65, 62, 60, 58, 55, 54, 52, 50] },
  { ticker: "USD/CHF", name: "Dollar/Swiss", last: "0.8845", change: "-0.14%", changeTone: "negative", bias: "Watching", biasTone: "neutral", confidence: "Pending", sparkline: [52, 51, 50, 49, 48, 48, 47, 46] },
  { ticker: "AUD/USD", name: "Aussie/Dollar", last: "0.6678", change: "+0.08%", changeTone: "positive", bias: "No setup", biasTone: "neutral", confidence: "Low", sparkline: [44, 45, 44, 45, 46, 45, 46, 46] },
  { ticker: "NZD/USD", name: "Kiwi/Dollar", last: "0.6142", change: "+0.05%", changeTone: "neutral", bias: "No setup", biasTone: "neutral", confidence: "Low", sparkline: [42, 42, 43, 42, 43, 43, 43, 44] },
  { ticker: "USD/CAD", name: "Dollar/Loonie", last: "1.3612", change: "+0.10%", changeTone: "positive", bias: "Watching", biasTone: "neutral", confidence: "Pending", sparkline: [48, 49, 49, 50, 50, 51, 51, 52] },
];

export const watchlistAlerts = [
  { asset: "XAU/USD", alert: "Structure zone 2,420 — watching for confirmation", tone: "warning" as Tone },
  { asset: "NAS100", alert: "Momentum active above 20,650", tone: "positive" as Tone },
  { asset: "BTC/USD", alert: "Breakout pending — volume increasing", tone: "positive" as Tone },
  { asset: "USD/JPY", alert: "Intervention risk zone approaching", tone: "negative" as Tone },
];

export const scenarioMapFixture = [
  { asset: "XAU/USD", scenario: "Upside toward 2,440 structure zone", status: "Active", tone: "positive" as Tone },
  { asset: "NAS100", scenario: "Momentum continuation above 20,650", status: "Active", tone: "positive" as Tone },
  { asset: "BTC/USD", scenario: "Breakout pending — volume watch", status: "Monitoring", tone: "warning" as Tone },
  { asset: "USD/JPY", scenario: "Downside intervention risk zone", status: "Caution", tone: "negative" as Tone },
];

/* ═══════════════════════════════════════════════════════════════════════
   EVIDENCE STACK
   ═══════════════════════════════════════════════════════════════════════ */

export interface EvidenceItem {
  category: string;
  label: string;
  value: string;
  tone: Tone;
  score: number;
  freshness: string;
}

export const evidenceFixture: EvidenceItem[] = [
  { category: "Technical", label: "Momentum", value: "Elevated", tone: "positive", score: 78, freshness: "Current" },
  { category: "Technical", label: "Structure", value: "Confirming", tone: "positive", score: 72, freshness: "Current" },
  { category: "Technical", label: "Volume profile", value: "Supportive", tone: "positive", score: 64, freshness: "Current" },
  { category: "Macro", label: "USD weakness", value: "Active", tone: "positive", score: 70, freshness: "Current" },
  { category: "Macro", label: "Yield context", value: "Neutral", tone: "neutral", score: 50, freshness: "Current" },
  { category: "Liquidity", label: "Market depth", value: "Adequate", tone: "positive", score: 66, freshness: "Current" },
  { category: "Volatility", label: "Vol regime", value: "Moderate", tone: "neutral", score: 55, freshness: "Current" },
  { category: "Sentiment", label: "Positioning", value: "Net positive", tone: "positive", score: 62, freshness: "Current" },
  { category: "Sentiment", label: "Risk appetite", value: "Contradicting", tone: "warning", score: 38, freshness: "Watch" },
  { category: "Event", label: "CPI pending", value: "Caution", tone: "warning", score: 35, freshness: "Watch" },
];

export const evidenceConviction = 65;

/* ═══════════════════════════════════════════════════════════════════════
   MARKET INSIGHTS
   ═══════════════════════════════════════════════════════════════════════ */

export const marketInsightsFixture = {
  summary: "Gold maintains upside pressure. USD softness and safe-haven demand support the current bias. Contradictions remain from risk-on equities.",
  topSupports: [
    "Momentum elevated above structure zone",
    "USD Index weakening below 104 support",
    "Gold ETF inflows accelerating (3rd week)",
  ],
  topContradictions: [
    "Risk-on equity environment contradicts safe-haven thesis",
    "Sentiment cautious despite supportive technicals",
    "Pending CPI release may disrupt current regime",
  ],
  scenarioNote: "Primary scenario: continuation toward 2,440 if structure confirms. Alternate: pullback to 2,400 if CPI surprises.",
  cautionNote: "Contradiction between risk-on equities and safe-haven gold bid requires monitoring.",
  freshnessNote: "All primary sources current. Macro extraction pending source readiness.",
  nextReviewTrigger: "CPI release tomorrow 08:30 ET or structure zone retest",
  chartOverlayNote: "Chart overlay highlights the active structure zone, liquidity band, and scenario path used by the evidence stack.",
};

/* ═══════════════════════════════════════════════════════════════════════
   SOURCE STATUS (market data source state)
   ═══════════════════════════════════════════════════════════════════════ */

export const sourceStatusFixture = {
  marketData: "Market Data Pending",
  news: "Fixture Mode",
  macro: "Fixture Mode",
  extraction: "Source Pending",
  chartData: "Fixture Mode",
  sourceFreshness: "Source Watch",
};

/* ═══════════════════════════════════════════════════════════════════════
   MACRO INTELLIGENCE
   ═══════════════════════════════════════════════════════════════════════ */

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

export const newsFixture: MacroHeadline[] = [
  { title: "Fed minutes suggest patience cue on rate path", impact: "high", tone: "warning", source: "Fixture", time: "2h ago" },
  { title: "US CPI print pending — consensus +0.2% MoM", impact: "high", tone: "warning", source: "Fixture", time: "Tomorrow" },
  { title: "ECB maintains rates, dovish forward guidance", impact: "medium", tone: "positive", source: "Fixture", time: "Today" },
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

export const currencyCompareFixture = {
  usdVsGold: { label: "USD vs Gold", direction: "Inverse — USD soft, Gold bid", tone: "positive" as Tone },
  usdVsJpy: { label: "USD vs JPY", direction: "USD weakening — intervention zone", tone: "warning" as Tone },
  eurUsd: { label: "EUR/USD context", direction: "Euro firm on ECB dovish repricing", tone: "positive" as Tone },
  realYields: { label: "Real yields", direction: "Flat — not opposing gold", tone: "neutral" as Tone },
};

export const macroPulseFixture = {
  centralBankTone: "Dovish lean — patience indicated",
  liquidity: "Adequate — no stress indicators",
  riskEvent: "CPI release pending — high impact scheduled",
  sourceState: "Fixture Mode — macro extraction pending",
};

/* ═══════════════════════════════════════════════════════════════════════
   COACHING (market-behavior discipline only)
   ═══════════════════════════════════════════════════════════════════════ */

export interface CoachingTile {
  label: string;
  message: string;
  tone: Tone;
}

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
    "Source freshness checked?",
  ],
  behaviorOverlay: {
    recentQuality: "Good — 3 of last 4 reviews documented",
    readinessGate: "Confirmation required before scenario escalation",
    caution: "None currently — maintain discipline",
  },
};

export const journalNoteFixture = {
  asset: "XAU/USD",
  prompt: "What evidence supports the current bias?",
  tags: ["structure", "macro", "discipline", "contradiction"],
  emotionalState: "Controlled",
  disciplineNote: "Awaiting confirmation — not front-running scenario",
  lastNote: "2h ago",
};

export const disciplineFixture = {
  disciplineScore: 72,
  reviewConsistency: 64,
  overconfidenceWatch: "Medium",
  bestSession: "London/NY overlap",
  missedReviews: 2,
  behaviorCaution: "Slight pattern of reviewing without documenting contradictions",
};

/* ═══════════════════════════════════════════════════════════════════════
   MARKET REGIME / CROSS-ASSET PULSE
   ═══════════════════════════════════════════════════════════════════════ */

export interface RegimePulse {
  asset: string;
  direction: string;
  tone: Tone;
  strength: number;
}

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

export const volatilityFixture = {
  regime: "Moderate — no compression or expansion extremes",
  eventRisk: "CPI release proximity elevating short-term vol expectation",
  sessionNote: "NY session typically higher intraday vol than Asian",
};

export const correlationFixture = [
  { pair: "Gold vs USD", direction: "Inverse — strong", tone: "positive" as Tone },
  { pair: "Gold vs Yields", direction: "Mildly inverse — yields flat", tone: "neutral" as Tone },
  { pair: "Equities vs Gold", direction: "Both bid — unusual", tone: "warning" as Tone },
  { pair: "BTC vs Risk", direction: "Correlated — risk-on tilt", tone: "positive" as Tone },
  { pair: "Risk-on vs Risk-off", direction: "Tension — contradicting", tone: "warning" as Tone },
];



/* ═══════════════════════════════════════════════════════════════════════
   ASSET CONTEXT BY SYMBOL — per-asset fixture context for dashboard sync
   ═══════════════════════════════════════════════════════════════════════ */

export interface AssetContext {
  symbol: string;
  label: string;
  assetClass: string;
  timeframe: string;
  bias: string;
  biasTone: Tone;
  primaryLens: string;
  scenario: string;
  marketContext: string;
  evidenceFocus: string;
  macroSensitivity: string;
  macroLink: string;
  regimeLink: string;
  freshnessNote: string;
  reviewWindow: string;
  cautionNote: string;
}

export const assetContextBySymbol: Record<string, AssetContext> = {
  "XAU/USD": {
    symbol: "XAU/USD",
    label: "Gold Spot",
    assetClass: "Metals",
    timeframe: "1H",
    bias: "Upside pressure",
    biasTone: "positive",
    primaryLens: "USD and real-yield pressure",
    scenario: "Upside pressure remains tied to structure confirmation.",
    marketContext: "Gold context is sensitive to USD softness, yield stability, and event-risk caution.",
    evidenceFocus: "Structure zone, liquidity band, and macro pressure remain the key evidence layers.",
    macroSensitivity: "USD, real yields, and risk sentiment",
    macroLink: "USD softness and yield stability remain the primary context",
    regimeLink: "Gold remains linked to USD direction, yield pressure, and defensive demand.",
    freshnessNote: "Source freshness should be reviewed before stronger scenario confidence.",
    reviewWindow: "Next session open",
    cautionNote: "Contradiction rises if USD strength and equity risk appetite expand together.",
  },
  "NAS100": {
    symbol: "NAS100",
    label: "Nasdaq 100",
    assetClass: "Indices",
    timeframe: "1H",
    bias: "Active bias",
    biasTone: "positive",
    primaryLens: "Tech momentum and Fed rate path expectations",
    scenario: "Momentum continuation above 20,650 structure remains the active scenario.",
    marketContext: "Nasdaq context driven by earnings cycle, AI sentiment, and rate expectations.",
    evidenceFocus: "Momentum persistence, volume profile, and macro rate-path clarity form evidence base.",
    macroSensitivity: "Fed rate path, tech earnings, and risk appetite",
    macroLink: "Fed patience and tech earnings cycle support",
    regimeLink: "Risk-on tilt supports equity indices while rate path remains patient.",
    freshnessNote: "Earnings season freshness requires session-by-session review.",
    reviewWindow: "Next session open",
    cautionNote: "Contradiction rises if rate expectations shift hawkish or tech earnings disappoint.",
  },
  "SPX500": {
    symbol: "SPX500",
    label: "S&P 500",
    assetClass: "Indices",
    timeframe: "1H",
    bias: "Conditional",
    biasTone: "warning",
    primaryLens: "Broad macro confirmation and CPI context",
    scenario: "Requires broad confirmation — CPI pending before scenario escalation.",
    marketContext: "S&P context needs macro clarity. CPI release caps confidence until resolved.",
    evidenceFocus: "Breadth, volatility regime, and macro event resolution form the evidence layers.",
    macroSensitivity: "CPI, Fed guidance, and breadth expansion",
    macroLink: "Macro uncertainty caps confidence until CPI clarity",
    regimeLink: "Broad equity regime trending but contradicted by volatility compression.",
    freshnessNote: "Pre-CPI environment limits source confidence until data resolves.",
    reviewWindow: "Post-CPI release",
    cautionNote: "Contradiction rises if CPI surprises above consensus while breadth narrows.",
  },
  "DE30": {
    symbol: "DE30",
    label: "Germany 40",
    assetClass: "Indices",
    timeframe: "1H",
    bias: "No setup",
    biasTone: "neutral",
    primaryLens: "ECB policy tone and US risk contagion",
    scenario: "No active scenario — awaiting catalyst from ECB or US session.",
    marketContext: "European equities remain range-bound without local catalyst. US tone dominates.",
    evidenceFocus: "ECB policy tone, US session lead, and local PMI data form context base.",
    macroSensitivity: "ECB policy, US equity direction, and German PMI",
    macroLink: "ECB dovish lean provides background context",
    regimeLink: "European equities follow US risk tone with ECB policy overlay.",
    freshnessNote: "Low conviction limits freshness urgency. Review on catalyst emergence.",
    reviewWindow: "Next ECB communication or US session shift",
    cautionNote: "No active contradiction — scenario requires catalyst before engagement.",
  },
  "BTC/USD": {
    symbol: "BTC/USD",
    label: "Bitcoin",
    assetClass: "Crypto",
    timeframe: "1H",
    bias: "Momentum active",
    biasTone: "positive",
    primaryLens: "Risk appetite and USD weakness correlation",
    scenario: "Breakout pending — volume confirmation needed before scenario escalation.",
    marketContext: "Bitcoin context driven by risk-on sentiment, USD direction, and volume confirmation.",
    evidenceFocus: "Volume profile, risk correlation, and momentum persistence form the evidence layers.",
    macroSensitivity: "Risk sentiment, USD direction, and regulatory news",
    macroLink: "Risk-on environment and USD softness supportive",
    regimeLink: "Crypto correlated with broad risk sentiment and speculative appetite.",
    freshnessNote: "Crypto freshness requires continuous monitoring due to 24/7 market structure.",
    reviewWindow: "Next volume confirmation or macro shift",
    cautionNote: "Contradiction rises if risk appetite reverses or regulatory news emerges.",
  },
  "EUR/USD": {
    symbol: "EUR/USD",
    label: "Euro/Dollar",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "Watching",
    biasTone: "neutral",
    primaryLens: "ECB vs Fed policy divergence and rate differential",
    scenario: "ECB repricing vs USD weakness — range-bound until catalyst.",
    marketContext: "EUR/USD trapped between ECB dovish lean and USD softness. No clear directional catalyst.",
    evidenceFocus: "Rate differential, ECB forward guidance, and USD Index direction form context.",
    macroSensitivity: "ECB policy, Fed rate path, and eurozone data",
    macroLink: "ECB dovish forward guidance with USD softness",
    regimeLink: "EUR inversely linked to USD Index direction with ECB policy overlay.",
    freshnessNote: "Range-bound state limits freshness urgency until breakout catalyst.",
    reviewWindow: "Next ECB speaker or US data release",
    cautionNote: "No active contradiction — monitor for policy divergence catalyst.",
  },
  "GBP/USD": {
    symbol: "GBP/USD",
    label: "Cable",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "Conditional",
    biasTone: "warning",
    primaryLens: "UK data cycle and USD direction",
    scenario: "UK GDP pending — conditional upside if data supports current structure.",
    marketContext: "Cable context requires UK data confirmation. USD weakness provides background support.",
    evidenceFocus: "UK GDP, employment data, and USD weakness form the conditional evidence base.",
    macroSensitivity: "UK GDP, BoE expectations, and USD direction",
    macroLink: "UK macro data and USD direction primary drivers",
    regimeLink: "Cable tracks USD weakness and UK data cycle for directional context.",
    freshnessNote: "Pre-data state. Freshness limited until UK GDP resolves.",
    reviewWindow: "Post UK GDP release",
    cautionNote: "Contradiction rises if UK data disappoints while USD reverses strength.",
  },
  "USD/JPY": {
    symbol: "USD/JPY",
    label: "Dollar/Yen",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "Downside pressure",
    biasTone: "negative",
    primaryLens: "BoJ intervention risk and US yield differential",
    scenario: "Intervention risk zone — caution on further upside extension.",
    marketContext: "USD/JPY context dominated by intervention rhetoric and yield differential narrowing.",
    evidenceFocus: "Intervention zone proximity, BoJ rhetoric, and yield differential form evidence.",
    macroSensitivity: "BoJ intervention, US yields, and risk sentiment",
    macroLink: "BoJ intervention rhetoric and US yield differential",
    regimeLink: "JPY strength reflects risk-off potential and intervention probability.",
    freshnessNote: "Intervention risk requires real-time monitoring. Fixture represents elevated caution.",
    reviewWindow: "Next BoJ communication or yield shift",
    cautionNote: "Contradiction rises if US yields spike while BoJ remains passive.",
  },
  "USD/CHF": {
    symbol: "USD/CHF",
    label: "Dollar/Swiss",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "Watching",
    biasTone: "neutral",
    primaryLens: "Safe-haven flow balance and SNB policy",
    scenario: "No active setup — safe-haven flows mixed with SNB policy offset.",
    marketContext: "USD/CHF context reflects mixed safe-haven demand against SNB rate environment.",
    evidenceFocus: "Safe-haven flows, SNB policy direction, and USD Index form context base.",
    macroSensitivity: "Risk sentiment, SNB policy, and geopolitical flows",
    macroLink: "CHF safe-haven demand offset by SNB policy",
    regimeLink: "USD/CHF tracks broad USD direction with safe-haven overlay.",
    freshnessNote: "Low conviction limits freshness urgency. Geopolitical shift would elevate.",
    reviewWindow: "Next risk event or SNB communication",
    cautionNote: "No active contradiction — requires geopolitical catalyst for scenario activation.",
  },
  "AUD/USD": {
    symbol: "AUD/USD",
    label: "Aussie/Dollar",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "No setup",
    biasTone: "neutral",
    primaryLens: "China data sensitivity and commodity correlation",
    scenario: "Range-bound — no catalyst active. China PMI weakness offsets USD softness.",
    marketContext: "AUD context reflects China demand uncertainty against USD weakness backdrop.",
    evidenceFocus: "China PMI, iron ore prices, and RBA expectations form the evidence base.",
    macroSensitivity: "China data, commodity prices, and RBA policy",
    macroLink: "China PMI weakness offsets USD softness",
    regimeLink: "AUD sensitive to China data and commodity prices with RBA overlay.",
    freshnessNote: "No catalyst active. Freshness review on next China data release.",
    reviewWindow: "Next China data or commodity shift",
    cautionNote: "No active contradiction — scenario requires China data catalyst.",
  },
  "NZD/USD": {
    symbol: "NZD/USD",
    label: "Kiwi/Dollar",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "No setup",
    biasTone: "neutral",
    primaryLens: "RBNZ policy and dairy price correlation",
    scenario: "No active scenario — low conviction without local catalyst.",
    marketContext: "NZD context tracks AUD direction with lower liquidity and local dairy price sensitivity.",
    evidenceFocus: "RBNZ rate path, dairy auction results, and AUD correlation form evidence base.",
    macroSensitivity: "RBNZ policy, dairy prices, and AUD direction",
    macroLink: "RBNZ policy and dairy prices primary local drivers",
    regimeLink: "NZD follows AUD direction with lower liquidity and RBNZ overlay.",
    freshnessNote: "Low conviction environment. Freshness review on next RBNZ communication.",
    reviewWindow: "Next RBNZ meeting or dairy auction",
    cautionNote: "No active contradiction — low liquidity amplifies moves when catalyst emerges.",
  },
  "USD/CAD": {
    symbol: "USD/CAD",
    label: "Dollar/Loonie",
    assetClass: "FX Major",
    timeframe: "1H",
    bias: "Watching",
    biasTone: "neutral",
    primaryLens: "Oil price correlation and BoC rate path",
    scenario: "Oil correlation watch — no clear directional bias without energy catalyst.",
    marketContext: "USD/CAD context reflects oil price direction with BoC rate differential overlay.",
    evidenceFocus: "Oil prices, BoC rate path, and USD broad direction form the evidence base.",
    macroSensitivity: "Oil prices, BoC policy, and USD direction",
    macroLink: "Oil price direction and BoC rate path",
    regimeLink: "CAD correlated with oil and broad USD direction with BoC overlay.",
    freshnessNote: "Oil price freshness drives CAD context. Review on next energy data.",
    reviewWindow: "Next oil inventory or BoC communication",
    cautionNote: "Contradiction rises if oil weakens while USD also softens simultaneously.",
  },
};

export const AVAILABLE_ASSETS = Object.keys(assetContextBySymbol);

/* ═══════════════════════════════════════════════════════════════════════
   TIMEFRAME CONTEXT — per-timeframe fixture context for dashboard sync
   ═══════════════════════════════════════════════════════════════════════ */

export interface TimeframeContext {
  label: string;
  reviewLens: string;
  freshnessSensitivity: string;
  scenarioPace: string;
  evidenceNote: string;
}

export const timeframeContextByValue: Record<string, TimeframeContext> = {
  "15M": {
    label: "15M",
    reviewLens: "Short-window structure review",
    freshnessSensitivity: "Higher freshness sensitivity",
    scenarioPace: "Fast context shifts",
    evidenceNote: "Prioritize structure and liquidity changes inside the current session.",
  },
  "1H": {
    label: "1H",
    reviewLens: "Primary cockpit structure lens",
    freshnessSensitivity: "Balanced freshness review",
    scenarioPace: "Session-level scenario review",
    evidenceNote: "Align structure, macro context, and evidence stack before raising confidence.",
  },
  "4H": {
    label: "4H",
    reviewLens: "Higher-context scenario review",
    freshnessSensitivity: "Moderate freshness sensitivity",
    scenarioPace: "Slower scenario confirmation",
    evidenceNote: "Use for wider structure, liquidity, and contradiction context.",
  },
  "1D": {
    label: "1D",
    reviewLens: "Macro regime lens",
    freshnessSensitivity: "Lower intraday sensitivity",
    scenarioPace: "Broader market regime review",
    evidenceNote: "Use for macro regime, cross-asset tension, and source freshness context.",
  },
};

export const AVAILABLE_TIMEFRAMES = Object.keys(timeframeContextByValue);
