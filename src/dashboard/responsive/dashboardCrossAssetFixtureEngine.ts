/**
 * dashboardCrossAssetFixtureEngine.ts
 *
 * Deterministic Cross-Asset Relationship Fixture Engine for ELCEO Dashboard.
 *
 * Pure function that derives cross-asset relationship intelligence from
 * activeAsset, activeTimeframe, cognition, scenario, and conditionWatch.
 *
 * No random. No Date.now. No network. No live data. No persistence.
 * Safe market language only.
 */

import type { DashboardCognitionSnapshot, DashboardCognitionTone } from "./dashboardCognitionFixtureEngine";
import type { DashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";
import type { DashboardConditionWatchSnapshot } from "./dashboardConditionWatchFixtureEngine";

export type CrossAssetTone = DashboardCognitionTone;

export type CrossAssetRelationship =
  | "aligned"
  | "diverging"
  | "inverse"
  | "sensitive"
  | "neutral";

export interface CrossAssetLink {
  id: string;
  asset: string;
  label: string;
  relationship: CrossAssetRelationship;
  tone: CrossAssetTone;
  strength: number;
  driver: string;
  implication: string;
  reviewCue: string;
}

export interface CrossAssetPressureItem {
  id: string;
  label: string;
  value: string;
  tone: CrossAssetTone;
  detail: string;
}

export interface DashboardCrossAssetSnapshot {
  activeAsset: string;
  timeframe: string;
  summary: string;
  dominantDriver: string;
  riskTone: string;
  usdLink: string;
  liquidityLink: string;
  volatilityLink: string;
  correlationNote: string;
  alignedAssets: CrossAssetLink[];
  divergingAssets: CrossAssetLink[];
  inverseAssets: CrossAssetLink[];
  pressureMap: CrossAssetPressureItem[];
  cautionNote: string;
}

/* ─── Per-Asset Cross-Asset Profiles ─── */

interface AssetCrossProfile {
  dominantDriver: string;
  riskTone: string;
  usdLink: string;
  liquidityLink: string;
  volatilityLink: string;
  correlationNote: string;
  aligned: Omit<CrossAssetLink, "id">[];
  diverging: Omit<CrossAssetLink, "id">[];
  inverse: Omit<CrossAssetLink, "id">[];
  pressureMap: Omit<CrossAssetPressureItem, "id">[];
  cautionNote: string;
}

const CROSS_PROFILES: Record<string, AssetCrossProfile> = {
  "XAU/USD": {
    dominantDriver: "USD direction and real-yield pressure",
    riskTone: "Defensive — safe-haven demand active",
    usdLink: "Inverse — USD softness supports gold",
    liquidityLink: "Adequate — no liquidity stress on gold",
    volatilityLink: "Moderate — event risk pending",
    correlationNote: "Gold inversely linked to USD and real yields; contradicted by risk-on equity context.",
    aligned: [
      { asset: "USD/JPY", label: "Dollar/Yen", relationship: "aligned", tone: "positive", strength: 68, driver: "Both sensitive to USD weakness and yield context", implication: "USD weakness supports both gold and JPY strength", reviewCue: "USD direction shift" },
      { asset: "USD/CHF", label: "Dollar/Swiss", relationship: "aligned", tone: "neutral", strength: 52, driver: "Safe-haven flows", implication: "Defensive demand context supports both", reviewCue: "Risk sentiment shift" },
    ],
    diverging: [
      { asset: "NAS100", label: "Nasdaq 100", relationship: "diverging", tone: "warning", strength: 62, driver: "Risk-on equities vs defensive gold", implication: "Both bid simultaneously creates cross-asset contradiction", reviewCue: "Risk appetite resolution" },
      { asset: "BTC/USD", label: "Bitcoin", relationship: "diverging", tone: "warning", strength: 55, driver: "Speculative vs defensive context", implication: "Risk-on crypto and safe-haven gold bid creates tension", reviewCue: "Risk sentiment clarity" },
    ],
    inverse: [
      { asset: "EUR/USD", label: "Euro/Dollar", relationship: "inverse", tone: "neutral", strength: 45, driver: "USD direction (shared driver, different expression)", implication: "Both track USD weakness but gold has yield sensitivity overlay", reviewCue: "ECB/Fed divergence" },
    ],
    pressureMap: [
      { label: "USD Index", value: "Soft", tone: "positive", detail: "Dollar weakness supports gold upside pressure" },
      { label: "Real yields", value: "Flat", tone: "neutral", detail: "Yield stability neither opposing nor supporting" },
      { label: "Risk appetite", value: "Elevated", tone: "warning", detail: "Risk-on context contradicts safe-haven thesis" },
      { label: "Volatility", value: "Moderate", tone: "neutral", detail: "Event risk pending but not extreme" },
    ],
    cautionNote: "Cross-asset contradiction: risk-on equities and safe-haven gold bid simultaneously active.",
  },
  "NAS100": {
    dominantDriver: "Risk appetite and Fed rate path expectations",
    riskTone: "Risk-on — equity momentum active",
    usdLink: "Moderate sensitivity — rate path drives both",
    liquidityLink: "Strong — US session primary liquidity",
    volatilityLink: "Moderate — earnings cycle active",
    correlationNote: "Nasdaq correlated with risk sentiment and Fed patience; diverges from defensive assets.",
    aligned: [
      { asset: "SPX500", label: "S&P 500", relationship: "aligned", tone: "positive", strength: 82, driver: "Broad US equity risk appetite", implication: "Both track broad equity sentiment", reviewCue: "Macro clarity" },
      { asset: "BTC/USD", label: "Bitcoin", relationship: "aligned", tone: "positive", strength: 64, driver: "Risk-on correlation", implication: "Speculative appetite supports both", reviewCue: "Risk sentiment shift" },
    ],
    diverging: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "diverging", tone: "warning", strength: 58, driver: "Risk-on vs safe-haven tension", implication: "Equity momentum and gold bid is unusual", reviewCue: "Risk tone resolution" },
    ],
    inverse: [
      { asset: "USD/JPY", label: "Dollar/Yen", relationship: "sensitive", tone: "neutral", strength: 50, driver: "Yield differential affects both differently", implication: "Rate expectations link equity and JPY context", reviewCue: "Yield shift" },
    ],
    pressureMap: [
      { label: "Fed patience", value: "Active", tone: "positive", detail: "Rate path clarity supports equity continuation" },
      { label: "Earnings cycle", value: "Watch", tone: "warning", detail: "Session-by-session freshness on earnings" },
      { label: "Risk appetite", value: "Elevated", tone: "positive", detail: "Broad risk-on supports momentum" },
      { label: "USD direction", value: "Soft", tone: "positive", detail: "Dollar softness provides background support" },
    ],
    cautionNote: "Rate path shift or earnings miss could reverse risk appetite rapidly.",
  },
  "SPX500": {
    dominantDriver: "Macro clarity and CPI event resolution",
    riskTone: "Conditional — pending data resolution",
    usdLink: "Moderate — macro data drives broad context",
    liquidityLink: "Adequate — breadth moderate",
    volatilityLink: "Low-moderate — compression pre-CPI",
    correlationNote: "S&P tracks broad macro tone; conditional on CPI resolution and breadth expansion.",
    aligned: [
      { asset: "NAS100", label: "Nasdaq 100", relationship: "aligned", tone: "positive", strength: 80, driver: "Broad US equity correlation", implication: "Both require macro clarity for continuation", reviewCue: "CPI resolution" },
    ],
    diverging: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "diverging", tone: "warning", strength: 52, driver: "Equity vs defensive context", implication: "Both bid creates unusual regime context", reviewCue: "Risk clarity" },
    ],
    inverse: [],
    pressureMap: [
      { label: "CPI event", value: "Pending", tone: "warning", detail: "Data resolution needed before escalation" },
      { label: "Breadth", value: "Narrowing", tone: "warning", detail: "Narrow leadership opposes continuation" },
      { label: "Vol compression", value: "Active", tone: "neutral", detail: "Pre-event compression" },
    ],
    cautionNote: "CPI surprise or breadth narrowing creates scenario invalidation risk.",
  },
  "DE30": {
    dominantDriver: "US risk direction and ECB policy tone",
    riskTone: "Neutral — awaiting catalyst",
    usdLink: "Indirect — via EUR/USD and US equity lead",
    liquidityLink: "Moderate — European session dependent",
    volatilityLink: "Low — range-bound",
    correlationNote: "European equities follow US risk direction with ECB policy overlay.",
    aligned: [
      { asset: "SPX500", label: "S&P 500", relationship: "aligned", tone: "neutral", strength: 65, driver: "US equity lead", implication: "DE30 follows US risk direction", reviewCue: "US session shift" },
    ],
    diverging: [],
    inverse: [],
    pressureMap: [
      { label: "US risk tone", value: "Leading", tone: "neutral", detail: "European equities track US direction" },
      { label: "ECB policy", value: "Dovish lean", tone: "neutral", detail: "Background context only — no trigger" },
    ],
    cautionNote: "No independent catalyst — follows US equity direction.",
  },
  "BTC/USD": {
    dominantDriver: "Risk sentiment and speculative appetite",
    riskTone: "Risk-on — speculative momentum",
    usdLink: "Moderate inverse — USD softness supportive",
    liquidityLink: "Variable — 24/7 market structure",
    volatilityLink: "Elevated — breakout pending",
    correlationNote: "Bitcoin tracks broad risk sentiment; diverges from defensive assets and is sensitive to regulatory context.",
    aligned: [
      { asset: "NAS100", label: "Nasdaq 100", relationship: "aligned", tone: "positive", strength: 62, driver: "Risk-on correlation", implication: "Speculative and tech momentum aligned", reviewCue: "Risk sentiment shift" },
    ],
    diverging: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "diverging", tone: "warning", strength: 50, driver: "Speculative vs defensive", implication: "Both bid creates cross-context tension", reviewCue: "Risk clarity" },
    ],
    inverse: [
      { asset: "USD/JPY", label: "Dollar/Yen", relationship: "sensitive", tone: "neutral", strength: 42, driver: "Risk tone affects both differently", implication: "Risk-off would pressure BTC and support JPY", reviewCue: "Risk event" },
    ],
    pressureMap: [
      { label: "Risk appetite", value: "Elevated", tone: "positive", detail: "Speculative momentum active" },
      { label: "Regulatory", value: "Watch", tone: "warning", detail: "Regulatory uncertainty creates background caution" },
      { label: "Volume", value: "Pending", tone: "warning", detail: "Breakout requires volume confirmation" },
    ],
    cautionNote: "Regulatory news or risk reversal could rapidly unwind speculative positions.",
  },
  "EUR/USD": {
    dominantDriver: "ECB vs Fed policy divergence",
    riskTone: "Neutral — balanced forces",
    usdLink: "Direct inverse — EUR/USD IS the USD relationship",
    liquidityLink: "Deep — major pair",
    volatilityLink: "Low — range-bound",
    correlationNote: "EUR/USD inversely tracks USD Index; balanced by ECB dovish lean and USD softness.",
    aligned: [
      { asset: "GBP/USD", label: "Cable", relationship: "aligned", tone: "neutral", strength: 72, driver: "Both track USD weakness", implication: "USD-driven pairs move together on dollar shifts", reviewCue: "USD direction" },
    ],
    diverging: [],
    inverse: [
      { asset: "USD/JPY", label: "Dollar/Yen", relationship: "inverse", tone: "neutral", strength: 60, driver: "Opposite USD expression", implication: "USD weakness lifts EUR/USD and pressures USD/JPY", reviewCue: "USD direction shift" },
    ],
    pressureMap: [
      { label: "ECB tone", value: "Dovish", tone: "neutral", detail: "Dovish lean limits EUR upside" },
      { label: "USD softness", value: "Active", tone: "positive", detail: "Dollar weakness supports EUR/USD" },
      { label: "Policy divergence", value: "Balanced", tone: "neutral", detail: "Competing forces prevent breakout" },
    ],
    cautionNote: "Range-bound until policy divergence catalyst emerges.",
  },
  "GBP/USD": {
    dominantDriver: "UK data cycle and USD direction",
    riskTone: "Conditional — data-dependent",
    usdLink: "Direct inverse — GBP/USD tracks USD weakness",
    liquidityLink: "Good — London session primary",
    volatilityLink: "Moderate — data-dependent",
    correlationNote: "Cable tracks USD weakness and UK data cycle; correlated with EUR/USD on USD moves.",
    aligned: [
      { asset: "EUR/USD", label: "Euro/Dollar", relationship: "aligned", tone: "neutral", strength: 70, driver: "Both track USD weakness", implication: "USD-driven correlation", reviewCue: "USD shift" },
    ],
    diverging: [],
    inverse: [],
    pressureMap: [
      { label: "UK GDP", value: "Pending", tone: "warning", detail: "Data needed for confirmation" },
      { label: "USD weakness", value: "Supportive", tone: "positive", detail: "Background support from dollar softness" },
    ],
    cautionNote: "UK data disappointment with USD reversal would create dual headwind.",
  },
  "USD/JPY": {
    dominantDriver: "US yield differential and BoJ intervention risk",
    riskTone: "Cautious — intervention zone",
    usdLink: "Direct — USD/JPY IS a USD expression",
    liquidityLink: "Strong — major pair",
    volatilityLink: "Elevated — intervention risk",
    correlationNote: "USD/JPY driven by yield differential; inversely linked to defensive assets; intervention rhetoric creates unique downside pressure.",
    aligned: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "sensitive", tone: "warning", strength: 55, driver: "Both sensitive to USD and risk shifts", implication: "USD weakness supports gold and pressures USD/JPY", reviewCue: "USD direction" },
    ],
    diverging: [],
    inverse: [
      { asset: "EUR/USD", label: "Euro/Dollar", relationship: "inverse", tone: "neutral", strength: 62, driver: "Opposite USD expression", implication: "USD weakness lifts EUR and pressures USD/JPY", reviewCue: "USD shift" },
    ],
    pressureMap: [
      { label: "US yields", value: "Supportive", tone: "warning", detail: "Yield support opposes intervention pressure" },
      { label: "BoJ rhetoric", value: "Active", tone: "negative", detail: "Verbal intervention creating downside" },
      { label: "Intervention zone", value: "Proximity", tone: "negative", detail: "Close to historical intervention levels" },
    ],
    cautionNote: "Yield spike with passive BoJ would create contradiction; intervention would create sharp reversal.",
  },
  "USD/CHF": {
    dominantDriver: "Safe-haven flows and SNB policy",
    riskTone: "Neutral — mixed defensive flows",
    usdLink: "Direct — USD/CHF tracks USD direction",
    liquidityLink: "Moderate — lower than majors",
    volatilityLink: "Low — no catalyst",
    correlationNote: "USD/CHF tracks broad USD direction; CHF safe-haven demand offset by SNB policy.",
    aligned: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "sensitive", tone: "neutral", strength: 48, driver: "Safe-haven context", implication: "Defensive demand affects both", reviewCue: "Risk event" },
    ],
    diverging: [],
    inverse: [],
    pressureMap: [
      { label: "Safe-haven", value: "Mixed", tone: "neutral", detail: "Geopolitical demand offset by SNB" },
      { label: "SNB policy", value: "Neutral", tone: "neutral", detail: "Rate environment limits CHF strength" },
    ],
    cautionNote: "Requires geopolitical catalyst for directional clarity.",
  },
  "AUD/USD": {
    dominantDriver: "China data and commodity prices",
    riskTone: "Neutral — range-bound",
    usdLink: "Moderate inverse — USD softness supports AUD",
    liquidityLink: "Moderate — Asian/US split",
    volatilityLink: "Low — no catalyst",
    correlationNote: "AUD sensitive to China data and iron ore; correlated with NZD; tracks USD weakness.",
    aligned: [
      { asset: "NZD/USD", label: "Kiwi/Dollar", relationship: "aligned", tone: "neutral", strength: 78, driver: "Commodity FX correlation", implication: "AUD and NZD move together", reviewCue: "China data" },
    ],
    diverging: [],
    inverse: [],
    pressureMap: [
      { label: "China PMI", value: "Weak", tone: "warning", detail: "China weakness offsets USD softness" },
      { label: "Iron ore", value: "Watch", tone: "neutral", detail: "Commodity direction matters" },
    ],
    cautionNote: "China data improvement would provide directional catalyst.",
  },
  "NZD/USD": {
    dominantDriver: "RBNZ policy and AUD correlation",
    riskTone: "Neutral — low conviction",
    usdLink: "Moderate inverse — USD direction matters",
    liquidityLink: "Lower — thinner than majors",
    volatilityLink: "Low — no catalyst",
    correlationNote: "NZD follows AUD direction with lower liquidity; amplified moves on catalyst.",
    aligned: [
      { asset: "AUD/USD", label: "Aussie/Dollar", relationship: "aligned", tone: "neutral", strength: 78, driver: "Commodity FX correlation", implication: "Follows AUD with amplified moves", reviewCue: "AUD direction" },
    ],
    diverging: [],
    inverse: [],
    pressureMap: [
      { label: "RBNZ", value: "Watch", tone: "neutral", detail: "Rate path is primary local driver" },
      { label: "Dairy", value: "Watch", tone: "neutral", detail: "Auction results matter for NZD" },
    ],
    cautionNote: "Low liquidity amplifies moves — wider review caution recommended.",
  },
  "USD/CAD": {
    dominantDriver: "Oil price direction and BoC rate path",
    riskTone: "Neutral — oil-dependent",
    usdLink: "Direct — USD/CAD tracks USD direction",
    liquidityLink: "Good — North American session",
    volatilityLink: "Low-moderate — oil-dependent",
    correlationNote: "USD/CAD inversely correlated with oil prices; BoC rate path provides secondary context.",
    aligned: [],
    diverging: [],
    inverse: [
      { asset: "XAU/USD", label: "Gold Spot", relationship: "sensitive", tone: "neutral", strength: 40, driver: "Commodity sensitivity (different commodities)", implication: "Both commodity-linked but different drivers", reviewCue: "Commodity direction" },
    ],
    pressureMap: [
      { label: "Oil price", value: "Watch", tone: "neutral", detail: "Energy direction drives CAD context" },
      { label: "BoC path", value: "Watch", tone: "neutral", detail: "Rate path secondary context" },
    ],
    cautionNote: "Oil weakness with USD softness creates offsetting forces.",
  },
};

/* ─── Main Engine Function ─── */

export function getDashboardCrossAssetSnapshot(
  activeAsset: string,
  activeTimeframe: string,
  cognition: DashboardCognitionSnapshot,
  scenario: DashboardScenarioSnapshot,
  _conditionWatch: DashboardConditionWatchSnapshot
): DashboardCrossAssetSnapshot {
  const profile = CROSS_PROFILES[activeAsset] ?? CROSS_PROFILES["XAU/USD"];

  // Add IDs to links
  const alignedAssets: CrossAssetLink[] = profile.aligned.map((l, i) => ({ ...l, id: `ca-al-${i}` }));
  const divergingAssets: CrossAssetLink[] = profile.diverging.map((l, i) => ({ ...l, id: `ca-dv-${i}` }));
  const inverseAssets: CrossAssetLink[] = profile.inverse.map((l, i) => ({ ...l, id: `ca-iv-${i}` }));
  const pressureMap: CrossAssetPressureItem[] = profile.pressureMap.map((p, i) => ({ ...p, id: `ca-pm-${i}` }));

  // Summary derived from cognition tone and cross-asset context
  const summary = `${activeAsset} · ${activeTimeframe}: ${profile.dominantDriver}. Risk tone: ${profile.riskTone}.`;

  return {
    activeAsset,
    timeframe: activeTimeframe,
    summary,
    dominantDriver: profile.dominantDriver,
    riskTone: profile.riskTone,
    usdLink: profile.usdLink,
    liquidityLink: profile.liquidityLink,
    volatilityLink: profile.volatilityLink,
    correlationNote: profile.correlationNote,
    alignedAssets,
    divergingAssets,
    inverseAssets,
    pressureMap,
    cautionNote: profile.cautionNote,
  };
}
