import { ContentPanels, TopSystemBarIsolated, SidebarRail, CentralWheel } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { topSystemBar, centralWheel } = COCKPIT_GEOMETRY;

/**
 * Shell layer — Batch 6O
 * ContentPanels RevB restored as the visible panel shell (full-stage).
 * The adjusted RevB SVG contains all panel frames at correct sizes.
 * React does not redraw panel borders.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* Adjusted RevB content panels — full stage, the official visible panel shell */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — isolated, fills user rect */}
      <div className="cockpit-shell-asset--isolated cockpit-shell-asset--topbar-isolated" style={{ left: topSystemBar.x, top: topSystemBar.y, width: topSystemBar.w, height: topSystemBar.h }}>
        <TopSystemBarIsolated preserveAspectRatio="none" />
      </div>

      {/* Sidebar rail — full stage, far-left, slight scaleX via CSS */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>

      {/* Central wheel — isolated at board coordinates */}
      <div className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel" style={{ left: centralWheel.x, top: centralWheel.y, width: centralWheel.w, height: centralWheel.h }}>
        <CentralWheel />
      </div>
    </div>
  );
}
