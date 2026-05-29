/**
 * chartIntelligenceFixture.ts
 *
 * Typed fixture data for ELCEO chart intelligence overlays.
 * All coordinates are normalized 0–100 within the chart display area.
 * Fixture-only — no live data, no real prices.
 */

export type OverlayTone = "positive" | "negative" | "warning" | "neutral";

/* ─── Zone Overlays ─── */

export interface ChartZoneFixture {
  id: string;
  label: string;
  kind: "demand" | "supply" | "structure" | "liquidity";
  tone: OverlayTone;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  strength: number;
  freshness: string;
  note: string;
}

export const chartZones: ChartZoneFixture[] = [
  {
    id: "demand-1",
    label: "Demand Zone",
    kind: "demand",
    tone: "positive",
    x1: 8,
    x2: 42,
    y1: 72,
    y2: 80,
    strength: 74,
    freshness: "Current",
    note: "Strong demand area — multiple rejections confirmed",
  },
  {
    id: "structure-1",
    label: "Structure Zone 2,420",
    kind: "structure",
    tone: "positive",
    x1: 35,
    x2: 95,
    y1: 52,
    y2: 56,
    strength: 82,
    freshness: "Current",
    note: "Key structure level — bias depends on confirmation here",
  },
  {
    id: "liquidity-1",
    label: "Liquidity Band",
    kind: "liquidity",
    tone: "warning",
    x1: 55,
    x2: 98,
    y1: 28,
    y2: 33,
    strength: 60,
    freshness: "Watch",
    note: "Resting liquidity above recent highs — potential sweep zone",
  },
  {
    id: "supply-1",
    label: "Caution Supply Zone",
    kind: "supply",
    tone: "negative",
    x1: 70,
    x2: 98,
    y1: 15,
    y2: 22,
    strength: 55,
    freshness: "Watch",
    note: "Supply area — scenario reversal risk if reached without momentum",
  },
];

/* ─── Marker Points ─── */

export interface ChartMarkerFixture {
  id: string;
  label: string;
  kind: "liquidity_sweep" | "structure_retest" | "macro_event" | "contradiction";
  tone: OverlayTone;
  x: number;
  y: number;
  note: string;
}

export const chartMarkers: ChartMarkerFixture[] = [
  {
    id: "marker-sweep",
    label: "Liquidity Sweep",
    kind: "liquidity_sweep",
    tone: "warning",
    x: 30,
    y: 78,
    note: "Previous sweep of resting orders below demand",
  },
  {
    id: "marker-retest",
    label: "Structure Retest",
    kind: "structure_retest",
    tone: "positive",
    x: 62,
    y: 54,
    note: "Successful retest of structure zone — momentum confirmed",
  },
  {
    id: "marker-cpi",
    label: "CPI Event",
    kind: "macro_event",
    tone: "warning",
    x: 88,
    y: 45,
    note: "Pending CPI release — high impact macro catalyst",
  },
  {
    id: "marker-contra",
    label: "Contradiction",
    kind: "contradiction",
    tone: "negative",
    x: 75,
    y: 38,
    note: "Risk-on equities contradicting safe-haven gold bid",
  },
];

/* ─── Annotation Callouts ─── */

export interface ChartAnnotationFixture {
  id: string;
  title: string;
  body: string;
  tone: OverlayTone;
  anchorX: number;
  anchorY: number;
  panelLink: "bias" | "confidence" | "evidence" | "macro" | "regime";
}

export const chartAnnotations: ChartAnnotationFixture[] = [
  {
    id: "ann-bias",
    title: "Bias",
    body: "Upside pressure depends on structure confirmation at this zone.",
    tone: "positive",
    anchorX: 58,
    anchorY: 58,
    panelLink: "bias",
  },
  {
    id: "ann-evidence",
    title: "Evidence",
    body: "Momentum and USD softness support the current scenario path.",
    tone: "positive",
    anchorX: 72,
    anchorY: 48,
    panelLink: "evidence",
  },
  {
    id: "ann-macro",
    title: "Macro Caution",
    body: "CPI event may alter current pressure. Monitor for deviation.",
    tone: "warning",
    anchorX: 90,
    anchorY: 42,
    panelLink: "macro",
  },
  {
    id: "ann-freshness",
    title: "Freshness",
    body: "Market data state is fixture-only. Source freshness under watch.",
    tone: "neutral",
    anchorX: 15,
    anchorY: 20,
    panelLink: "confidence",
  },
];

/* ─── Scenario Path ─── */

export interface ScenarioPathFixture {
  id: string;
  label: string;
  tone: OverlayTone;
  points: Array<{ x: number; y: number }>;
  confidence: number;
  condition: string;
}

export const scenarioPaths: ScenarioPathFixture[] = [
  {
    id: "path-primary",
    label: "Primary Scenario",
    tone: "positive",
    points: [
      { x: 50, y: 55 },
      { x: 58, y: 50 },
      { x: 65, y: 46 },
      { x: 72, y: 42 },
      { x: 80, y: 38 },
      { x: 88, y: 34 },
      { x: 95, y: 30 },
    ],
    confidence: 65,
    condition: "Requires structure zone confirmation",
  },
  {
    id: "path-alternate",
    label: "Alternate Scenario",
    tone: "warning",
    points: [
      { x: 50, y: 55 },
      { x: 56, y: 58 },
      { x: 62, y: 62 },
      { x: 68, y: 66 },
      { x: 75, y: 70 },
    ],
    confidence: 30,
    condition: "Activates if structure fails or CPI surprise",
  },
];

/* ─── Active Chart Context ─── */

export const activeChartContextFixture = {
  asset: "XAU/USD",
  timeframe: "1H",
  session: "London/NY Overlap",
  sourceState: "Fixture Mode",
  marketDataState: "Market Data Pending",
  activeScenario: "Upside pressure while structure zone holds",
  reviewWindow: "Next session open",
};
