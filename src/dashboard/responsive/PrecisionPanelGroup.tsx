/**
 * PrecisionPanelGroup.tsx
 *
 * Groups a panel's frame, header, body, and expand button as a single unit.
 * Positioned using boardRectStyle on the panel frame rect.
 * Header/body use relative positioning within the group.
 * Expand button is inside the group at top-right.
 * Supports expansion with CSS transform scale(2) from panel-specific origins.
 */

import { type ReactNode } from "react";
import {
  boardRectStyle,
  PANEL_FRAME_RECTS,
  PANEL_CONTENT_RECTS,
  type BoardRect,
} from "./dashboardResponsiveGeometry";
import PanelExpandButton from "./panelContent/PanelExpandButton";

export type PanelId = keyof typeof PANEL_FRAME_RECTS;

interface PrecisionPanelGroupProps {
  panelId: PanelId;
  expanded: boolean;
  onToggleExpand: () => void;
  frameSvg: ReactNode;
  headerContent: ReactNode;
  bodyContent: ReactNode;
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
}: PrecisionPanelGroupProps) {
  const frameRect = PANEL_FRAME_RECTS[panelId];
  const contentRects = PANEL_CONTENT_RECTS[panelId];

  return (
    <div
      className={`dashboard-panel-group dashboard-panel-group--${panelId}${expanded ? " is-expanded" : ""}`}
      style={boardRectStyle(frameRect)}
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

      {/* Body content */}
      <div
        className="dashboard-panel-group__body dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y"
        style={relativeRectStyle(contentRects.body, frameRect)}
      >
        {bodyContent}
      </div>

      {/* Expand/Restore button - inside panel */}
      <div className="dashboard-panel-group__expand-btn">
        <PanelExpandButton expanded={expanded} onToggle={onToggleExpand} />
      </div>
    </div>
  );
}
