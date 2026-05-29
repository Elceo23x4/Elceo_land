/**
 * responsivePanelFixtures.ts
 *
 * Full ELCEO production-simulation fixture contract.
 * Covers every user-facing dashboard surface from the UI/UX Flow Blueprint.
 * No live data. No network calls. No timers. Safe language only.
 */

export type Tone = "positive" | "negative" | "warning" | "neutral" | "stale" | "pending";

/* ═══════════════════════════════════════════════════════════════════════
   1. ASSET COCKPIT FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const assetCockpitFixture = {
  activeAsset: "XAU/USD",
  timeframe: "1H",
  session: "London/NY Overlap",
  assetClass: "Metals",
  activeScenario: "Upside pressure toward 2,440 structure zone",
  reviewWindow: "Next session open",
  providerMode: "Fixture Mode",
  route: "/dashboard/xau-usd",
  availableAssetTabs: ["Overview", "Chart", "Evidence", "Journal", "Alerts"] as const,
};

/* ═══════════════════════════════════════════════════════════════════════
   2. LAUNCH ASSET UNIVERSE FIXTURE
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

export const launchAssetUniverseFixture = {
  priorityAssets: [
    { ticker: "XAU/USD", name: "Gold Spot", last: "2,418.50", change: "+0.42%", changeTone: "positive" as Tone, bias: "Upside pressure", biasTone: "positive" as Tone, confidence: "Elevated", sparkline: [38, 42, 40, 45, 48, 46, 52, 55] },
    { ticker: "NAS100", name: "Nasdaq 100", last: "20,714", change: "+0.58%", changeTone: "positive" as Tone, bias: "Active bias", biasTone: "positive" as Tone, confidence: "Moderate", sparkline: [60, 58, 62, 65, 63, 68, 70, 72] },
    { ticker: "SPX500", name: "S&P 500", last: "5,842", change: "+0.34%", changeTone: "positive" as Tone, bias: "Conditional", biasTone: "warning" as Tone, confidence: "Watch", sparkline: [50, 52, 51, 54, 53, 55, 56, 57] },
    { ticker: "DE30", name: "Germany 40", last: "18,245", change: "-0.12%", changeTone: "negative" as Tone, bias: "No setup", biasTone: "neutral" as Tone, confidence: "Low", sparkline: [48, 46, 47, 44, 45, 43, 42, 41] },
    { ticker: "BTC/USD", name: "Bitcoin", last: "67,420", change: "+1.24%", changeTone: "positive" as Tone, bias: "Momentum active", biasTone: "positive" as Tone, confidence: "Elevated", sparkline: [30, 35, 38, 42, 48, 52, 58, 65] },
  ] satisfies WatchlistAsset[],
  fxMajors: [
    { ticker: "EUR/USD", name: "Euro/Dollar", last: "1.0892", change: "+0.18%", changeTone: "positive" as Tone, bias: "Watching", biasTone: "neutral" as Tone, confidence: "Pending", sparkline: [45, 46, 44, 47, 48, 47, 49, 50] },
    { ticker: "GBP/USD", name: "Cable", last: "1.2748", change: "+0.22%", changeTone: "positive" as Tone, bias: "Conditional", biasTone: "warning" as Tone, confidence: "Watch", sparkline: [42, 44, 43, 45, 46, 48, 47, 49] },
    { ticker: "USD/JPY", name: "Dollar/Yen", last: "154.82", change: "-0.35%", changeTone: "negative" as Tone, bias: "Downside pressure", biasTone: "negative" as Tone, confidence: "Moderate", sparkline: [65, 62, 60, 58, 55, 54, 52, 50] },
    { ticker: "USD/CHF", name: "Dollar/Swiss", last: "0.8845", change: "-0.14%", changeTone: "negative" as Tone, bias: "Watching", biasTone: "neutral" as Tone, confidence: "Pending", sparkline: [52, 51, 50, 49, 48, 48, 47, 46] },
    { ticker: "AUD/USD", name: "Aussie/Dollar", last: "0.6678", change: "+0.08%", changeTone: "positive" as Tone, bias: "No setup", biasTone: "neutral" as Tone, confidence: "Low", sparkline: [44, 45, 44, 45, 46, 45, 46, 46] },
    { ticker: "NZD/USD", name: "Kiwi/Dollar", last: "0.6142", change: "+0.05%", changeTone: "neutral" as Tone, bias: "No setup", biasTone: "neutral" as Tone, confidence: "Low", sparkline: [42, 42, 43, 42, 43, 43, 43, 44] },
    { ticker: "USD/CAD", name: "Dollar/Loonie", last: "1.3612", change: "+0.10%", changeTone: "positive" as Tone, bias: "Watching", biasTone: "neutral" as Tone, confidence: "Pending", sparkline: [48, 49, 49, 50, 50, 51, 51, 52] },
  ] satisfies WatchlistAsset[],
};

// Convenience exports for backward compat
export const watchlistFixture = launchAssetUniverseFixture.priorityAssets;
export const watchlistFxMajors = launchAssetUniverseFixture.fxMajors;

/* ═══════════════════════════════════════════════════════════════════════
   3. EVIDENCE STACK FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export interface EvidenceItem {
  category: string;
  label: string;
  value: string;
  tone: Tone;
  score: number;
  freshness: string;
}

export const evidenceStackFixture: EvidenceItem[] = [
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

// Backward compat alias
export const evidenceFixture = evidenceStackFixture;

/* ═══════════════════════════════════════════════════════════════════════
   4. MARKET INSIGHTS FIXTURE
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
  freshnessNote: "All primary sources current. Macro extraction pending provider readiness.",
  nextReviewTrigger: "CPI release tomorrow 08:30 ET or structure zone retest",
};

/* ═══════════════════════════════════════════════════════════════════════
   5. CONFIDENCE DECOMPOSITION FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export interface ConfidenceMetric {
  label: string;
  value: string;
  tone: Tone;
  score: number;
}

export const confidenceDecompositionFixture = {
  metrics: [
    { label: "Confidence", value: "Moderate-High", tone: "positive" as Tone, score: 68 },
    { label: "Contradiction", value: "Medium", tone: "warning" as Tone, score: 42 },
    { label: "Freshness", value: "Current", tone: "positive" as Tone, score: 78 },
    { label: "Zone strength", value: "Elevated", tone: "positive" as Tone, score: 74 },
    { label: "Data quality", value: "Good", tone: "positive" as Tone, score: 72 },
    { label: "Signal agreement", value: "Moderate", tone: "neutral" as Tone, score: 58 },
  ] satisfies ConfidenceMetric[],
  conflicts: [
    { label: "Risk-on vs safe-haven", detail: "Equities firm while gold also bid — cross-asset contradiction" },
    { label: "USD mixed signals", detail: "Dollar weakening on data but yields not confirming direction" },
    { label: "Event risk pending", detail: "CPI release may invalidate current evidence alignment" },
  ],
  whyNotHigher: "Contradiction score (42%) caps effective confidence. Risk-on equities dilute safe-haven conviction.",
  whyNotLower: "Structure confirmation and momentum alignment keep baseline elevated despite macro uncertainty.",
  summary: "Confidence moderate-high. Contradiction between risk appetite and defensive positioning.",
  dataQuality: 72,
};

// Backward compat alias
export const confidenceFixture = confidenceDecompositionFixture;

/* ═══════════════════════════════════════════════════════════════════════
   6. MACRO INTELLIGENCE FIXTURE
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

export const macroIntelligenceFixture = {
  headlines: [
    { title: "Fed minutes signal patience on rate path", impact: "high" as const, tone: "warning" as Tone, source: "Fixture", time: "2h ago" },
    { title: "US CPI print pending — consensus +0.2% MoM", impact: "high" as const, tone: "warning" as Tone, source: "Fixture", time: "Tomorrow" },
    { title: "ECB maintains rates, dovish forward guidance", impact: "medium" as const, tone: "positive" as Tone, source: "Fixture", time: "Today" },
    { title: "Gold ETF inflows accelerate — 3rd consecutive week", impact: "medium" as const, tone: "positive" as Tone, source: "Fixture", time: "3h ago" },
    { title: "China PMI contracts below 50 — risk event", impact: "high" as const, tone: "negative" as Tone, source: "Fixture", time: "Yesterday" },
    { title: "USD Index breaks below 104 support", impact: "medium" as const, tone: "positive" as Tone, source: "Fixture", time: "5h ago" },
    { title: "Treasury auction 10Y demand strong", impact: "medium" as const, tone: "positive" as Tone, source: "Fixture", time: "Today" },
    { title: "Geopolitical tensions — Middle East update", impact: "low" as const, tone: "neutral" as Tone, source: "Fixture", time: "Ongoing" },
  ] satisfies MacroHeadline[],
  events: [
    { label: "US CPI YoY", time: "Tomorrow 08:30 ET", impact: "high" as const, status: "Pending" },
    { label: "Initial Jobless Claims", time: "Thursday 08:30 ET", impact: "medium" as const, status: "Scheduled" },
    { label: "Fed Speaker — Williams", time: "Friday 14:00 ET", impact: "medium" as const, status: "Scheduled" },
    { label: "UK GDP MoM", time: "Friday 02:00 ET", impact: "medium" as const, status: "Scheduled" },
    { label: "Michigan Sentiment", time: "Friday 10:00 ET", impact: "low" as const, status: "Scheduled" },
  ] satisfies MacroEvent[],
  currencyCompare: {
    usdVsGold: { label: "USD vs Gold", direction: "Inverse — USD soft, Gold bid", tone: "positive" as Tone },
    usdVsJpy: { label: "USD vs JPY", direction: "USD weakening — intervention zone", tone: "warning" as Tone },
    eurUsd: { label: "EUR/USD context", direction: "Euro firm on ECB dovish repricing", tone: "positive" as Tone },
    realYields: { label: "Real yields", direction: "Flat — not opposing gold", tone: "neutral" as Tone },
  },
  macroPulse: {
    centralBankTone: "Dovish lean — patience signaled",
    liquidity: "Adequate — no stress indicators",
    riskEvent: "CPI release pending — high impact scheduled",
    providerStatus: "Fixture Mode — macro extraction pending",
  },
};

// Backward compat aliases
export const newsFixture = macroIntelligenceFixture.headlines;
export const macroEvents = macroIntelligenceFixture.events;

/* ═══════════════════════════════════════════════════════════════════════
   7. JOURNAL QUICK CAPTURE FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const journalQuickCaptureFixture = {
  asset: "XAU/USD",
  prompt: "What evidence supports the current bias?",
  tags: ["structure", "macro", "discipline", "contradiction"],
  emotionalState: "Controlled",
  disciplineNote: "Awaiting confirmation — not front-running scenario",
  lastEntry: "2h ago",
  suggestedRoute: "/journal/new",
  readiness: "Basic capture enabled",
  quickCaptureFields: ["Bias reasoning", "Evidence summary", "Contradiction awareness", "Next review condition"],
};

/* ═══════════════════════════════════════════════════════════════════════
   8. PORTFOLIO/WATCHLIST FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const portfolioWatchlistFixture = {
  trackedScenarios: [
    { asset: "XAU/USD", scenario: "Upside toward 2,440 structure zone", status: "Active", tone: "positive" as Tone },
    { asset: "NAS100", scenario: "Momentum continuation above 20,650", status: "Active", tone: "positive" as Tone },
    { asset: "BTC/USD", scenario: "Breakout pending — volume watch", status: "Monitoring", tone: "warning" as Tone },
    { asset: "USD/JPY", scenario: "Downside intervention risk zone", status: "Caution", tone: "negative" as Tone },
  ],
  alerts: [
    { asset: "XAU/USD", alert: "Structure zone 2,420 — watching for confirmation", tone: "warning" as Tone },
    { asset: "NAS100", alert: "Momentum active above 20,650", tone: "positive" as Tone },
    { asset: "BTC/USD", alert: "Breakout pending — volume increasing", tone: "positive" as Tone },
    { asset: "USD/JPY", alert: "Intervention risk zone approaching", tone: "negative" as Tone },
  ],
  workspaceTabs: ["Active Scenarios", "Alerts", "Watchlist", "Archive"],
  lockedPreview: "Premium workspace features require Focus Plan activation",
  routePreview: "/portfolio",
};

// Backward compat alias
export const watchlistAlerts = portfolioWatchlistFixture.alerts;

/* ═══════════════════════════════════════════════════════════════════════
   9. ANALYTICS PREVIEW FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const analyticsPreviewFixture = {
  disciplineScore: 72,
  reviewConsistency: 64,
  overconfidenceWatch: "Medium",
  bestSession: "London/NY overlap",
  missedReviewCount: 2,
  behaviorCaution: "Slight pattern of reviewing without documenting contradictions",
  performanceLensRoute: "/analytics",
  metrics: [
    { label: "Discipline score", value: "72%", tone: "positive" as Tone },
    { label: "Review consistency", value: "64%", tone: "neutral" as Tone },
    { label: "Overconfidence watch", value: "Medium", tone: "warning" as Tone },
    { label: "Best session", value: "London/NY overlap", tone: "positive" as Tone },
    { label: "Missed reviews", value: "2 this week", tone: "warning" as Tone },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   10. COACHING FIXTURE
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
    "Provider status reviewed?",
  ],
  behaviorOverlay: {
    recentQuality: "Good — 3 of last 4 reviews documented",
    readinessGate: "Confirmation required before scenario escalation",
    caution: "None currently — maintain discipline",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   11. NOTIFICATION READINESS FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const notificationReadinessFixture = {
  inboxCount: 3,
  topics: ["Macro shock alert", "Zone retest notification", "Journal reminder"],
  quietHours: "22:00–06:00 UTC",
  delivery: "No-live-send readiness",
  channelPreferences: { push: "Enabled (fixture)", email: "Disabled", sms: "Not configured" },
  routePreview: "/notifications",
  preferencesRoute: "/notifications/preferences",
};

// Backward compat alias
export const notificationFixture = notificationReadinessFixture;

/* ═══════════════════════════════════════════════════════════════════════
   12. ACCOUNT & BILLING READINESS FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const accountBillingReadinessFixture = {
  plan: "Focus Plan",
  planState: "focus_active",
  trialState: "not_applicable",
  socialIdentifierReadiness: "X handle ready",
  paymentReadiness: "Ready",
  billingReadiness: "Activation gated — provider pending",
  security: "Session active",
  missingSocialIdentifier: false,
  blockedLiveActivation: true,
  restrictedUser: false,
  subscriptionWallPreview: "Checkout blocked until live provider readiness confirmed",
  routes: { account: "/account", billing: "/account/billing" },
};

// Backward compat alias
export const dashboardAccessFixture = {
  plan: accountBillingReadinessFixture.plan,
  planState: accountBillingReadinessFixture.planState,
  trialState: accountBillingReadinessFixture.trialState,
  restricted: accountBillingReadinessFixture.restrictedUser,
  gifted: false,
  providerMode: "Fixture Mode",
  providerReadiness: "Provider Pending",
  liveActivation: "blocked_live_activation",
};

/* ═══════════════════════════════════════════════════════════════════════
   13. PROVIDER TRACE FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export const providerTraceFixture = {
  marketData: "Provider Pending",
  news: "Fixture Mode",
  macro: "Fixture Mode",
  extraction: "Provider Pending",
  notifications: "No-live-send",
  payments: "Blocked — live activation pending",
  stepUp: "Provider Pending",
  persistenceStatus: "Fixture persistence active",
};

/* ═══════════════════════════════════════════════════════════════════════
   14. ROUTE PREVIEW FIXTURE
   ═══════════════════════════════════════════════════════════════════════ */

export interface RoutePreview {
  label: string;
  route: string;
  status: string;
  access: "allowed" | "focus" | "locked" | "pending";
  shownState: string;
  lockedReason?: string;
}

export const routePreviewFixture: Record<string, RoutePreview> = {
  assetCockpit: { label: "Asset Cockpit", route: "/dashboard/xau-usd", status: "Focus", access: "focus", shownState: "Full cognition available" },
  evidence: { label: "Market Evidence", route: "/market-evidence", status: "Focus", access: "focus", shownState: "Full evidence chain available" },
  journal: { label: "Journal", route: "/journal", status: "Allowed", access: "allowed", shownState: "Basic + premium context links" },
  journalNew: { label: "New Journal Entry", route: "/journal/new", status: "Allowed", access: "allowed", shownState: "Quick capture enabled" },
  portfolio: { label: "Portfolio", route: "/portfolio", status: "Focus", access: "focus", shownState: "Watchlist intelligence active" },
  analytics: { label: "Analytics", route: "/analytics", status: "Focus", access: "focus", shownState: "Behavior and performance lens" },
  coaching: { label: "Coaching", route: "/coaching", status: "Focus", access: "focus", shownState: "Discipline feedback active" },
  notifications: { label: "Notifications", route: "/notifications", status: "Provider Pending", access: "pending", shownState: "No live sends — fixture alerts only" },
  notificationPrefs: { label: "Notification Preferences", route: "/notifications/preferences", status: "Ready", access: "allowed", shownState: "Channel configuration available" },
  account: { label: "Account", route: "/account", status: "Ready", access: "allowed", shownState: "Social ID present" },
  billing: { label: "Billing", route: "/account/billing", status: "Activation gated", access: "locked", shownState: "Checkout blocked", lockedReason: "Live provider readiness not confirmed" },
};

/* ═══════════════════════════════════════════════════════════════════════
   DIRECTIONAL BIAS (panel-specific enrichment)
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
