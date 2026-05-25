import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import PanelBorderMedium from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg?react";
import PanelBorderWide from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg?react";

// Disabled by default until SVG-06 borders are visually calibrated against the Revision B panel housing.
// ContentPanels Rev-B (full-stage) already contains panel frame chrome.
// Enabling this creates double-border noise.
const SHOW_SVG06_PANEL_BORDERS = false;

const BORDER_COMPONENTS = {
  small: PanelBorderSmall,
  medium: PanelBorderMedium,
  wide: PanelBorderWide,
  tall: PanelBorderSmall,
};

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
      {PANEL_ENTRIES.map((p, i) => {
        const Border = BORDER_COMPONENTS[p.borderVariant];
        return (
          <div key={i} className="cockpit-panel-border" style={{ position: "absolute", left: p.outer.x, top: p.outer.y, width: p.outer.w, height: p.outer.h }}>
            <Border />
          </div>
        );
      })}
    </div>
  );
}
