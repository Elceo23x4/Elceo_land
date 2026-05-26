/**
 * ELCEO Dashboard Cockpit Geometry — Batch 7D
 *
 * All coordinates are board-space pixels on a 1920×1080 reference.
 * At runtime, these are converted to percentages for responsive positioning.
 *
 * Helper: pct(value, axis) converts board px to percentage string.
 */

export const BOARD_W = 1920;
export const BOARD_H = 1080;

export interface BoardRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Convert board-pixel rect to percentage-based inline style */
export function boardRectStyle(r: BoardRect): React.CSSProperties {
  return {
    position: "absolute",
    left: `${(r.left / BOARD_W) * 100}%`,
    top: `${(r.top / BOARD_H) * 100}%`,
    width: `${(r.width / BOARD_W) * 100}%`,
    height: `${(r.height / BOARD_H) * 100}%`,
  };
}

/** Shell asset positions (board-space pixels) */
export const SHELL_GEOMETRY = {
  topSystemBar: { left: 18, top: 18, width: 1884, height: 52 },
  centralWheel: { left: 525, top: 9, width: 845, height: 870 },
  chartConsoleFrame: { left: 579, top: 70, width: 769, height: 854 },
  sidebarRail: { left: 10.93, top: 109.55, width: 49.18, height: 731.21 },
} as const;

/** Panel content header/body rectangles (board-space pixels) — Batch 7D updated */
export const PANEL_CONTENT_RECTS = {
  directionalBiasSummary: {
    header: { left: 131, top: 94, width: 430, height: 37 },
    body: { left: 99, top: 136, width: 467, height: 167 },
  },
  confidenceContextMatrix: {
    header: { left: 130, top: 356, width: 436, height: 35 },
    body: { left: 100, top: 402, width: 472, height: 182 },
  },
  watchlist: {
    header: { left: 131, top: 634, width: 424, height: 36 },
    body: { left: 109, top: 674, width: 473, height: 143 },
  },
  evidenceStackReasoningEngine: {
    header: { left: 1376, top: 93, width: 449, height: 38 },
    body: { left: 1345, top: 136, width: 492, height: 288 },
  },
  newsMacroIntelligence: {
    header: { left: 1380, top: 479, width: 445, height: 38 },
    body: { left: 1350, top: 512, width: 487, height: 263 },
  },
  coachingInsights: {
    header: { left: 136, top: 868, width: 655, height: 35 },
    body: { left: 102, top: 907, width: 702, height: 115 },
  },
  marketRegimeCrossAssetPulse: {
    header: { left: 895, top: 840, width: 930, height: 37 },
    body: { left: 863, top: 879, width: 974, height: 143 },
  },
} as const;

// ─── Legacy exports for compatibility (deprecated, use PANEL_CONTENT_RECTS) ───

export interface CockpitRect { x: number; y: number; w: number; h: number; }

function toLegacy(r: BoardRect): CockpitRect {
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

export const COCKPIT_GEOMETRY = {
  stage: { w: BOARD_W, h: BOARD_H },
  topSystemBar: toLegacy(SHELL_GEOMETRY.topSystemBar),
  centralWheel: toLegacy(SHELL_GEOMETRY.centralWheel),
  chartConsoleBounds: toLegacy(SHELL_GEOMETRY.chartConsoleFrame),
  chartFrame: toLegacy(SHELL_GEOMETRY.chartConsoleFrame),
} as const;

export const COCKPIT_PANEL_CONTENT_RECTS = {
  directionalBiasSummary: {
    header: toLegacy(PANEL_CONTENT_RECTS.directionalBiasSummary.header),
    body: toLegacy(PANEL_CONTENT_RECTS.directionalBiasSummary.body),
  },
  confidenceContextMatrix: {
    header: toLegacy(PANEL_CONTENT_RECTS.confidenceContextMatrix.header),
    body: toLegacy(PANEL_CONTENT_RECTS.confidenceContextMatrix.body),
  },
  watchlist: {
    header: toLegacy(PANEL_CONTENT_RECTS.watchlist.header),
    body: toLegacy(PANEL_CONTENT_RECTS.watchlist.body),
  },
  evidenceReasoningEngine: {
    header: toLegacy(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.header),
    body: toLegacy(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.body),
  },
  newsMacroIntelligence: {
    header: toLegacy(PANEL_CONTENT_RECTS.newsMacroIntelligence.header),
    body: toLegacy(PANEL_CONTENT_RECTS.newsMacroIntelligence.body),
  },
  coachingInsights: {
    header: toLegacy(PANEL_CONTENT_RECTS.coachingInsights.header),
    body: toLegacy(PANEL_CONTENT_RECTS.coachingInsights.body),
  },
  marketRegimeCrossAssetPulse: {
    header: toLegacy(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.header),
    body: toLegacy(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.body),
  },
} as const;
