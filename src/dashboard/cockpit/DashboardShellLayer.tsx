import { ContentPanels, TopSystemBar, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { centralWheel } = COCKPIT_GEOMETRY;

/**
 * Shell layer — Batch 6F (coordinate-space corrected)
 *
 * - ContentPanels RevB: full-stage (viewBox 0 0 1920 1080) — primary panel housing.
 *   Contains the RevB panel-border-system internally at board position 81,83.
 * - TopSystemBar: full-stage (viewBox 0 0 1920 1080) — draws topbar at top internally.
 * - SidebarRail: full-stage (viewBox 0 0 1920 1080) — draws sidebar at far-left.
 * - CentralWheel: isolated (viewBox 0 0 1000 720) — placed at board coordinates.
 *
 * Full-stage SVGs must NOT be squeezed into small rectangles.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* ContentPanels RevB — full stage, primary panel housing */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — full stage */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--topbar">
        <TopSystemBar />
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
