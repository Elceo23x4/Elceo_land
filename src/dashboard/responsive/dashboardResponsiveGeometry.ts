/**
 * dashboardResponsiveGeometry.ts
 *
 * Precision coordinate system for the ELCEO responsive dashboard.
 * 1920×1080 is the DESIGN REFERENCE only — NOT the runtime layout engine.
 * Runtime uses percentages derived from these coordinates so it scales responsively.
 *
 * NOTE: directionalBiasSummary header width is 430px (interpreted from likely typo of "43"
 * in the original spec — all other header widths are hundreds of pixels, and 43px cannot
 * contain a header title). This interpretation is explicitly documented.
 */

import type { CSSProperties } from "react";

export const BOARD_SIZE = {
  w: 1920,
  h: 1080,
} as const;

export type BoardRect = { x: number; y: number; w: number; h: number };

export const SHELL_RECTS = {
  topSystemBar: { x: 18, y: 18, w: 1884, h: 52 },
  sidebarRail: { x: 10.93, y: 109.55, w: 49.18, h: 731.21 },
  centralWheel: { x: 525, y: 9, w: 845, h: 870 },
  chartGlass: { x: 629, y: 172, w: 618, h: 579 },
  chartConsoleFrame: { x: 573, y: 162, w: 718, h: 657 },
  chartDisplay: { x: 664, y: 194, w: 545, h: 515 },
  chartOverlayToggleBar: { x: 726, y: 706, w: 428, h: 33 },
} as const;

export const PANEL_FRAME_RECTS = {
  directionalBiasSummary: { x: 81, y: 85, w: 505, h: 249 },
  confidenceContextMatrix: { x: 81, y: 346, w: 505, h: 265 },
  watchlist: { x: 83, y: 622, w: 503, h: 223 },
  evidenceStackReasoningEngine: { x: 1322, y: 83, w: 529, h: 370 },
  newsMacroIntelligence: { x: 1322, y: 460, w: 529, h: 349 },
  coachingInsights: { x: 81, y: 855, w: 738, h: 191 },
  marketRegimeCrossAssetPulse: { x: 841, y: 829, w: 1013, h: 217 },
} as const;

export const PANEL_CONTENT_RECTS = {
  directionalBiasSummary: {
    header: { x: 131, y: 94, w: 430, h: 37 },
    body: { x: 99, y: 136, w: 467, h: 167 },
  },
  confidenceContextMatrix: {
    header: { x: 130, y: 356, w: 436, h: 35 },
    body: { x: 100, y: 402, w: 472, h: 182 },
  },
  watchlist: {
    header: { x: 131, y: 634, w: 424, h: 36 },
    body: { x: 109, y: 674, w: 473, h: 143 },
  },
  evidenceStackReasoningEngine: {
    header: { x: 1376, y: 93, w: 449, h: 38 },
    body: { x: 1345, y: 136, w: 492, h: 288 },
  },
  newsMacroIntelligence: {
    header: { x: 1380, y: 479, w: 445, h: 38 },
    body: { x: 1350, y: 512, w: 487, h: 263 },
  },
  coachingInsights: {
    header: { x: 136, y: 868, w: 655, h: 35 },
    body: { x: 102, y: 907, w: 702, h: 115 },
  },
  marketRegimeCrossAssetPulse: {
    header: { x: 895, y: 840, w: 930, h: 37 },
    body: { x: 863, y: 879, w: 974, h: 143 },
  },
} as const;

/**
 * Converts a board-reference rect (in 1920×1080 coordinates) to responsive
 * CSS percentage-based positioning within the fluid board container.
 */
export function boardRectStyle(rect: BoardRect): CSSProperties {
  return {
    position: "absolute",
    left: `${(rect.x / BOARD_SIZE.w) * 100}%`,
    top: `${(rect.y / BOARD_SIZE.h) * 100}%`,
    width: `${(rect.w / BOARD_SIZE.w) * 100}%`,
    height: `${(rect.h / BOARD_SIZE.h) * 100}%`,
  };
}
