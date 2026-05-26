/**
 * ELCEO Dashboard Cockpit Geometry — Batch 6F
 *
 * TWO COORDINATE SPACES:
 *
 * A. Board Space (absolute 1920×1080):
 *    - topbar, wheel, chart console, sidebar
 *    - all header/body content rects
 *
 * B. RevB Panel-System Local Space:
 *    - origin is board position (81, 83)
 *    - panel outer rects are measured relative to this origin
 *    - convert with: absoluteX = 81 + localX, absoluteY = 83 + localY
 *
 * ContentPanels RevB (elceo-svg-01-content-panels-revb.svg) is the visible
 * panel housing. It is a full-stage 1920×1080 SVG that internally contains
 * the RevB panel-border-system block at board position 81,83.
 */

export interface CockpitRect { x: number; y: number; w: number; h: number; }

export interface RevBLocalPanelRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface CockpitPanelGeometry {
  outerLocalToRevB: RevBLocalPanelRect;
  outerBoard: CockpitRect;
  headerBoard: CockpitRect;
  bodyBoard: CockpitRect;
}

export const REV_B_PANEL_SYSTEM_BOARD_RECT: CockpitRect = { x: 81, y: 83, w: 1773, h: 963 };

export function revBLocalToBoardRect(rect: RevBLocalPanelRect): CockpitRect {
  return {
    x: REV_B_PANEL_SYSTEM_BOARD_RECT.x + rect.left,
    y: REV_B_PANEL_SYSTEM_BOARD_RECT.y + rect.top,
    w: rect.width,
    h: rect.height,
  };
}

export const COCKPIT_GEOMETRY = {
  stage: { w: 1920, h: 1080 },

  // Board-space elements
  topSystemBar: { x: 18, y: 18, w: 1884, h: 52 },
  centralWheel: { x: 485, y: 99, w: 978, h: 685 },
  chartConsoleBounds: { x: 622, y: 94, w: 737, h: 729 },
  chartFrame: { x: 622, y: 200, w: 737, h: 488 },

  panels: {
    directionalBiasSummary: {
      outerLocalToRevB: { left: 0, top: 2, width: 505, height: 249 },
      outerBoard: { x: 81, y: 85, w: 505, h: 249 },
      headerBoard: { x: 166, y: 102, w: 407, h: 35 },
      bodyBoard: { x: 131, y: 147, w: 460, h: 173 },
    },
    confidenceContextMatrix: {
      outerLocalToRevB: { left: 0, top: 263, width: 505, height: 265 },
      outerBoard: { x: 81, y: 346, w: 505, h: 265 },
      headerBoard: { x: 166, y: 367, w: 407, h: 35 },
      bodyBoard: { x: 135, y: 412, w: 460, h: 189 },
    },
    watchlist: {
      outerLocalToRevB: { left: 2, top: 539, width: 503, height: 223 },
      outerBoard: { x: 83, y: 622, w: 503, h: 223 },
      headerBoard: { x: 166, y: 637, w: 407, h: 35 },
      bodyBoard: { x: 133, y: 686, w: 460, h: 151 },
    },
    evidenceReasoningEngine: {
      outerLocalToRevB: { left: 1241, top: 0, width: 529, height: 370 },
      outerBoard: { x: 1322, y: 83, w: 529, h: 370 },
      headerBoard: { x: 1408, y: 98, w: 441, h: 35 },
      bodyBoard: { x: 1374, y: 147, w: 483, h: 294 },
    },
    newsMacroIntelligence: {
      outerLocalToRevB: { left: 1241, top: 377, width: 529, height: 349 },
      outerBoard: { x: 1322, y: 460, w: 529, h: 349 },
      headerBoard: { x: 1395, y: 480, w: 454, h: 40 },
      bodyBoard: { x: 1370, y: 536, w: 483, h: 257 },
    },
    coachingInsights: {
      outerLocalToRevB: { left: 0, top: 772, width: 738, height: 191 },
      outerBoard: { x: 81, y: 855, w: 738, h: 191 },
      headerBoard: { x: 157, y: 878, w: 652, h: 29 },
      bodyBoard: { x: 126, y: 923, w: 689, h: 119 },
    },
    marketRegimeCrossAssetPulse: {
      outerLocalToRevB: { left: 760, top: 746, width: 1013, height: 217 },
      outerBoard: { x: 841, y: 829, w: 1013, h: 217 },
      headerBoard: { x: 912, y: 854, w: 929, h: 30 },
      bodyBoard: { x: 888, y: 895, w: 961, h: 144 },
    },
  },
} as const;
