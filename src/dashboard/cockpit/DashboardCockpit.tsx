import "../styles/dashboard.cockpit.css";
import DashboardViewport from "./DashboardViewport";
import DashboardBackgroundLayers from "./DashboardBackgroundLayers";
import DashboardShellLayer from "./DashboardShellLayer";
import DashboardPanelSlotMap from "./DashboardPanelSlotMap";
import DashboardChartFrame from "./DashboardChartFrame";
import DashboardConnectorLayer from "./DashboardConnectorLayer";
import DashboardShellStatusLayer from "./DashboardShellStatusLayer";
import DashboardStageLabels from "./DashboardStageLabels";
import { DashboardPanelContentLayer } from "../panels";

/**
 * ELCEO Dashboard Cockpit Shell — Batch 3/4/5/6
 *
 * Debug/review layers are disabled by default.
 * Set constants to true only for internal review sessions.
 */
const SHOW_PANEL_SLOT_DEBUG = false;
const SHOW_CONNECTOR_LAYER = false; // Connector layer quarantined until exact post-chart alignment calibration
const SHOW_SHELL_STATUS_LAYER = false;
const SHOW_STAGE_LABELS = false;

export default function DashboardCockpit() {
  return (
    <div className="elceo-dashboard-scope elceo-cockpit">
      <DashboardViewport>
        <DashboardBackgroundLayers />
        <DashboardShellLayer />
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
