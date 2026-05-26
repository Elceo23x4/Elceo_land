import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import PanelBorderMedium from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg?react";
import PanelBorderWide from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg?react";

/**
 * SVG-06 Panel Border Layer — DISABLED.
 *
 * The main visible panel shell is elceo-svg-01-content-panels-revb.svg (full-stage).
 * SVG-06 panel borders are NOT the main dashboard shell.
 * Keep disabled unless explicitly reintroduced for popup/special effect usage.
 * Enabling this would create double-border noise over the RevB panel housing.
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
