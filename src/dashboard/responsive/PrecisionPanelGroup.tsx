/**
 * PrecisionPanelGroup.tsx
 *
 * Groups a panel's frame, header, body, and expand button as a single unit.
 * Positioned using boardRectStyle on the panel frame rect (default state).
 * When expanded, computes an enlarged rect and applies new left/top/width/height
 * instead of using transform: scale(). This keeps text at normal size.
 *
 * Expand button is inside the group at top-right.
 * Font growth capped at 1.15x via CSS variable.
 */

import { type ReactNode, useMemo } from "react";
import {
  boardRectStyle,
  BOARD_SIZE,
  PANEL_FRAME_RECTS,
  PANEL_CONTENT_RECTS,
  type BoardRect,
} from "./dashboardResponsiveGeometry";
import PanelExpandButton from "./panelContent/PanelExpandButton";
import ScrollFrame from "./panelContent/ScrollFrame";

export type PanelId = keyof typeof PANEL_FRAME_RECTS;

interface PrecisionPanelGroupProps {
  panelId: PanelId;
  expanded: boolean;
  onToggleExpand: () => void;
  frameSvg: ReactNode;
  headerContent: ReactNode;
  bodyContent: ReactNode;
  linked?: boolean;
  alertArmed?: boolean;
  alertSummary?: string;
  onToggleAlert?: () => void;
}

/** Expansion scale per panel */
const PANEL_EXPANSION_SCALE: Record<PanelId, number> = {
  directionalBiasSummary: 1.5,
  confidenceContextMatrix: 1.5,
  watchlist: 1.5,
  evidenceStackReasoningEngine: 1.25,
  newsMacroIntelligence: 1.25,
  coachingInsights: 1.25,
  marketRegimeCrossAssetPulse: 1.25,
};

/** Anchor/origin per panel for expansion direction */
type Anchor = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const PANEL_ANCHOR: Record<PanelId, Anchor> = {
  directionalBiasSummary: "top-left",
  confidenceContextMatrix: "top-left",
  watchlist: "bottom-left",
  evidenceStackReasoningEngine: "top-right",
  newsMacroIntelligence: "top-right",
  coachingInsights: "bottom-left",
  marketRegimeCrossAssetPulse: "bottom-right",
};

/**
 * Computes an expanded rect from the original frame rect.
 * Anchors expansion from the panel's corner, then clamps within board bounds.
 */
function getExpandedRect(panelId: PanelId, rect: BoardRect): BoardRect {
  const scale = PANEL_EXPANSION_SCALE[panelId];
  const anchor = PANEL_ANCHOR[panelId];

  const newW = rect.w * scale;
  const newH = rect.h * scale;

  let x: number;
  let y: number;

  switch (anchor) {
    case "top-left":
      x = rect.x;
      y = rect.y;
      break;
    case "top-right":
      x = rect.x + rect.w - newW;
      y = rect.y;
      break;
    case "bottom-left":
      x = rect.x;
      y = rect.y + rect.h - newH;
      break;
    case "bottom-right":
      x = rect.x + rect.w - newW;
      y = rect.y + rect.h - newH;
      break;
  }

  // Clamp within board
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + newW > BOARD_SIZE.w) x = BOARD_SIZE.w - newW;
  if (y + newH > BOARD_SIZE.h) y = BOARD_SIZE.h - newH;

  return { x, y, w: newW, h: newH };
}

/**
 * Converts a child rect to percentage-based position relative to a parent rect.
 */
function relativeRectStyle(childRect: BoardRect, parentRect: BoardRect): React.CSSProperties {
  return {
    position: "absolute",
    left: `${((childRect.x - parentRect.x) / parentRect.w) * 100}%`,
    top: `${((childRect.y - parentRect.y) / parentRect.h) * 100}%`,
    width: `${(childRect.w / parentRect.w) * 100}%`,
    height: `${(childRect.h / parentRect.h) * 100}%`,
  };
}

export default function PrecisionPanelGroup({
  panelId,
  expanded,
  onToggleExpand,
  frameSvg,
  headerContent,
  bodyContent,
  linked,
  alertArmed,
  alertSummary,
  onToggleAlert,
}: PrecisionPanelGroupProps) {
  const frameRect = PANEL_FRAME_RECTS[panelId];
  const contentRects = PANEL_CONTENT_RECTS[panelId];

  const expandedRect = useMemo(() => getExpandedRect(panelId, frameRect), [panelId, frameRect]);

  // Use expanded rect when expanded, otherwise original
  const activeRect = expanded ? expandedRect : frameRect;
  const positionStyle = boardRectStyle(activeRect);

  return (
    <div
      className={`dashboard-panel-group dashboard-panel-group--${panelId}${expanded ? " is-expanded" : ""}${linked ? " dashboard-panel-group--linked" : ""}`}
      style={positionStyle}
    >
      {/* Panel frame SVG */}
      <div className="dashboard-panel-group__frame" aria-hidden="true">
        {frameSvg}
      </div>

      {/* Header content */}
      <div
        className="dashboard-panel-group__header dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={relativeRectStyle(contentRects.header, frameRect)}
      >
        {headerContent}
      </div>

      {/* Body content — custom scroll indicator */}
      <div
        className="dashboard-panel-group__body dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={relativeRectStyle(contentRects.body, frameRect)}
      >
        <ScrollFrame>
          {bodyContent}
        </ScrollFrame>
      </div>

      {/* Expand/Restore button - inside panel */}
      <div className="dashboard-panel-group__expand-btn">
        <PanelExpandButton expanded={expanded} onToggle={onToggleExpand} />
      </div>

      {/* Alert bell toggle - inside panel */}
      {onToggleAlert && (
        <button
          type="button"
          className={`dashboard-panel-alert-button${alertArmed ? " dashboard-panel-alert-button--armed" : ""}`}
          onClick={onToggleAlert}
          aria-label={alertArmed ? `Panel alert armed: ${alertSummary ?? ""}` : `Panel alert off: ${alertSummary ?? ""}`}
          title={alertArmed ? `Alert armed — ${alertSummary ?? ""}` : `Alert off — ${alertSummary ?? ""}`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 2.5-1 3.5-1.5 4h12c-.5-.5-1.5-1.5-1.5-4A4.5 4.5 0 0 0 8 1.5Z" fill="currentColor" opacity={alertArmed ? 1 : 0.4} />
            <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1" fill="none" opacity={alertArmed ? 1 : 0.4} />
          </svg>
        </button>
      )}
    </div>
  );
}
