import "../styles/dashboard.cockpit.css";
import "../styles/dashboard.geometry.css";
import DashboardViewport from "./DashboardViewport";
import DashboardBackgroundLayers from "./DashboardBackgroundLayers";
import DashboardShellLayer from "./DashboardShellLayer";
import DashboardPanelBorderLayer from "./DashboardPanelBorderLayer";
import DashboardPanelSlotMap from "./DashboardPanelSlotMap";
import DashboardChartFrame from "./DashboardChartFrame";
import DashboardConnectorLayer from "./DashboardConnectorLayer";
import DashboardShellStatusLayer from "./DashboardShellStatusLayer";
import DashboardStageLabels from "./DashboardStageLabels";
import { DashboardPanelContentLayer } from "../panels";

/**
 * ELCEO Dashboard Cockpit — Batch 6E coordinate-faithful rebuild
 *
 * Visible layers:
 * 1. Background (sky, map, atmosphere)
 * 2. Shell (topbar isolated, sidebar full-stage, wheel isolated)
 * 3. Panel borders (SVG-06 at exact user coordinates — primary shell)
 * 4. Chart frame (isolated, aspect-preserved)
 * 5. Panel content (header/body in geometry rects)
 *
 * ContentPanels Rev-B removed from visible shell.
 * Debug layers remain disabled.
 */
const SHOW_PANEL_SLOT_DEBUG = false;
const SHOW_CONNECTOR_LAYER = false;
const SHOW_SHELL_STATUS_LAYER = false;
const SHOW_STAGE_LABELS = false;

export default function DashboardCockpit() {
  return (
    <div className="elceo-dashboard-scope elceo-cockpit">
      <DashboardViewport>
        <DashboardBackgroundLayers />
        <DashboardShellLayer />
        <DashboardPanelBorderLayer />
        <DashboardChartFrame />
        <DashboardPanelContentLayer />
        {SHOW_PANEL_SLOT_DEBUG && <DashboardPanelSlotMap visible showLabels />}
        {SHOW_CONNECTOR_LAYER && <DashboardConnectorLayer />}
        {SHOW_SHELL_STATUS_LAYER && <DashboardShellStatusLayer />}
        {SHOW_STAGE_LABELS && <DashboardStageLabels />}
      </DashboardViewport>
    </div>
  );
}
