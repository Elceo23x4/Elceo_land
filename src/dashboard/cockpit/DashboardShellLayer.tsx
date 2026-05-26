import { ContentPanels, TopSystemBarIsolated, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { SHELL_GEOMETRY, boardRectStyle } from "./dashboardCockpitGeometry";

/**
 * Shell layer — Batch 7D
 * ContentPanels RevB is the visible panel shell (full-board).
 * Shell assets use percentage-based positioning derived from board geometry.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell" aria-hidden="true">
      {/* RevB content panels — full board */}
      <div className="cockpit-shell-asset--full cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar */}
      <div className="cockpit-shell-asset--positioned cockpit-shell-asset--topbar" style={boardRectStyle(SHELL_GEOMETRY.topSystemBar)}>
        <TopSystemBarIsolated preserveAspectRatio="none" />
      </div>

      {/* Sidebar rail */}
      <div className="cockpit-shell-asset--positioned cockpit-shell-asset--sidebar" style={boardRectStyle(SHELL_GEOMETRY.sidebarRail)}>
        <SidebarRail preserveAspectRatio="xMinYMid meet" />
      </div>

      {/* Central wheel */}
      <div className="cockpit-shell-asset--positioned cockpit-shell-asset--central-wheel" style={boardRectStyle(SHELL_GEOMETRY.centralWheel)}>
        <CentralWheel />
      </div>
    </div>
  );
}
