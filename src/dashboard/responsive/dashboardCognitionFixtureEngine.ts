/**
 * dashboardCognitionFixtureEngine.ts
 *
 * Deterministic Market Cognition Fixture Engine for ELCEO Dashboard.
 *
 * Pure function that derives dashboard intelligence values from
 * activeAsset + activeTimeframe. No random. No Date.now. No network.
 * No live data. Safe language only.
 */

export type DashboardCognitionTone = "positive" | "warning" | "negative" | "neutral";

export interface DashboardCognitionSnapshot {
  asset: string;
  timeframe: string;
  confidenceScore: number;
  contradictionScore: number;
  freshnessScore: number;
  zoneStrengthScore: number;
  evidenceWeight: number;
  liquidityCondition: string;
  volatilityCondition: string;
  macroSensitivity: string;
  regimePressure: string;
  scenarioTone: DashboardCognitionTone;
  cautionTone: DashboardCognitionTone;
  reviewWindow: string;
  confidenceReason: string;
  contradictionReason: string;
  freshnessReason: string;
  zoneReason: string;
  evidenceSummary: string;
  cautionNote: string;
}

/* ─── Asset Base Profiles ─── */

interface AssetProfile {
  baseConfidence: number;
  baseContradiction: number;
  baseFreshness: number;
  baseZoneStrength: number;
  baseEvidenceWeight: number;
  liquidityCondition: string;
  volatilityCondition: string;
  macroSensitivity: string;
  regimePressure: string;
  scenarioTone: DashboardCognitionTone;
  cautionTone: DashboardCognitionTone;
  reviewWindow: string;
  confidenceReason: string;
  contradictionReason: string;
  freshnessReason: string;
  zoneReason: string;
  evidenceSummary: string;
  cautionNote: string;
}

const ASSET_PROFILES: Record<string, AssetProfile> = {
  "XAU/USD": {
    baseConfidence: 68,
    baseContradiction: 42,
    baseFreshness: 78,
    baseZoneStrength: 74,
    baseEvidenceWeight: 65,
    liquidityCondition: "Adequate — no stress indicators",
    volatilityCondition: "Moderate — event risk pending",
    macroSensitivity: "USD, real yields, and risk sentiment",
    regimePressure: "USD softness supports upside bias",
    scenarioTone: "positive",
    cautionTone: "warning",
    reviewWindow: "Next session open",
    confidenceReason: "Structure confirmation and momentum alignment support moderate-high confidence.",
    contradictionReason: "Risk-on equities contradicting defensive asset context.",
    freshnessReason: "Source freshness adequate. Macro extraction pending source readiness.",
    zoneReason: "Structure zone confirmed with multiple rejections. Demand concentration supports bias.",
    evidenceSummary: "Momentum, structure, and USD softness form the primary evidence layers.",
    cautionNote: "Contradiction rises if USD strength and equity risk appetite expand together.",
  },
  "NAS100": {
    baseConfidence: 64,
    baseContradiction: 35,
    baseFreshness: 72,
    baseZoneStrength: 70,
    baseEvidenceWeight: 62,
    liquidityCondition: "Strong — US session active",
    volatilityCondition: "Moderate — earnings cycle active",
    macroSensitivity: "Fed rate path, tech earnings, and risk appetite",
    regimePressure: "Risk-on tilt supports momentum continuation",
    scenarioTone: "positive",
    cautionTone: "neutral",
    reviewWindow: "Next session open",
    confidenceReason: "Tech momentum and earnings cycle support active scenario continuation.",
    contradictionReason: "Rate path uncertainty creates mild headwind for equity confidence.",
    freshnessReason: "Earnings season freshness requires session-by-session review.",
    zoneReason: "Momentum continuation above structure remains the active evidence base.",
    evidenceSummary: "Momentum persistence, volume profile, and Fed patience form evidence layers.",
    cautionNote: "Contradiction rises if rate expectations shift hawkish or tech earnings disappoint.",
  },
  "SPX500": {
    baseConfidence: 56,
    baseContradiction: 44,
    baseFreshness: 70,
    baseZoneStrength: 62,
    baseEvidenceWeight: 58,
    liquidityCondition: "Adequate — breadth moderate",
    volatilityCondition: "Low-moderate — compression pre-CPI",
    macroSensitivity: "CPI, Fed guidance, and breadth expansion",
    regimePressure: "Broad equity regime conditional on macro clarity",
    scenarioTone: "warning",
    cautionTone: "warning",
    reviewWindow: "Post-CPI release",
    confidenceReason: "Macro uncertainty caps confidence until CPI clarity arrives.",
    contradictionReason: "Volatility compression and breadth narrowing oppose the trending regime.",
    freshnessReason: "Pre-CPI environment limits source confidence until data resolves.",
    zoneReason: "Broad structure requires confirmation — CPI pending before escalation.",
    evidenceSummary: "Breadth, volatility regime, and macro event resolution form the evidence base.",
    cautionNote: "Contradiction rises if CPI surprises above consensus while breadth narrows.",
  },
  "DE30": {
    baseConfidence: 42,
    baseContradiction: 28,
    baseFreshness: 60,
    baseZoneStrength: 48,
    baseEvidenceWeight: 44,
    liquidityCondition: "Moderate — European session dependent",
    volatilityCondition: "Low — range-bound environment",
    macroSensitivity: "ECB policy, US equity direction, and German PMI",
    regimePressure: "Following US risk tone — no independent catalyst",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next ECB communication or US session shift",
    confidenceReason: "No active catalyst limits confidence. European equities follow US direction.",
    contradictionReason: "No active contradiction — scenario requires catalyst before engagement.",
    freshnessReason: "Low conviction limits freshness urgency. Review on catalyst emergence.",
    zoneReason: "No active structure setup — awaiting catalyst from ECB or US session.",
    evidenceSummary: "ECB policy tone, US session lead, and local PMI data form context base.",
    cautionNote: "No active contradiction — scenario requires catalyst before engagement.",
  },
  "BTC/USD": {
    baseConfidence: 60,
    baseContradiction: 48,
    baseFreshness: 68,
    baseZoneStrength: 66,
    baseEvidenceWeight: 58,
    liquidityCondition: "Variable — 24/7 market, weekend risk",
    volatilityCondition: "Elevated — breakout pending",
    macroSensitivity: "Risk sentiment, USD direction, and regulatory news",
    regimePressure: "Risk-on correlation supports speculative appetite",
    scenarioTone: "positive",
    cautionTone: "warning",
    reviewWindow: "Next volume confirmation or macro shift",
    confidenceReason: "Momentum active but volume confirmation needed before escalation.",
    contradictionReason: "Speculative appetite vs regulatory uncertainty creates tension.",
    freshnessReason: "Crypto freshness requires continuous monitoring due to 24/7 market.",
    zoneReason: "Breakout structure forming — volume confirmation is the pending evidence.",
    evidenceSummary: "Volume profile, risk correlation, and momentum persistence form evidence layers.",
    cautionNote: "Contradiction rises if risk appetite reverses or regulatory news emerges.",
  },
  "EUR/USD": {
    baseConfidence: 46,
    baseContradiction: 32,
    baseFreshness: 66,
    baseZoneStrength: 52,
    baseEvidenceWeight: 48,
    liquidityCondition: "Deep — major pair liquidity",
    volatilityCondition: "Low — range-bound",
    macroSensitivity: "ECB policy, Fed rate path, and eurozone data",
    regimePressure: "ECB repricing vs USD weakness — balanced",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next ECB speaker or US data release",
    confidenceReason: "Range-bound state with competing macro forces limits scenario confidence.",
    contradictionReason: "ECB dovish lean offset by USD softness — no clear directional catalyst.",
    freshnessReason: "Range-bound state limits freshness urgency until breakout catalyst.",
    zoneReason: "No active zone setup — trapped between policy divergence forces.",
    evidenceSummary: "Rate differential, ECB forward guidance, and USD Index direction form context.",
    cautionNote: "No active contradiction — monitor for policy divergence catalyst.",
  },
  "GBP/USD": {
    baseConfidence: 52,
    baseContradiction: 38,
    baseFreshness: 64,
    baseZoneStrength: 56,
    baseEvidenceWeight: 50,
    liquidityCondition: "Good — London session primary",
    volatilityCondition: "Moderate — data-dependent",
    macroSensitivity: "UK GDP, BoE expectations, and USD direction",
    regimePressure: "USD weakness provides background support",
    scenarioTone: "warning",
    cautionTone: "warning",
    reviewWindow: "Post UK GDP release",
    confidenceReason: "Conditional upside requires UK data confirmation before escalation.",
    contradictionReason: "UK data uncertainty and USD mixed signals create conditional bias.",
    freshnessReason: "Pre-data state. Freshness limited until UK GDP resolves.",
    zoneReason: "Structure conditional — requires UK data to confirm or invalidate.",
    evidenceSummary: "UK GDP, employment data, and USD weakness form the conditional evidence base.",
    cautionNote: "Contradiction rises if UK data disappoints while USD reverses strength.",
  },
  "USD/JPY": {
    baseConfidence: 58,
    baseContradiction: 46,
    baseFreshness: 74,
    baseZoneStrength: 68,
    baseEvidenceWeight: 60,
    liquidityCondition: "Strong — major pair",
    volatilityCondition: "Elevated — intervention risk zone",
    macroSensitivity: "BoJ intervention, US yields, and risk sentiment",
    regimePressure: "Intervention rhetoric creating downside pressure",
    scenarioTone: "negative",
    cautionTone: "warning",
    reviewWindow: "Next BoJ communication or yield shift",
    confidenceReason: "Intervention zone proximity elevates caution and directional confidence.",
    contradictionReason: "US yield support vs BoJ intervention rhetoric creates tension.",
    freshnessReason: "Intervention risk requires elevated monitoring. Fixture reflects caution.",
    zoneReason: "Intervention zone proximity is the primary structural context.",
    evidenceSummary: "Intervention zone proximity, BoJ rhetoric, and yield differential form evidence.",
    cautionNote: "Contradiction rises if US yields spike while BoJ remains passive.",
  },
  "USD/CHF": {
    baseConfidence: 40,
    baseContradiction: 26,
    baseFreshness: 58,
    baseZoneStrength: 44,
    baseEvidenceWeight: 42,
    liquidityCondition: "Moderate — lower than majors",
    volatilityCondition: "Low — safe-haven flows mixed",
    macroSensitivity: "Risk sentiment, SNB policy, and geopolitical flows",
    regimePressure: "Mixed safe-haven demand with SNB policy offset",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next risk event or SNB communication",
    confidenceReason: "Low conviction. Mixed safe-haven flows prevent directional confidence.",
    contradictionReason: "No active contradiction. Requires geopolitical catalyst for scenario.",
    freshnessReason: "Low conviction limits freshness urgency. Geopolitical shift would elevate.",
    zoneReason: "No active zone — safe-haven demand offset by SNB rate environment.",
    evidenceSummary: "Safe-haven flows, SNB policy direction, and USD Index form context base.",
    cautionNote: "No active contradiction — requires geopolitical catalyst for scenario activation.",
  },
  "AUD/USD": {
    baseConfidence: 38,
    baseContradiction: 30,
    baseFreshness: 56,
    baseZoneStrength: 42,
    baseEvidenceWeight: 40,
    liquidityCondition: "Moderate — Asian/US session split",
    volatilityCondition: "Low — range-bound",
    macroSensitivity: "China data, commodity prices, and RBA policy",
    regimePressure: "China weakness offsets USD softness",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next China data or commodity shift",
    confidenceReason: "No catalyst active. China PMI weakness offsets USD softness.",
    contradictionReason: "No active contradiction — scenario requires China data catalyst.",
    freshnessReason: "No catalyst active. Freshness review on next China data release.",
    zoneReason: "No active structure — range-bound without catalyst.",
    evidenceSummary: "China PMI, iron ore prices, and RBA expectations form the evidence base.",
    cautionNote: "No active contradiction — scenario requires China data catalyst.",
  },
  "NZD/USD": {
    baseConfidence: 34,
    baseContradiction: 24,
    baseFreshness: 52,
    baseZoneStrength: 38,
    baseEvidenceWeight: 36,
    liquidityCondition: "Lower — thinner than majors",
    volatilityCondition: "Low — no catalyst",
    macroSensitivity: "RBNZ policy, dairy prices, and AUD direction",
    regimePressure: "Following AUD direction with lower liquidity",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next RBNZ meeting or dairy auction",
    confidenceReason: "Low conviction without local catalyst. Follows AUD direction.",
    contradictionReason: "No active contradiction — low liquidity amplifies moves when catalyst emerges.",
    freshnessReason: "Low conviction environment. Freshness review on next RBNZ communication.",
    zoneReason: "No active structure — low conviction without local catalyst.",
    evidenceSummary: "RBNZ rate path, dairy auction results, and AUD correlation form evidence base.",
    cautionNote: "No active contradiction — low liquidity amplifies moves when catalyst emerges.",
  },
  "USD/CAD": {
    baseConfidence: 44,
    baseContradiction: 30,
    baseFreshness: 62,
    baseZoneStrength: 50,
    baseEvidenceWeight: 46,
    liquidityCondition: "Good — North American session",
    volatilityCondition: "Low-moderate — oil-dependent",
    macroSensitivity: "Oil prices, BoC policy, and USD direction",
    regimePressure: "Oil correlation watch — energy direction drives context",
    scenarioTone: "neutral",
    cautionTone: "neutral",
    reviewWindow: "Next oil inventory or BoC communication",
    confidenceReason: "No clear directional bias without energy catalyst.",
    contradictionReason: "Contradiction rises if oil weakens while USD also softens simultaneously.",
    freshnessReason: "Oil price freshness drives CAD context. Review on next energy data.",
    zoneReason: "No clear structure — oil correlation is the primary directional lens.",
    evidenceSummary: "Oil prices, BoC rate path, and USD broad direction form the evidence base.",
    cautionNote: "Contradiction rises if oil weakens while USD also softens simultaneously.",
  },
};

/* ─── Timeframe Modifiers ─── */

interface TimeframeModifier {
  confidenceAdj: number;
  contradictionAdj: number;
  freshnessAdj: number;
  zoneStrengthAdj: number;
  evidenceWeightAdj: number;
}

const TIMEFRAME_MODIFIERS: Record<string, TimeframeModifier> = {
  "15M": {
    confidenceAdj: -6,
    contradictionAdj: +8,
    freshnessAdj: +6,
    zoneStrengthAdj: -4,
    evidenceWeightAdj: -4,
  },
  "1H": {
    confidenceAdj: 0,
    contradictionAdj: 0,
    freshnessAdj: 0,
    zoneStrengthAdj: 0,
    evidenceWeightAdj: 0,
  },
  "4H": {
    confidenceAdj: +4,
    contradictionAdj: -4,
    freshnessAdj: -6,
    zoneStrengthAdj: +6,
    evidenceWeightAdj: +4,
  },
  "1D": {
    confidenceAdj: +6,
    contradictionAdj: -6,
    freshnessAdj: -10,
    zoneStrengthAdj: +8,
    evidenceWeightAdj: +6,
  },
};

/* ─── Helper: clamp score to 0–100 ─── */
function clampScore(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

/* ─── Main Engine Function ─── */

export function getDashboardCognitionSnapshot(
  activeAsset: string,
  activeTimeframe: string
): DashboardCognitionSnapshot {
  const profile = ASSET_PROFILES[activeAsset] ?? ASSET_PROFILES["XAU/USD"];
  const modifier = TIMEFRAME_MODIFIERS[activeTimeframe] ?? TIMEFRAME_MODIFIERS["1H"];

  const confidenceScore = clampScore(profile.baseConfidence + modifier.confidenceAdj);
  const contradictionScore = clampScore(profile.baseContradiction + modifier.contradictionAdj);
  const freshnessScore = clampScore(profile.baseFreshness + modifier.freshnessAdj);
  const zoneStrengthScore = clampScore(profile.baseZoneStrength + modifier.zoneStrengthAdj);
  const evidenceWeight = clampScore(profile.baseEvidenceWeight + modifier.evidenceWeightAdj);

  return {
    asset: activeAsset,
    timeframe: activeTimeframe,
    confidenceScore,
    contradictionScore,
    freshnessScore,
    zoneStrengthScore,
    evidenceWeight,
    liquidityCondition: profile.liquidityCondition,
    volatilityCondition: profile.volatilityCondition,
    macroSensitivity: profile.macroSensitivity,
    regimePressure: profile.regimePressure,
    scenarioTone: profile.scenarioTone,
    cautionTone: profile.cautionTone,
    reviewWindow: profile.reviewWindow,
    confidenceReason: profile.confidenceReason,
    contradictionReason: profile.contradictionReason,
    freshnessReason: profile.freshnessReason,
    zoneReason: profile.zoneReason,
    evidenceSummary: profile.evidenceSummary,
    cautionNote: profile.cautionNote,
  };
}
