import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import PanelBorderMedium from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg?react";
import PanelBorderWide from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg?react";

/**
 * SVG-06 Panel Border Layer — DISABLED by default.
 *
 * ContentPanels RevB is the primary visible panel housing.
 * SVG-06 borders are NOT used as main shell — would create double borders.
 * Preserved for future popup/effects use only.
 */
const SHOW_SVG06_PANEL_BORDERS = false;

const BORDER_COMPONENTS = { small: PanelBorderSmall, medium: PanelBorderMedium, wide: PanelBorderWide, tall: PanelBorderSmall };
const panels = COCKPIT_GEOMETRY.panels;
const PANEL_ENTRIES = [
  panels.directionalBiasSummary,
  panels.confidenceContextMatrix,
  panels.watchlist,
  panels.evidenceReasoningEngine,
  panels.newsMacroIntelligence,
  panels.coachingInsights,
  panels.marketRegimeCrossAssetPulse,
];

export default function DashboardPanelBorderLayer() {
  if (!SHOW_SVG06_PANEL_BORDERS) return null;
  return (
    <div className="cockpit-layer cockpit-layer--panel-borders elceo-cockpit-no-glow" aria-hidden="true">
      {PANEL_ENTRIES.map((p, i) => (
        <div key={i} className="cockpit-panel-border" style={{ position: "absolute", left: p.outerBoard.x, top: p.outerBoard.y, width: p.outerBoard.w, height: p.outerBoard.h }}>
          <PanelBorderSmall />
        </div>
      ))}
    </div>
  );
}
