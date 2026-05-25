import {
  TopSystemBar,
  SidebarRail,
  ContentPanels,
  CentralWheel,
} from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { centralWheel } = COCKPIT_GEOMETRY;

/**
 * Structural shell layer — Batch 6D reset
 *
 * ViewBox-aware rendering:
 * - TopSystemBar (full-desktop): 1920×1080 → render FULL-STAGE
 * - SidebarRail: 1920×1080 → render FULL-STAGE (far-left by SVG design)
 * - ContentPanels Rev-B: 1920×1080 → render FULL-STAGE (contains all panel housing)
 * - CentralWheel: 1000×720 → render ISOLATED at user coordinates
 *
 * Do NOT squeeze full-stage SVGs into small rectangles.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* Content panels Rev-B — full stage (viewBox 0 0 1920 1080) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — full stage (viewBox 0 0 1920 1080, draws at top only) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--topbar">
        <TopSystemBar />
      </div>

      {/* Sidebar rail — full stage (viewBox 0 0 1920 1080, draws far-left) */}
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
