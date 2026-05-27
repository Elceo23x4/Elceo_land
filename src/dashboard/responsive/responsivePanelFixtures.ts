/**
 * responsivePanelFixtures.ts
 *
 * Lightweight fixture data for panels that don't yet have
 * full panel components in main. Used only for structural
 * proof-of-layout in this first responsive batch.
 *
 * No live data. No network calls. No timers.
 */

export interface PanelFixtureItem {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "warning" | "neutral";
}

export const watchlistFixture: PanelFixtureItem[] = [
  { label: "ES", value: "Watching", tone: "neutral" },
  { label: "NQ", value: "Active bias", tone: "positive" },
  { label: "YM", value: "No setup", tone: "neutral" },
  { label: "RTY", value: "Conditional", tone: "warning" },
  { label: "GC", value: "Watching", tone: "neutral" },
];

export const evidenceStackFixture: PanelFixtureItem[] = [
  { label: "Momentum", value: "Elevated", tone: "positive" },
  { label: "Structure", value: "Confirming", tone: "positive" },
  { label: "Volume profile", value: "Neutral", tone: "neutral" },
  { label: "Macro context", value: "Mixed", tone: "warning" },
  { label: "Breadth", value: "Supportive", tone: "positive" },
  { label: "Sentiment", value: "Cautious", tone: "warning" },
];

export const newsMacroFixture: PanelFixtureItem[] = [
  { label: "Fed minutes", value: "Released — no surprise", tone: "neutral" },
  { label: "CPI print", value: "Pending next session", tone: "warning" },
  { label: "Earnings season", value: "Early phase", tone: "neutral" },
  { label: "Geopolitical", value: "Low impact today", tone: "neutral" },
];

export const coachingFixture = {
  headline: "Wait for structure confirmation",
  body: "Current momentum supports bias direction, but entry should wait for structural confirmation at the identified zone. Do not front-run without evidence alignment.",
};

export const marketRegimeFixture: PanelFixtureItem[] = [
  { label: "Regime", value: "Trending", tone: "positive" },
  { label: "Volatility", value: "Moderate", tone: "neutral" },
  { label: "Trend strength", value: "Above average", tone: "positive" },
  { label: "Mean reversion risk", value: "Low", tone: "positive" },
];
