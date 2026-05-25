/**
 * Dashboard Cockpit Layout — Batch 3 + Batch 4 alignment
 * Logical slot positions within the 1920×1080 stage.
 *
 * Batch 4 viewBox findings:
 * - TopSystemBar: viewBox 0 0 1920 1080 → FULL STAGE
 * - SidebarRail: viewBox 0 0 1920 1080 → FULL STAGE
 * - ContentPanels: viewBox 0 0 1920 1080 → FULL STAGE
 * - Connectors: viewBox 0 0 1920 1080 → FULL STAGE
 * - CentralWheel: viewBox 0 0 1000 720 → ISOLATED
 * - FooterSlots: viewBox 0 330 680 120 → ISOLATED
 * - ChartConsoleFrame: viewBox 0 0 680 450 → ISOLATED
 * - NightSky: viewBox 0 0 1920 760 → wide but shorter
 * - WorldMap: viewBox 0 0 1920 760 → wide but shorter
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
    x: 620,
    y: 200,
    w: 680,
    h: 450,
  },
];

// viewBox: 0 0 680 450 — isolated chart frame
export const CHART_FRAME = {
  x: 620,
  y: 200,
  w: 680,
  h: 450,
};

// viewBox: 0 0 1920 1080 — FULL STAGE (render inset 0, no coordinates needed)
export const TOP_BAR = { fullStage: true as const };

// viewBox: 0 0 1920 1080 — FULL STAGE (render inset 0, no coordinates needed)
export const SIDEBAR = { fullStage: true as const };

// viewBox: 0 0 1000 720 — isolated, centered in cockpit
export const CENTRAL_WHEEL = {
  x: 460,
  y: 65,
  w: 1000,
  h: 720,
};

// viewBox: 0 330 680 120 — small isolated footer element
export const FOOTER_SLOTS = {
  x: 620,
  y: 950,
  w: 680,
  h: 120,
};
