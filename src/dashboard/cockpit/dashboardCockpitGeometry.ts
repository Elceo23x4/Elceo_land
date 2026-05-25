/**
 * ELCEO Dashboard Cockpit Geometry — Batch 6C/6D
 * Exact user-provided coordinates for the 1920×1080 stage.
 *
 * ViewBox findings (do not distort these):
 * - TopSystemBar full: 1920×1080 (full-stage, draws only at top)
 * - TopSystemBar isolated: 1920×120 (wide but short)
 * - ContentPanels Rev-B: 1920×1080 (full-stage, contains all panel housing)
 * - SidebarRail: 1920×1080 (full-stage, draws at far-left)
 * - CentralWheel: 1000×720 (isolated)
 * - ChartConsoleFrame: 680×450 (isolated, aspect ~1.51:1)
 * - Connectors: 1920×1080 (full-stage)
 *
 * IMPORTANT:
 * - chartConsoleBounds = user's full center zone (737×729)
 * - chartFrame = fitted rectangle preserving ChartConsoleFrame aspect ratio
 */

export interface CockpitRect { x: number; y: number; w: number; h: number; }
export interface CockpitPanelGeometry { outer: CockpitRect; header: CockpitRect; body: CockpitRect; borderVariant: "small" | "medium" | "tall" | "wide"; }

export const COCKPIT_GEOMETRY = {
  stage: { w: 1920, h: 1080 },
  topSystemBar: { x: 18, y: 18, w: 1884, h: 52 },
  centralWheel: { x: 485, y: 99, w: 978, h: 685 },
  revisionBPanelBorderSystem: { x: 81, y: 83, w: 1773, h: 963 },
  // User's full central chart/wheel zone
  chartConsoleBounds: { x: 622, y: 94, w: 737, h: 729 },
  // Fitted chart frame preserving native 680:450 aspect ratio within the bounds
  chartFrame: { x: 622, y: 200, w: 737, h: 488 },
  panels: {
    directionalBiasSummary: {
      outer: { x: 81, y: 85, w: 505, h: 249 },
      header: { x: 166, y: 102, w: 407, h: 35 },
      body: { x: 131, y: 147, w: 460, h: 173 },
      borderVariant: "small" as const,
    },
    confidenceContextMatrix: {
      outer: { x: 81, y: 346, w: 505, h: 265 },
      header: { x: 166, y: 367, w: 407, h: 35 },
      body: { x: 135, y: 412, w: 460, h: 189 },
      borderVariant: "small" as const,
    },
    watchlist: {
      outer: { x: 83, y: 622, w: 503, h: 223 },
      header: { x: 166, y: 637, w: 407, h: 35 },
      body: { x: 133, y: 686, w: 460, h: 151 },
      borderVariant: "small" as const,
    },
    evidenceReasoningEngine: {
      outer: { x: 1322, y: 83, w: 529, h: 370 },
      header: { x: 1408, y: 98, w: 441, h: 35 },
      body: { x: 1374, y: 147, w: 483, h: 294 },
      borderVariant: "medium" as const,
    },
    newsMacroIntelligence: {
      outer: { x: 1322, y: 460, w: 529, h: 349 },
      header: { x: 1395, y: 480, w: 454, h: 40 },
      body: { x: 1370, y: 536, w: 483, h: 257 },
      borderVariant: "medium" as const,
    },
    coachingInsights: {
      outer: { x: 81, y: 855, w: 738, h: 191 },
      header: { x: 157, y: 878, w: 652, h: 29 },
      body: { x: 126, y: 923, w: 689, h: 119 },
      borderVariant: "wide" as const,
    },
    marketRegimeCrossAssetPulse: {
      outer: { x: 841, y: 829, w: 1013, h: 217 },
      header: { x: 912, y: 854, w: 929, h: 30 },
      body: { x: 888, y: 895, w: 961, h: 144 },
      borderVariant: "wide" as const,
    },
  },
} as const;
