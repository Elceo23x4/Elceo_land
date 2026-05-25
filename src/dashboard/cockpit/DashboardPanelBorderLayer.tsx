import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import PanelBorderMedium from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg?react";
import PanelBorderWide from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg?react";

const SHOW_SVG06_PANEL_BORDERS = true;

const BORDER_COMPONENTS = {
  small: PanelBorderSmall,
  medium: PanelBorderMedium,
  wide: PanelBorderWide,
  tall: PanelBorderSmall, // fallback
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
