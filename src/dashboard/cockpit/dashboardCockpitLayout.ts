/**
 * Dashboard Cockpit Layout — Batch 3
 * Logical slot positions within the 1920×1080 stage.
 * These are starting points and may be refined in later batches.
 */

export interface SlotPosition {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const PANEL_SLOTS: SlotPosition[] = [
  // Left column
  {
    id: "directional-bias-summary",
    label: "Directional Bias Summary",
    x: 115,
    y: 85,
    w: 405,
    h: 250,
  },
  {
    id: "confidence-context-matrix",
    label: "Confidence & Context Matrix",
    x: 115,
    y: 350,
    w: 405,
    h: 230,
  },
  {
    id: "watchlist",
    label: "Watchlist",
    x: 115,
    y: 595,
    w: 405,
    h: 190,
  },
  // Right column
  {
    id: "evidence-reasoning-engine",
    label: "Evidence Stack / Reasoning Engine",
    x: 1420,
    y: 85,
    w: 450,
    h: 375,
  },
  {
    id: "news-macro-intelligence",
    label: "News & Macro Intelligence",
    x: 1420,
    y: 480,
    w: 450,
    h: 295,
  },
  // Bottom
  {
    id: "coaching-insights",
    label: "Coaching Insights",
    x: 115,
    y: 805,
    w: 720,
    h: 205,
  },
  {
    id: "market-regime-cross-asset-pulse",
    label: "Market Regime / Cross-Asset Pulse",
    x: 850,
    y: 805,
    w: 1020,
    h: 205,
  },
  // Center
  {
    id: "central-chart-console",
    label: "Central Chart Console",
    x: 650,
    y: 190,
    w: 700,
    h: 480,
  },
];

export const CHART_FRAME = {
  x: 650,
  y: 190,
  w: 700,
  h: 480,
};

export const TOP_BAR = {
  x: 0,
  y: 0,
  w: 1920,
  h: 72,
};

export const SIDEBAR = {
  x: 20,
  y: 82,
  w: 90,
  h: 840,
};

export const CENTRAL_WHEEL = {
  x: 480,
  y: 70,
  w: 960,
  h: 720,
};
