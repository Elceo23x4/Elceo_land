import { TopSystemBarIsolated, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { topSystemBar, centralWheel } = COCKPIT_GEOMETRY;

/**
 * Shell layer — Batch 6L
 * ContentPanels RevB removed. Panel frames now drawn by DashboardCustomPanelShellLayer.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      <div className="cockpit-shell-asset--isolated cockpit-shell-asset--topbar-isolated" style={{ left: topSystemBar.x, top: topSystemBar.y, width: topSystemBar.w, height: topSystemBar.h }}>
        <TopSystemBarIsolated preserveAspectRatio="none" />
      </div>
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>
      <div className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel" style={{ left: centralWheel.x, top: centralWheel.y, width: centralWheel.w, height: centralWheel.h }}>
        <CentralWheel />
      </div>
    </div>
  );
}
