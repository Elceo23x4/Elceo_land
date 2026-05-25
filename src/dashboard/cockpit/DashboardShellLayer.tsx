import { TopSystemBarIsolated, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { topSystemBar, centralWheel } = COCKPIT_GEOMETRY;

/**
 * Coordinate-faithful shell layer — Batch 6E
 *
 * - ContentPanels Rev-B REMOVED from visible shell (replaced by SVG-06 panel borders)
 * - TopBar: isolated asset (viewBox 0 0 1920 120) placed at exact user rect
 * - Sidebar: full-stage (no isolated variant exists) — stays far-left by SVG design
 * - CentralWheel: isolated (viewBox 0 0 1000 720) at exact user coordinates
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* Top system bar — isolated (viewBox 0 0 1920 120) at user coordinates */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--topbar"
        style={{ left: topSystemBar.x, top: topSystemBar.y, width: topSystemBar.w, height: topSystemBar.h }}
      >
        <TopSystemBarIsolated />
      </div>

      {/* Sidebar rail — full stage (no isolated variant). Far-left by SVG internal design. */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>

      {/* Central wheel — isolated (viewBox 0 0 1000 720) at user coordinates */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel"
        style={{ left: centralWheel.x, top: centralWheel.y, width: centralWheel.w, height: centralWheel.h }}
      >
        <CentralWheel />
      </div>
    </div>
  );
}
