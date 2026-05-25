import "../styles/dashboard.cockpit.css";
import DashboardViewport from "./DashboardViewport";
import DashboardBackgroundLayers from "./DashboardBackgroundLayers";
import DashboardShellLayer from "./DashboardShellLayer";
import DashboardPanelSlotMap from "./DashboardPanelSlotMap";
import DashboardChartFrame from "./DashboardChartFrame";
import DashboardConnectorLayer from "./DashboardConnectorLayer";
import DashboardShellStatusLayer from "./DashboardShellStatusLayer";
import DashboardStageLabels from "./DashboardStageLabels";

/**
 * ELCEO Dashboard Cockpit Shell — Batch 3
 * Composes all structural layers within the 1920×1080 viewport.
 * No chart engine, no real data, no final intelligence panels.
 */
export default function DashboardCockpit() {
  return (
    <div className="elceo-dashboard-scope elceo-cockpit">
      <DashboardViewport>
        <DashboardBackgroundLayers />
        <DashboardShellLayer />
        <DashboardPanelSlotMap showLabels />
        <DashboardChartFrame />
        <DashboardConnectorLayer />
        <DashboardShellStatusLayer />
        <DashboardStageLabels />
      </DashboardViewport>
    </div>
  );
}
