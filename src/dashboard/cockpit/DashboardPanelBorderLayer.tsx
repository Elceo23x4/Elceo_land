import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import PanelBorderMedium from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg?react";
import PanelBorderWide from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg?react";

/**
 * SVG-06 Panel Border Layer — Batch 6E
 *
 * Now the PRIMARY visible panel shell system.
 * ContentPanels Rev-B was removed from visible shell to allow coordinate-faithful placement.
 * Each panel border is rendered at its exact outer rectangle from COCKPIT_GEOMETRY.
 */
const SHOW_SVG06_PANEL_BORDERS = true;

const BORDER_COMPONENTS = {
  small: PanelBorderSmall,
  medium: PanelBorderMedium,
  wide: PanelBorderWide,
  tall: PanelBorderSmall,
};

const panels = COCKPIT_GEOMETRY.panels;
const PANEL_ENTRIES = [
  { key: "bias", geo: panels.directionalBiasSummary },
  { key: "confidence", geo: panels.confidenceContextMatrix },
  { key: "watchlist", geo: panels.watchlist },
  { key: "evidence", geo: panels.evidenceReasoningEngine },
  { key: "news", geo: panels.newsMacroIntelligence },
  { key: "coaching", geo: panels.coachingInsights },
  { key: "regime", geo: panels.marketRegimeCrossAssetPulse },
];

export default function DashboardPanelBorderLayer() {
  if (!SHOW_SVG06_PANEL_BORDERS) return null;
  return (
    <div className="cockpit-layer cockpit-layer--panel-borders elceo-cockpit-no-glow" aria-hidden="true">
      {PANEL_ENTRIES.map(({ key, geo }) => {
        const Border = BORDER_COMPONENTS[geo.borderVariant];
        return (
          <div
            key={key}
            className="cockpit-panel-border"
            style={{ position: "absolute", left: geo.outer.x, top: geo.outer.y, width: geo.outer.w, height: geo.outer.h }}
          >
            <Border />
          </div>
        );
      })}
    </div>
  );
}
