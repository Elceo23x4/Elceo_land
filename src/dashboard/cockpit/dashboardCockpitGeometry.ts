/**
 * ELCEO Dashboard Cockpit Geometry — Batch 6L
 * All coordinates are ABSOLUTE board-space (1920×1080).
 */

export interface CockpitRect { x: number; y: number; w: number; h: number; }

export const COCKPIT_GEOMETRY = {
  stage: { w: 1920, h: 1080 },
  topSystemBar: { x: 18, y: 18, w: 1884, h: 52 },
  centralWheel: { x: 485, y: 99, w: 978, h: 685 },
  chartConsoleBounds: { x: 622, y: 94, w: 737, h: 729 },
  chartFrame: { x: 622, y: 200, w: 737, h: 488 },
} as const;

/** Custom panel outer rects — absolute board-space */
export const COCKPIT_PANEL_RECTS = {
  directionalBiasSummary: { x: 63, y: 68, w: 589, h: 320 },
  confidenceContextMatrix: { x: 61, y: 332, w: 589, h: 328 },
  watchlist: { x: 63, y: 603, w: 589, h: 294 },
  evidenceReasoningEngine: { x: 1299, y: 68, w: 638, h: 430 },
  newsMacroIntelligence: { x: 1293, y: 446, w: 638, h: 400 },
  coachingInsights: { x: 62, y: 834, w: 820, h: 280 },
  marketRegimeCrossAssetPulse: { x: 813, y: 799, w: 1118, h: 316 },
} as const;

/** Content header/body rectangles — absolute board-space */
export const COCKPIT_PANEL_CONTENT_RECTS = {
  directionalBiasSummary: {
    header: { x: 166, y: 102, w: 407, h: 35 },
    body: { x: 131, y: 147, w: 460, h: 173 },
  },
  confidenceContextMatrix: {
    header: { x: 166, y: 367, w: 407, h: 35 },
    body: { x: 135, y: 412, w: 460, h: 189 },
  },
  watchlist: {
    header: { x: 166, y: 637, w: 407, h: 35 },
    body: { x: 133, y: 686, w: 460, h: 151 },
  },
  evidenceReasoningEngine: {
    header: { x: 1408, y: 98, w: 441, h: 35 },
    body: { x: 1374, y: 147, w: 483, h: 294 },
  },
  newsMacroIntelligence: {
    header: { x: 1395, y: 480, w: 454, h: 40 },
    body: { x: 1370, y: 536, w: 483, h: 257 },
  },
  coachingInsights: {
    header: { x: 157, y: 878, w: 652, h: 29 },
    body: { x: 126, y: 923, w: 689, h: 119 },
  },
  marketRegimeCrossAssetPulse: {
    header: { x: 912, y: 854, w: 929, h: 30 },
    body: { x: 888, y: 895, w: 961, h: 144 },
  },
} as const;

/** Calibration rects for first two panels (temporary) */
export const PANEL_CONTENT_CALIBRATION_RECTS = {
  directionalBiasSummary: {
    header: { x: 130, y: 118, w: 330, h: 26 },
    body: { x: 130, y: 155, w: 365, h: 118 },
  },
  confidenceContextMatrix: {
    header: { x: 130, y: 382, w: 330, h: 26 },
    body: { x: 130, y: 420, w: 365, h: 118 },
  },
} as const;
