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
import DashboardGeometryCalibrationOverlay from "./DashboardGeometryCalibrationOverlay";

/**
 * ELCEO Dashboard Cockpit — Batch 6G geometry calibration
 *
 * ContentPanels RevB is the primary visible panel housing (full-stage).
 * SVG-06 borders disabled (would double-border with RevB).
 * Panel content uses board-space header/body rects.
 * Geometry calibration overlay ON temporarily for visual verification.
 */
const SHOW_PANEL_SLOT_DEBUG = false;
const SHOW_CONNECTOR_LAYER = false;
const SHOW_SHELL_STATUS_LAYER = false;
const SHOW_STAGE_LABELS = false;
const SHOW_GEOMETRY_CALIBRATION = true; // TEMPORARY — for visual alignment review only

export default function DashboardCockpit() {
  return (
    <div className="elceo-dashboard-scope elceo-cockpit">
      <DashboardViewport>
        <DashboardBackgroundLayers />
        <DashboardShellLayer />
        <DashboardPanelBorderLayer />
        <DashboardChartFrame />
        <DashboardPanelContentLayer />
        {SHOW_GEOMETRY_CALIBRATION && <DashboardGeometryCalibrationOverlay showLabels />}
        {SHOW_PANEL_SLOT_DEBUG && <DashboardPanelSlotMap visible showLabels />}
        {SHOW_CONNECTOR_LAYER && <DashboardConnectorLayer />}
        {SHOW_SHELL_STATUS_LAYER && <DashboardShellStatusLayer />}
        {SHOW_STAGE_LABELS && <DashboardStageLabels />}
      </DashboardViewport>
    </div>
  );
}
