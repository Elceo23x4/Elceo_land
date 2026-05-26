import { ContentPanels, TopSystemBarIsolated, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { topSystemBar, centralWheel } = COCKPIT_GEOMETRY;

/**
 * Shell layer — Batch 6G
 *
 * - ContentPanels RevB: full-stage (viewBox 0 0 1920 1080) — primary panel housing.
 * - TopBar: isolated asset (viewBox 0 0 1920 120) placed at exact board rect 18,18,1884×52.
 *   Uses preserveAspectRatio="none" to fill the user's rectangle exactly.
 * - Sidebar: full-stage (viewBox 0 0 1920 1080) — far-left by SVG design.
 * - CentralWheel: isolated (viewBox 0 0 1000 720) at board coordinates.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* ContentPanels RevB — full stage, primary panel housing */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — isolated, forced to fill user rect */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--topbar-isolated"
        style={{ left: topSystemBar.x, top: topSystemBar.y, width: topSystemBar.w, height: topSystemBar.h }}
      >
        <TopSystemBarIsolated preserveAspectRatio="none" />
      </div>

      {/* Sidebar rail — full stage, far-left */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>

      {/* Central wheel — isolated at board coordinates */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel"
        style={{ left: centralWheel.x, top: centralWheel.y, width: centralWheel.w, height: centralWheel.h }}
      >
        <CentralWheel />
      </div>
    </div>
  );
}
