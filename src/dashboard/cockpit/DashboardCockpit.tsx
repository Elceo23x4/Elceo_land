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
 * ELCEO Dashboard Cockpit — Batch 6D geometry reset
 *
 * Layer order:
 * 1. Background (sky, map, atmosphere)
 * 2. Shell (full-stage content panels, topbar, sidebar, wheel)
 * 3. Panel borders (SVG-06, disabled by default — returns null)
 * 4. Chart frame (isolated, fitted aspect)
 * 5. Panel content (header/body in exact geometry rects)
 * 6. Debug overlays (all disabled)
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
